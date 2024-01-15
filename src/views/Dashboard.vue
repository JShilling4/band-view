<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <!-- <div class="member-container q-mb-lg">
      <h2>Members</h2>
      <div v-for="member in members" :key="member.id">
        <div>{{ member.name }}</div>
        <div>Vocal leads -{{ member.song.length }}</div>
      </div>
    </div>



    <div class="set-container">
      <h2>Sets</h2>
      <div v-for="set in sets" :key="set.id" class="q-mb-lg">
        {{ set.name }}
        <div v-for="song in set.song">{{ song.title }}</div>
      </div>
    </div>

    <div class="setlist-container">
      <h2>Setlists</h2>
      <div v-for="setlist in setlists" :key="setlist.id">
        {{ setlist.name }}
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import supabase from "@/supabase";
import { QueryData } from "@supabase/supabase-js";
import { Tables } from "@/types";
import { useMemberStore } from "@/stores/member.store";

defineProps<{
  pageTitle: string;
}>();

// const members = ref<Tables<"member">[]>([]);
// const sets = ref<Sets>([]);
// const setlists = ref<Tables<"setlist">[]>([]);

// async function getMembers(): Promise<void> {
//   const { data: member, error } = await supabase.from("member").select("*");
//   if (!member) return;
//   members.value = member;
// }

// async function getSetlists(): Promise<void> {
//   const { data: setlist, error } = await supabase.from("setlist").select("*");
//   if (!setlist) return;
//   setlists.value = setlist;
// }

// const setQuery = supabase
//   .from("set")
//   .select(
//     `
//     id,
//     name,
//     song (artist, title)
//   `
//   )
//   .order("sort_order");
// type Sets = QueryData<typeof setQuery>;
// async function getSets() {
//   const { data: set, error } = await setQuery;
//   if (!set) return;
//   const queryResult: Sets = set;
//   sets.value = queryResult;
// }
</script>

<style lang="scss" scoped></style>
