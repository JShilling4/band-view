<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QBtn
          v-if="userStore.memberIsAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-mr-md"
          no-caps
          dense
          @click="onAddSongClick"
        />
        <div class="status-pills q-mr-md">
          <QBtn
            v-for="statusOption in SONG_STATUSES"
            :key="statusOption"
            :class="[
              'status-pill q-mr-sm',
              statusFilter === statusOption ? 'status-pill--selected' : 'status-pill--unselected',
            ]"
            dense
            no-caps
            @click="statusFilter = statusOption"
          >
            {{ statusOption }}
          </QBtn>
        </div>

        <SongModal
          v-model:show-modal="showSongModal"
          v-model:song="localSong"
          :action="songModalAction"
          persistent
          @hide="onHideSongModal"
        />
      </div>
      <AppSelect
        v-model="vocalFilter"
        :options="memberStore.members"
        multiple
        emit-value
        option-value="id"
        :option-label="(opt: Tables<'member'>) => `${opt.first_name} ${opt.last_name}`"
        label="Select Vocals"
        class="q-mb-lg"
      >
        <template #selected-item="scope">
          <QChip
            removable
            dense
            :tabindex="scope.tabindex"
            color="black"
            text-color="white"
            class="q-pa-sm"
            style="max-width: 120px"
            @remove="scope.removeAtIndex(scope.index)"
          >
            <div class="ellipsis">
              {{ memberStore.getMemberFullNameById(scope.opt) }}&nbsp;&nbsp;
              <QTooltip class="bg-black">
                {{ memberStore.getMemberFullNameById(scope.opt) }}
              </QTooltip>
            </div>
          </QChip>
        </template>
      </AppSelect>
      <div class="song-container q-mb-lg">
        <div v-if="error" class="text-negative q-mb-md">
          {{ error }}
        </div>
        <div v-if="isLoading">
          <QSkeleton v-for="n in 3" :key="n" type="rect" class="q-mb-sm" />
        </div>
        <template v-else>
          <div class="results-text">{{ selectedSongs?.length }} results</div>
          <QList separator>
            <SongDetails
              v-for="song in selectedSongs"
              :key="song.id"
              :song="song"
              @song-clicked="onSongClick(song.id)"
              @delete="onDeleteSongClick(song.id)"
            />
          </QList>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QSkeleton } from "quasar";
import { type Tables } from "@/plugins/supabase";
import { SONG_STATUSES, type SongStatus } from "@/modules/song/models";

const props = defineProps<{
  pageTitle: string;
  status: SongStatus;
}>();

const router = useRouter();
const songStore = useSongStore();
const memberStore = useMemberStore();
const userStore = useUserStore();
const {
  localSong,
  onDeleteSongClick,
  onSongClick,
  showSongModal,
  songModalAction,
  onHideSongModal,
  onAddSongClick,
} = useSongUtility();

const statusFilter = ref<SongStatus>("learning");
const vocalFilter = ref<number[]>([]);
const selectedSongs = computed(() => {
  let filteredSongs = songStore.getSongsByStatus([statusFilter.value]);

  if (vocalFilter.value.length > 0) {
    filteredSongs = filteredSongs.filter((song) => {
      const songVocals = [song.vocal_lead, song.vocal_second, song.vocal_third].filter(Boolean);
      return vocalFilter.value.some((id) => songVocals.includes(id));
    });
  }

  return filteredSongs;
});

const isLoading = ref(false);
const error = ref<string | null>(null);

watch(
  () => props.status,
  () => {
    statusFilter.value = props.status || "learning";
  },
  { immediate: true }
);

watch(vocalFilter, (newVal) => {
  const query: Record<string, string | number[]> = {};
  if (newVal.length) {
    query.vocals = newVal;
  }
  router.push({ name: "Songs", query });
});

watch(statusFilter, (newVal) => {
  const query: Record<string, string | number[]> = {};
  if (newVal) {
    query.status = newVal;
  }
  if (vocalFilter.value.length) {
    query.vocals = vocalFilter.value;
  }
  router.push({ name: "Songs", query });
});

onMounted(async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await memberStore.fetchMembers();
    await songStore.fetchSongs();
  } catch (err) {
    error.value = "Failed to load songs. Please try again later.";
    console.error("Error loading songs:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.song-container {
  max-width: 500px;
}

.status-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 600px) {
    .status-pill {
      flex: 1 1 auto;
      min-width: calc(50% - 4px);
      justify-content: center;
    }
  }
}

.status-pill {
  --active-color: #3775b3;
  text-transform: capitalize;
  white-space: nowrap;
}

.status-pill--selected {
  background-color: var(--active-color) !important;
  color: white !important;
  border: 2px solid var(--active-color) !important;
}

.status-pill--unselected {
  background-color: white !important;
  color: #333 !important;
  border: 2px solid var(--active-color) !important;
}

:deep(.q-field__native) {
  text-transform: capitalize;
}
</style>
