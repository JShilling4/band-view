<template>
  <QItem
    v-if="song"
    :clickable="userStore.memberIsAdmin"
    :class="{ highlight: song.is_highlighted }"
    role="listitem"
  >
    <QItemSection
      :tabindex="userStore.memberIsAdmin ? 0 : undefined"
      @click="userStore.memberIsAdmin && $emit('song-clicked')"
    >
      <QItemLabel>
        <QIcon
          v-if="showHandle && userStore.memberIsAdmin"
          :name="IconClasses.Handle.join(' ')"
          class="q-mr-sm handle"
        />
        <span v-if="typeof listIndex === 'number'" class="song-index">{{ listIndex + 1 }}. </span>
        <span v-if="!hideArtist" class="song-artist">{{ song.artist }} - </span>
        <span class="song-title">
          <span class="song-name">{{ song.title }}&nbsp;</span>
          <span v-if="userStore.memberIsAdmin && song.length" class="song-duration">
            ({{ secToMinSec(song.length) }})
          </span>
          <span v-if="!hideSpecials && song.specials?.length">
            [
            <span
              v-for="special in song.specials"
              :key="special"
              class="specials-symbols text-grey-6 text-bold q-mr-xs"
            >
              {{ special }} </span
            >]
          </span>
        </span>
      </QItemLabel>
      <QItemLabel v-if="song.vocal_lead" lines="1" class="song-metadata">
        Vocal:
        <span v-for="(vocalId, index) in vocals" :key="index" :class="`vocal-name-${index}`">
          <span v-if="index > 0" class="vocal-separator">,</span>
          {{ getMemberName(vocalId) }}
        </span>
      </QItemLabel>
    </QItemSection>
    <QItemSection side top>
      <div class="song-controls row items-center">
        <!-- Voting controls for suggested songs -->
        <div v-if="song.status === 'suggested'" class="vote-controls q-mr-md">
          <div class="vote-buttons row items-center q-gutter-xs">
            <QBtn
              flat
              dense
              :icon="hasVoted ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'"
              :color="userVote === 'up' ? 'positive' : 'grey-6'"
              :disable="isVoting"
              class="vote-btn"
              @click.stop="vote('up')"
            >
              <QBadge v-if="voteCount.upvotes > 0" color="positive" floating class="vote-badge">
                {{ voteCount.upvotes }}
              </QBadge>
            </QBtn>

            <QBtn
              flat
              dense
              :icon="hasVoted ? 'fa-solid fa-thumbs-down' : 'fa-regular fa-thumbs-down'"
              :color="userVote === 'down' ? 'negative' : 'grey-6'"
              :disable="isVoting"
              class="vote-btn"
              @click.stop="vote('down')"
            >
              <QBadge v-if="voteCount.downvotes > 0" color="negative" floating class="vote-badge">
                {{ voteCount.downvotes }}
              </QBadge>
            </QBtn>

            <!-- Clear vote button (only shown when user has voted) -->
            <QBtn
              v-if="hasVoted"
              flat
              dense
              icon="fa-solid fa-xmark"
              color="grey-6"
              :disable="isVoting"
              class="clear-vote-btn"
              @click.stop="clearVote"
            >
              <QTooltip>Clear your vote</QTooltip>
            </QBtn>
          </div>
        </div>

        <span v-if="!hideLinks && song.link_url">
          <QIcon
            :name="IconClasses.YouTube.join(' ')"
            color="red-9"
            class="song-link-icon"
            size="sm"
            role="button"
            aria-label="Open YouTube link"
            tabindex="0"
            @click.stop="openBrowserTab(song.link_url)"
          />
        </span>
        <span v-if="!hideLinks && song.download_url" class="q-ml-md">
          <QIcon
            :name="IconClasses.Download.join(' ')"
            class="song-link-icon"
            size="sm"
            @click.stop="openBrowserTab(song.download_url)"
          />
        </span>
        <span v-if="!hideAdmin && userStore.memberIsAdmin" class="admin-controls q-ml-md">
          <QIcon
            :name="IconClasses.Delete.join(' ')"
            size="sm"
            class="delete-icon"
            @click.stop="$emit('delete', song.id)"
          />
        </span>
      </div>
    </QItemSection>
  </QItem>

  <!-- Member Selection Modal -->
  <QDialog v-model="showMemberSelector" persistent>
    <QCard class="q-pa-md">
      <QCardSection>
        <div class="text-h6">Select Member for Voting</div>
        <div class="text-body2 q-mt-sm">Please select which band member you are voting for:</div>
      </QCardSection>

      <QCardSection>
        <QOptionGroup
          v-model="selectedMemberForVoting"
          :options="memberOptions"
          color="primary"
          type="radio"
        />
      </QCardSection>

      <QCardActions align="right">
        <QBtn flat label="Cancel" color="grey" @click="cancelMemberSelection" />
        <QBtn
          label="Confirm"
          color="primary"
          :disable="!selectedMemberForVoting"
          @click="confirmMemberSelection"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Notify } from "quasar";
import { IconClasses } from "@/core/models";
import { openBrowserTab, secToMinSec } from "@/core/utils/helpers";
import {
  submitVote,
  getUserVote,
  clearUserVote,
  type VoteResult,
} from "@/modules/song/services/voteService";
import { getSelectedMemberId, setSelectedMemberId } from "@/core/utils/voteTracking";
import { type Tables } from "@/plugins/supabase";

const memberStore = useMemberStore();
const songStore = useSongStore();

