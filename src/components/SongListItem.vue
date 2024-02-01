<template>
  <q-item v-if="song" :clickable="isAdmin">
    <q-item-section @click="isAdmin && $emit('song-clicked')">
      <q-item-label>
        <span v-if="typeof index === 'number'" style="width: 1.5rem; display: inline-block"
          >{{ index + 1 }}.
        </span>
        <span v-if="!hideArtist" class="song-artist">{{ song.artist }} - </span>
        <span class="song-title">
          <span class="text-bold text-grey-9">{{ song.title }}&nbsp;</span>
          <span v-if="!hideSpecials && song.specials?.length">
            [
            <span
              v-for="special in song.specials"
              :key="special"
              class="specials-symbols text-grey-6 text-bold q-mr-xs"
            >
              {{ special }}
            </span>
            ]
          </span>
        </span>
      </q-item-label>
      <q-item-label v-if="song.vocal_lead" lines="1" class="song-metadata">
        Vocal:
        <span
          :style="{
            color: memberStore.getMemberById(song.vocal_lead)?.profile_color ?? '',
          }"
          class="vocal-lead"
        >
          {{ memberStore.getMemberById(song.vocal_lead)?.first_name ?? "" }}
        </span>
      </q-item-label>
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
            @click="$emit('delete', song.id)"
          />
        </span>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useMemberStore } from "@/stores";
import { openBrowserTab } from "@/utils/helpers";
import { type Tables, isAdminIK } from "@/types";

const memberStore = useMemberStore();
const isAdmin = inject(isAdminIK);

defineProps<{
  song: Tables<"song">;
  hideArtist?: boolean;
  hideSpecials?: boolean;
  index?: number;
}>();

defineEmits<{
  "song-clicked": [];
  delete: [id: number];
}>();
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
