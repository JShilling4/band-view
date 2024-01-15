<template>
  <q-layout view="hHh lpR fFf">
    <app-header />

    <app-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      :mini-width="47"
      class="bg-grey-10"
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
              color="blue"
              class="mini-icon"
              @click="$router.push('/songs')"
            />
            <q-icon
              name="fa-solid fa-file"
              color="orange"
              class="mini-icon"
              @click="$router.push('/sets')"
            />
            <q-icon
              name="fa-solid fa-paste"
              color="purple"
              class="mini-icon"
              @click="$router.push('/setlists')"
            />
            <q-icon
              name="fa-solid fa-calendar-days"
              color="teal"
              class="mini-icon"
              @click="openBrowserTab('http://www.steelerailband.com/shows')"
            />
            <q-icon
              name="fa-solid fa-gear"
              color="grey-5"
              class="mini-icon"
              @click="$router.push('/settings')"
            />
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
import { onMounted, ref } from "vue";
import { openBrowserTab } from "@/utils/helpers";
import { useMemberStore } from "./stores/member.store";

const leftDrawerOpen = ref(true);

const memberStore = useMemberStore();

onMounted(() => {
  memberStore.fetchMembers();
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
