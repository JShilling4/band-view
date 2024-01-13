<template>
  <div>
    <div class="member-container q-mb-lg">
      <h2>Members</h2>
      <div v-for="member in members" :key="member.id">
        {{ member.name }}
      </div>
    </div>

    <div class="song-container">
      <h2>Songs</h2>
      <div v-for="song in songs" :key="song.id">
        {{ song.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import supabase from "@/supabase";
import { Tables } from "@/types";

const members = ref<Tables<"band_member">[]>([]);
const songs = ref<Tables<"song">[]>([]);

async function getBandMembers(): Promise<void> {
  const { data: band_member, error } = await supabase
    .from("band_member")
    .select("*");
  members.value = band_member;
}

async function getSongs(): Promise<void> {
  const { data: song, error } = await supabase.from("song").select("*");
  songs.value = song;
}

onMounted(() => {
  getBandMembers();
  getSongs();
});
</script>

<style lang="scss" scoped></style>
