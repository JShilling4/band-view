<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    <div class="page-content">
      <QSpinner v-if="isLoading" color="primary" size="3em" />
      <div v-else-if="error" class="text-negative q-pa-md">
        {{ error }}
      </div>
      <template v-else>
        <div class="top-controls q-mb-md row items-center">
          <QBtn
            v-if="userStore.memberIsAdmin"
            color="teal-10"
            icon="fa-solid fa-plus"
            class="q-mr-md"
            no-caps
            dense
            :aria-label="ariaLabels.addSetlist"
            @click="onAddSetlistClick"
          />
          <AppSelect
            v-model="activeTab"
            :options="setlistStore.setlists.map((sl) => sl.name)"
            fill-input
            label="Select Setlist"
          />
          <a
            v-if="selectedSetlist?.url"
            :href="selectedSetlist.url"
            target="_blank"
            rel="noreferrer"
          >
            <QIcon
              :name="IconClasses.Download.join(' ')"
              class="download-icon q-ml-lg"
              size="sm"
              :aria-label="ariaLabels.downloadSetlist"
            />
          </a>
          <div v-if="selectedSetlist && userStore.memberIsAdmin" class="admin-controls q-ml-lg">
            <QIcon
              :name="IconClasses.Edit.join(' ')"
              color="blue-5"
              size="sm"
              class="edit-icon q-mr-sm"
              :aria-label="ariaLabels.editSetlist"
              @click.stop="onEditSetlistClick(selectedSetlist.id)"
            />
            <QIcon
              :name="IconClasses.Delete.join(' ')"
              size="sm"
              class="delete-icon"
              :aria-label="ariaLabels.deleteSetlist"
              @click.stop="onDeleteSetlistClick(selectedSetlist.id)"
            />
          </div>
        </div>
        <div v-if="!selectedSetlist && activeTab" class="text-center q-pa-md">
          No setlist found with the name "{{ activeTab }}"
        </div>
        <div v-else-if="selectedSetlist?.sets?.length === 0" class="text-center q-pa-md">
          This setlist is empty
        </div>
        <div v-else-if="selectedSetlist" class="setlist-container row q-col-gutter-xl">
          <SetDetails
            v-for="setId in selectedSetlist.sets"
            :key="setId"
            :setlist-id="selectedSetlist.id"
            :set="setStore.getSetById(setId)"
          />
        </div>
      </template>
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
import { IconClasses } from "@/core/models";

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

const ariaLabels = {
  addSetlist: "Add new setlist",
  editSetlist: "Edit setlist",
  deleteSetlist: "Delete setlist",
  downloadSetlist: "Download setlist",
};

// State
const activeTab = ref("");
const selectedSetlist = computed(() => {
  return setlistStore.setlists.find((setlist) => setlist.name === activeTab.value);
});
const isLoading = ref(false);
const error = ref<string | null>(null);

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
  try {
    isLoading.value = true;
    error.value = null;
    await Promise.all([
      memberStore.fetchMembers(),
      songStore.fetchSongs(),
      setStore.fetchSets(),
      setlistStore.fetchSetlists(),
    ]);
  } catch (err) {
    error.value = "Failed to load setlist data. Please try again.";
    console.error("Error loading setlist data:", err);
  } finally {
    isLoading.value = false;
  }
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
@use "@/scss/breakpoints" as *;

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

.q-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.edit-icon,
.delete-icon {
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}
</style>
