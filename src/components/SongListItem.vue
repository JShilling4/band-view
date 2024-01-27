<template>
  <q-item :clickable="isAdmin">
    <q-item-section @click="$emit('song-clicked')">
      <q-item-label>
        <span v-if="typeof index === 'number'" style="width: 1.5rem; display: inline-block"
          >{{ index + 1 }}.
        </span>
        <span class="song-artist">{{ song.artist }} - </span>
        <span class="song-title">{{ song.title }}</span>
      </q-item-label>
      <q-item-label v-if="song.vocal_lead" lines="1" class="song-metadata">
        Vocal:
        <span
          :style="{
            color: memberStore.getMemberById(song.vocal_lead)?.profile_color ?? '',
          }"
          class="song-vocal-lead"
        >
          {{ memberStore.getMemberById(song.vocal_lead)?.first_name ?? "" }}
        </span></q-item-label
      >
    </q-item-section>
    <q-item-section side top>
      <div>
        <span v-if="song.link_url">
          <q-icon
            name="fa-brands fa-youtube"
            color="red-9"
            class="song-link-icon"
            size="sm"
            @click="openBrowserTab(song.link_url)"
          />
        </span>
        <span v-if="song.download_url" class="q-ml-md">
          <q-icon
            name="fa-solid fa-download"
            color="green-9"
            class="song-link-icon"
            size="sm"
            @click="openBrowserTab(song.download_url)"
          />
        </span>
        <span v-if="isAdmin" class="admin-controls q-ml-md">
          <q-icon
            name="fa-solid fa-trash-alt"
            color="red-10"
            size="sm"
            @click="onDeleteSetSong(song.id)"
          />
        </span>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useMemberStore, useSongStore } from "@/stores";
import { Tables, isAdminIK } from "@/types";
import { openBrowserTab } from "@/utils/helpers";
import { inject } from "vue";

const memberStore = useMemberStore();
const songStore = useSongStore();
const isAdmin = inject(isAdminIK);

defineProps<{
  song: Tables<"song">;
  index?: number;
}>();

const emit = defineEmits<{
  (e: "song-clicked"): void;
}>();

function onDeleteSetSong(id: number) {
  songStore.deleteSong(id);
}
</script>

<style lang="sass" scoped>
.q-item
  padding-left: 0 !important
  padding-right: 0 !important
  font-family: Roboto, sans-serif
  font-weight: 400



.song-artist
  color: rgb(148, 148, 148)
  font-weight: 500

.song-link-icon
  cursor: pointer

.song-metadata
  font-size: 13px
</style>
