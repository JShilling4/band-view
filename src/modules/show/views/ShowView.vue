<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
      <a href="http://www.steelerailband.com/shows" class="q-ml-auto" target="_blank">
        Website Calendar
      </a>
    </div>

    <div class="page-content">
      <div v-if="isLoading" class="text-center q-pa-md">
        <QSpinner size="3em" color="primary" />
        <div class="text-subtitle1 q-mt-sm">Loading shows...</div>
      </div>

      <div v-else-if="error" class="text-center text-negative q-pa-md">
        <div class="text-h6">Error loading shows</div>
        <div class="text-subtitle1">{{ error }}</div>
        <QBtn color="primary" class="q-mt-sm" @click="loadData">Retry</QBtn>
      </div>

      <template v-else>
        <ShowCalendar />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
defineProps<{
  pageTitle: string;
  range?: string;
}>();

// Dependency
const showStore = useShowStore();
const { fetchVenues } = useVenueStore();
const { fetchMembers } = useMemberStore();

// State
const isLoading = ref(false);
const error = ref<string | null>(null);

// Methods
const loadData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await Promise.all([fetchMembers(), fetchVenues(), showStore.fetchShows()]);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.show {
  width: 300px;
  flex-grow: 1;
}
</style>
