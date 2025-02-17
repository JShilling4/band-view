<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-mr-md"
          no-caps
          dense
          @click="onAddSetlistClick"
        />
        <AppSelect
          v-model="activeTab"
          :options="setlistStore.setlists.map((sl) => sl.name)"
          fill-input
          label="Select Setlist"
        />
        <a v-if="selectedSetlist?.url" :href="selectedSetlist.url" target="_blank" rel="noreferrer">
          <QIcon :name="IconClasses.Download.join(' ')" class="download-icon q-ml-lg" size="sm" />
        </a>
        <div v-if="selectedSetlist && isAdmin" class="admin-controls q-ml-lg">
          <QIcon
            :name="IconClasses.Edit.join(' ')"
            color="blue-5"
            size="sm"
            class="edit-icon q-mr-sm"
            @click.stop="onEditSetlistClick(selectedSetlist.id)"
          />
          <QIcon
            :name="IconClasses.Delete.join(' ')"
            size="sm"
            class="delete-icon"
            @click.stop="onDeleteSetlistClick(selectedSetlist.id)"
          />
        </div>
      </div>
      <div v-if="selectedSetlist" class="setlist-container row q-col-gutter-xl">
        <SetItem
          v-for="setId in selectedSetlist.sets"
          :key="setId"
          :setlist-id="selectedSetlist.id"
          :set="setStore.getSetById(setId)"
        />
      </div>
    </div>
    <SetlistModal
      v-model:show-modal="showSetlistModal"
      v-model:setlist="localSetlist"
      v-model:sets-to-create="setsToCreate"
      :action="setlistModalAction"
      persistent
      @hide="onHideSetlistModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSetlistUtility } from "@/composables";
import { useMemberStore, useSetStore, useSetlistStore, useSongStore, useUserStore } from "@/stores";
import { IconClasses } from "@/types";

const props = defineProps<{
  pageTitle: string;
  name?: string;
}>();

// Dependencies
const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();
const setlistStore = useSetlistStore();
const userStore = useUserStore();
const {
  onAddSetlistClick,
  showSetlistModal,
  localSetlist,
  setsToCreate,
  setlistModalAction,
  onHideSetlistModal,
  onDeleteSetlist,
  onEditSetlistClick,
} = useSetlistUtility();

// State
const activeTab = ref("");
const selectedSetlist = computed(() => {
  return setlistStore.setlists.find((setlist) => setlist.name === activeTab.value);
});
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

// Watch
watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
  },
  { immediate: true }
);

watch(
  activeTab,
  (newVal) => {
    router.push({ name: "Setlists", query: { name: newVal } });
  },
  { immediate: true }
);

// Methods
onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  await setStore.fetchSets();
  await setlistStore.fetchSetlists();
});

async function onDeleteSetlistClick(id: number) {
  const setlist = setlistStore.getSetlistById(id);
  if (!setlist) return;

  const success = await onDeleteSetlist(setlist);
  if (success) {
    activeTab.value = "";
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/breakpoints";
.setlist-container {
  flex-wrap: wrap;
}
.set-container {
  width: 100%;

  @include from-tablet {
    flex: 50%;
  }
  @include from-desktop {
    flex: 25%;
  }
}
.set-name {
  font-weight: 600;
  font-size: 18px;
}
</style>
