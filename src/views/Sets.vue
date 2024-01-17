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
            v-for="(set, index) in setStore.sets"
            :key="index"
            :name="set.name"
            :label="set.name"
            no-caps
            class="tab text-blue-10"
          />
        </q-tabs>
      </div>

      <div class="song-container q-mb-lg">
        <!-- <q-list>
          <q-item dense>
            <q-item-section>
              <q-item-label> </q-item-label>
              <q-item-label lines="1"> </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon
                name="fa-brands fa-youtube"
                color="red-9"
                class="song-link-icon"
              />
            </q-item-section>
          </q-item>

          <q-separator spaced />
        </q-list> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member.store";
import { useSetStore } from "@/stores/set.store";
import { openBrowserTab } from "@/utils/helpers";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  pageTitle: string;
  name: string;
}>();

const router = useRouter();
const memberStore = useMemberStore();
const setStore = useSetStore();

const activeTab = ref("");

const selectedSet = computed(() => {
  return setStore.sets.filter((set) => set.name === activeTab.value);
});

watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
  },
  { immediate: true }
);

watch(activeTab, (newVal) => {
  router.push({ name: "Sets", query: { name: newVal } });
});

onMounted(() => {
  if (!setStore.sets.length) {
    setStore.fetchSets();
  }
});
</script>

<style lang="scss" scoped></style>
