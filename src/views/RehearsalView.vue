<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    </div>
    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-mr-md"
          no-caps
          dense
          @click="onAddRehearsalClick"
        />
      </div>

      <div v-if="displayRehearsals">
        <div v-for="rehearsal in rehearsalList" :key="rehearsal.id" class="q-mb-sm">
          <div
            class="heading-wrapper text-white bg-teal-10 q-px-sm q-py-xs q-mb-md row items-center"
          >
            <h3 class="text-h6">
              {{ dateStringToDisplay(rehearsal.date) }} - {{ rehearsal.start_time }}
            </h3>
            <div v-if="isAdmin" class="admin-controls q-ml-lg">
              <QIcon
                :name="IconClasses.Edit.join(' ')"
                class="edit-icon q-mr-sm"
                @click="onEditRehearsalClick(rehearsal.id)"
              />
              <QIcon
                :name="IconClasses.Delete.join(' ')"
                class="delete-icon"
                @click="onDeleteRehearsalClick(rehearsal.id)"
              />
            </div>
          </div>
          <RehearsalItem :rehearsal="rehearsal" />
        </div>
      </div>
      <h6 v-else class="text-grey-8">No rehearsals scheduled.</h6>
    </div>

    <RehearsalModal
      v-model:show-modal="showRehearsalModal"
      v-model:rehearsal="localRehearsal"
      :action="rehearsalModalAction"
      persistent
      @hide="onHideRehearsalModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useDateUtility, useRehearsalUtility } from "@/composables";
import { useMemberStore, useRehearsalStore, useSongStore, useUserStore } from "@/stores";
import { IconClasses } from "@/types";

defineProps<{
  pageTitle: string;
}>();

// dependencies
const rehearsalStore = useRehearsalStore();
const memberStore = useMemberStore();
const userStore = useUserStore();
const songStore = useSongStore();
const { dateStringToDisplay } = useDateUtility();
const {
  onAddRehearsalClick,
  showRehearsalModal,
  localRehearsal,
  rehearsalModalAction,
  onHideRehearsalModal,
  onDeleteRehearsalClick,
  onEditRehearsalClick,
} = useRehearsalUtility();

// lifecycle hooks
onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  rehearsalStore.fetchRehearsals();
});

const displayRehearsals = computed(() => {
  return rehearsalStore.getRehearsalsOnOrAfterDate(new Date()).length;
});
const rehearsalList = computed(() => {
  return rehearsalStore.getRehearsalsOnOrAfterDate(new Date());
});
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
</script>

<style lang="scss" scoped>
.QItem {
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}

.song-list {
  max-width: 500px;
}

.section-header {
  font-weight: 500;
  font-size: 17px;
  color: gray;
}
</style>
