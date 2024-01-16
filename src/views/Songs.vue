<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="tabs-container q-mb-md">
        <q-tabs
          v-model="activeTab"
          inline-label
          :breakpoint="0"
          narrow-indicator
          dense
          indicator-color="transparent"
          active-bg-color="blue-10"
          active-color="grey-11"
          align="left"
        >
          <q-tab
            v-for="(status, index) in SONG_STATUSES"
            :key="index"
            :name="status"
            :label="status"
            no-caps
            class="tab text-blue-10"
          />
        </q-tabs>
      </div>

      <div class="song-container q-mb-lg">
        <div class="results-text">
          {{ songStore.getSongsByStatus(activeTab).length }} results
        </div>
        <q-list>
          <div v-for="song in selectedSongs" :key="song.id">
            <q-item dense>
              <q-item-section>
                <q-item-label>
                  {{ `${song.artist} - ${song.title}` }}
                </q-item-label>
                <q-item-label v-if="song.vocalLead" lines="1">
                  Vocal:
                  <span
                    :style="{
                      color:
                        memberStore.getMemberById(song.vocalLead)
                          ?.profileColor ?? '',
                      fontWeight: 600,
                      fontSize: '13px',
                    }"
                  >
                    {{
                      memberStore.getMemberById(song.vocalLead)?.firstName ?? ""
                    }}
                  </span></q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-icon
                  v-if="song.linkUrl"
                  name="fa-brands fa-youtube"
                  color="red-9"
                  class="song-link-icon"
                  @click="openBrowserTab(song.linkUrl)"
                />
              </q-item-section>
            </q-item>

            <q-separator spaced />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useSongStore } from "@/stores/song.store";
import { useMemberStore } from "@/stores/member.store";
import { SONG_STATUSES, SongStatus } from "@/types";
import { openBrowserTab } from "@/utils/helpers";
import { useRouter } from "vue-router";

const props = defineProps<{
  pageTitle: string;
  status: SongStatus;
}>();

const router = useRouter();
const songStore = useSongStore();
const memberStore = useMemberStore();

const activeTab = ref<SongStatus>("active");

const selectedSongs = computed(() => {
  return songStore.songs.filter((song) => song.status === activeTab.value);
});

watch(
  () => props.status,
  () => {
    if (!props.status) return;
    activeTab.value = props.status;
  },
  { immediate: true }
);

watch(activeTab, (newVal) => {
  router.push({ name: "Songs", query: { status: newVal } });
});

onMounted(() => {
  if (!songStore.songs.length) {
    songStore.fetchSongs();
  }
});
</script>

<style lang="scss" scoped>
.tab {
  /* padding-left: 0; */
  text-transform: capitalize;
  font-weight: 300;
  letter-spacing: 1px;
}

.results-text {
  font-size: 18px;
  margin-bottom: 1rem;
  font-weight: 600;
  color: gray;
}

.q-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}

.song-link-icon {
  cursor: pointer;
}
</style>
