<template>
  <q-dialog v-model="showModal" persistent>
    <q-card class="modal-content">
      <q-card-section class="modal-heading row items-center">
        <h6>Add Song</h6>
      </q-card-section>
      <q-card-section v-if="song" class="modal-body">
        <q-input v-model="song.artist" label="Artist" />
        <q-input v-model="song.title" label="Title" />
        <q-select v-model="song.status" :options="SONG_STATUSES" label="Status" />
        <q-select
          v-model="song.vocal_lead"
          emit-value
          map-options
          :options="memberStore.members"
          option-value="id"
          :option-label="(option) => `${option.first_name} ${option.last_name}`"
          label="Vocal Lead"
        />
        <q-input v-model="song.link_url" label="YouTube Link" />
        <q-input v-model="song.download_url" label="Download Link" />
        <q-select v-model="song.mood" :options="SONG_MOODS" label="Mood" />
        <q-select v-model="song.specials" :options="SONG_SPECIALS" label="Specials" multiple />
      </q-card-section>
      <q-card-actions align="right" class="modal-controls">
        <q-btn outline label="Cancel" color="black" no-caps v-close-popup />
        <q-btn label="Save" color="green-10" no-caps v-close-popup @click="onSaveSong" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useMemberStore, useSongStore } from "@/stores";
import { type LocalSong, SONG_MOODS, SONG_SPECIALS, SONG_STATUSES, type Tables } from "@/types";

const props = defineProps<{
  action: "Add" | "Edit";
}>();

const song = defineModel<LocalSong | Tables<"song">>("song");
const showModal = defineModel<boolean>("showModal");
const memberStore = useMemberStore();
const songStore = useSongStore();

async function onSaveSong() {
  if (!song.value) return;
  if (props.action === "Add") {
    await songStore.createSong(song.value);
  } else {
    await songStore.updateSong(song.value as Tables<"song">);
  }
}
</script>

<style lang="sass" scoped>
@import "../scss/breakpoints"
.modal-content
  width: 325px

  @include md
    width: 500px

.modal-body
  padding: 0 2rem 2rem
</style>
