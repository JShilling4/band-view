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
        <AppSelect
          v-model="statusFilter"
          :options="Array(...SONG_STATUSES).sort()"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Status"
          class="q-mr-md"
        />
        <AppSelect
          v-model="vocalFilter"
          :options="memberStore.members"
          multiple
          emit-value
          option-value="id"
          :option-label="(opt: Tables<'member'>) => `${opt.first_name} ${opt.last_name}`"
          label="Select Vocals"
          ><template #selected-item="scope">
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
        <SongModal
          v-model:show-modal="showSongModal"
          v-model:song="localSong"
          :action="songModalAction"
          persistent
          @hide="onHideSongModal"
        />
      </div>
      <div class="song-container q-mb-lg">
        <div v-if="error" class="text-negative q-mb-md">
          {{ error }}
        </div>
        <div v-if="isLoading">
          <QSkeleton v-for="n in 3" :key="n" type="rect" class="q-mb-sm" />
        </div>
        <template v-else>
          <div v-if="statusFilter" class="results-text">{{ selectedSongs?.length }} results</div>
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

const statusFilter = ref<SongStatus | null>(null);
const vocalFilter = ref<number[]>([]);
const selectedSongs = computed(() => {
  if (!statusFilter.value && !vocalFilter.value.length) return;

  let filteredSongs = statusFilter.value
    ? songStore.getSongsByStatus([statusFilter.value])
    : songStore.songs;

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
    if (!props.status) return;
    statusFilter.value = props.status;
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

:deep(.q-field__native) {
  text-transform: capitalize;
}
</style>
