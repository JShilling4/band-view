<template>
  <QItem
    v-if="song"
    :clickable="isAdmin"
    :class="{ highlight: song.is_highlighted }"
    role="listitem"
  >
    <QItemSection :tabindex="isAdmin ? 0 : undefined" @click="isAdmin && $emit('song-clicked')">
      <QItemLabel>
        <QIcon
          v-if="showHandle && isAdmin"
          :name="IconClasses.Handle.join(' ')"
          class="q-mr-sm handle"
        />
        <span v-if="typeof listIndex === 'number'" class="song-index">{{ listIndex + 1 }}. </span>
        <span v-if="!hideArtist" class="song-artist">{{ song.artist }} - </span>
        <span class="song-title">
          <span class="text-bold text-grey-9">{{ song.title }}&nbsp;</span>
          <span v-if="isAdmin && song.length" class="song-duration">
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
        <span v-if="!hideAdmin && isAdmin" class="admin-controls q-ml-md">
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
</template>

<script setup lang="ts">
import { computed } from "vue";
import { openBrowserTab, secToMinSec } from "@/utils/helpers";
import { useMemberStore, useUserStore } from "@/stores";
import { IconClasses, type Tables } from "@/types";

const memberStore = useMemberStore();

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
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

const vocals = computed(() => {
  if (!song) return [];
  return [song.vocal_lead, song.vocal_second, song.vocal_third].filter(Boolean);
});

const getMemberName = (id: number | null) => memberStore.getMemberById(id)?.first_name ?? "";

const getMemberColor = (id: number | null) => memberStore.getMemberById(id)?.profile_color ?? "";
</script>

<style lang="scss" scoped>
.q-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
.song-controls {
  iframe {
    width: 22px;
    height: 22px;
    border-radius: 5px;
  }
}
.song-artist {
  color: rgb(148, 148, 148);
  font-weight: 500;
  line-height: 1.75;
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
}
.song-index {
  width: 1.5rem;
  display: inline-block;
}
.highlight {
  background-color: #fefed2;
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
.vocal-separator {
  color: #000;
}
.song-duration {
  color: var(--q-grey-7);
}
.delete-icon {
  cursor: pointer;
}
</style>