const {
  song = undefined,
  hideArtist = false,
  hideSpecials = false,
  hideLinks = false,
  hideAdmin = false,
  listIndex = undefined,
  showHandle = false,
} = defineProps<{
  song?: Tables<"song">;
  hideArtist?: boolean;
  hideSpecials?: boolean;
  hideAdmin?: boolean;
  hideLinks?: boolean;
  listIndex?: number;
  showHandle?: boolean;
}>();

defineEmits<{
  "song-clicked": [];
  delete: [id: number];
}>();

const userStore = useUserStore();

const vocals = computed(() => {
  if (!song) return [];
  return [song.vocal_lead, song.vocal_second, song.vocal_third].filter(Boolean);
});

const getMemberName = (id: number | null) => memberStore.getMemberById(id)?.first_name ?? "";

const getMemberColor = (id: number | null) => memberStore.getMemberById(id)?.profile_color ?? "";

// Voting logic
const voteCount = computed(() => {
  if (!song) return { upvotes: 0, downvotes: 0 };
  return songStore.getSongVoteCount(song.id);
});

const hasVoted = computed(() => {
  if (!song) return false;
  return userVote.value !== null;
});

const memberOptions = computed(() => {
  return memberStore.members
    .filter((member) => member.first_name) // Only members with names
    .map((member) => ({
      label: `${member.first_name} ${member.last_name || ""}`.trim(),
      value: member.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically
});

const userVote = ref<"up" | "down" | null>(null);
const isVoting = ref(false);
const showMemberSelector = ref(false);
const selectedMemberForVoting = ref<number | null>(null);

// Load user's existing vote on component mount
onMounted(async () => {
  if (song && getSelectedMemberId()) {
    try {
      const existingVote = await getUserVote(song.id);
      userVote.value = existingVote;
    } catch {
      // Member not selected or other error, will be handled by vote function
    }
  }
});

const vote = async (voteType: "up" | "down") => {
  if (!song || isVoting.value) return;

  // Check if member is selected
  if (!getSelectedMemberId()) {
    showMemberSelector.value = true;
    return;
  }

  isVoting.value = true;
  try {
    const result: VoteResult = await submitVote(song.id, voteType);

    if (result.success) {
      userVote.value = voteType;
      if (result.voteCount) {
        songStore.updateSongVoteCount(song.id, result.voteCount);
      }

      Notify.create({
        type: "positive",
        message: result.message,
      });
    } else {
      Notify.create({
        type: "negative",
        message: result.message,
      });
    }
  } finally {
    isVoting.value = false;
  }
};

const clearVote = async () => {
  if (!song || isVoting.value) return;

  isVoting.value = true;
  try {
    const result: VoteResult = await clearUserVote(song.id);

    if (result.success) {
      userVote.value = null;
      if (result.voteCount) {
        songStore.updateSongVoteCount(song.id, result.voteCount);
      }

      Notify.create({
        type: "positive",
        message: result.message,
      });
    } else {
      Notify.create({
        type: "negative",
        message: result.message,
      });
    }
  } finally {
    isVoting.value = false;
  }
};

const cancelMemberSelection = () => {
  showMemberSelector.value = false;
  selectedMemberForVoting.value = null;
};

const confirmMemberSelection = () => {
  if (selectedMemberForVoting.value) {
    setSelectedMemberId(selectedMemberForVoting.value);
    showMemberSelector.value = false;
    selectedMemberForVoting.value = null;

    // Now that member is selected, try to load existing vote
    if (song) {
      getUserVote(song.id)
        .then((existingVote) => {
          userVote.value = existingVote;
        })
        .catch(() => {
          // No existing vote, that's fine
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.song-container {
  .handle {
    @media print {
      display: none;
    }
  }
  .q-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
    font-family: Roboto, sans-serif;
    font-weight: 400;
  }
}
.song-controls {
  @media print {
    display: none;
  }
}
.song-artist {
  color: rgb(148, 148, 148);
  font-weight: 500;
  line-height: 1.75;
}
.song-name {
  color: #424242;
  font-weight: bold;

  @media print {
    font-family: Georgia;
    font-weight: 500;
    font-size: 38px;
  }
}
.song-link-icon {
  cursor: pointer;
  &:focus {
    outline: 2px solid var(--q-primary);
    border-radius: 4px;
  }
}
.song-metadata {
  font-size: 13px;

  @media print {
    display: none;
  }

  .vocal-name-0 {
    color: v-bind("getMemberColor(vocals[0])");
  }
  .vocal-name-1 {
    color: v-bind("getMemberColor(vocals[1])");
  }
  .vocal-name-2 {
    color: v-bind("getMemberColor(vocals[2])");
  }
}
.song-index {
  width: 1.5rem;
  display: inline-block;

  @media print {
    display: none;
  }
}
.highlight {
  background-color: #fefed2;
}
.vocal-separator {
  color: #000;
}
.song-duration {
  color: var(--q-grey-7);

  @media print {
    display: none;
  }
}

.vote-controls {
  .vote-buttons {
    .vote-btn {
      min-width: 32px;
      padding: 4px 8px;
      position: relative;

      &:disabled {
        opacity: 0.6;
      }

      .vote-badge {
        font-size: 10px;
        padding: 2px 4px;
        min-width: 16px;
        height: 16px;
        top: -8px;
        right: -8px;
      }
    }

    .clear-vote-btn {
      min-width: 24px;
      padding: 2px 4px;
      font-size: 12px;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }

      &:disabled {
        opacity: 0.4;
      }
    }
  }
}
</style>
