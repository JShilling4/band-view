<template>
  <q-layout view="hHh lpR fFf">
    <app-header />

    <app-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      :mini-width="45"
      class="bg-grey-10"
      mini-to-overlay
    >
      <template #mini>
        <q-scroll-area class="fit mini-slot cursor-pointer">
          <div class="column items-center">
            <q-icon
              name="fa-solid fa-grip"
              color="red-6"
              class="mini-icon"
              @click="$router.push('/')"
            />
            <q-icon
              name="fa-solid fa-music"
              color="blue-5"
              class="mini-icon"
              @click="$router.push('/songs')"
            />
            <q-icon
              name="fa-solid fa-file"
              color="orange-5"
              class="mini-icon"
              @click="$router.push('/sets')"
            />
            <q-icon
              name="fa-solid fa-paste"
              color="purple-4"
              class="mini-icon"
              @click="$router.push('/setlists')"
            />
            <q-icon
              name="fa-solid fa-calendar-days"
              color="teal-4"
              class="mini-icon"
              @click="openBrowserTab('http://www.steelerailband.com/shows')"
            />
            <!-- <q-icon
              name="fa-solid fa-gear"
              color="grey-5"
              class="mini-icon"
              @click="$router.push('/settings')"
            /> -->
          </div>
        </q-scroll-area>
      </template>
    </app-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { openBrowserTab } from "@/utils/helpers";
import { useMemberStore } from "./stores/member.store";
import { useSongStore } from "./stores/song.store";
import { useQuasar } from "quasar";
import { qInjectionKey } from "./types";

const leftDrawerOpen = ref(true);

const memberStore = useMemberStore();
const songStore = useSongStore();
const $q = useQuasar();

provide(qInjectionKey, $q);

onMounted(() => {
  memberStore.fetchMembers();
  songStore.fetchSongs();
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  &.heading {
    line-height: 1.5;
  }
}

.h2 {
  font-size: 26px;
  font-weight: 500;
  line-height: 1.5;
}
ul {
  list-style: none;
}

.page-container {
  padding: 10px 15px;
}

// Quasar overrides
.q-btn {
  letter-spacing: 1px;
}
</style>
