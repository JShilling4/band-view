<template>
  <QItem v-if="song" :clickable="isAdmin" :class="{ highlight: song.is_highlighted }">
    <QItemSection @click="isAdmin && $emit('song-clicked')">
      <QItemLabel>
        <span v-if="typeof index === 'number'" class="song-index">{{ index + 1 }}. </span>
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
      </QItemLabel>
      <QItemLabel v-if="song.vocal_lead" lines="1" class="song-metadata">
        Vocal:
        <span
          :style="{
            color: memberStore.getMemberById(song.vocal_lead)?.profile_color ?? '',
          }"
          class="vocal-lead"
        >
          {{ memberStore.getMemberById(song.vocal_lead)?.first_name ?? "" }}
        </span>
      </QItemLabel>
    </QItemSection>
    <QItemSection side top>
      <div class="song-controls row items-center">
        <span v-if="!hideLinks && song.link_url">
          <QIcon
            name="fa-brands fa-youtube"
            color="red-9"
            class="song-link-icon"
            size="sm"
            @click.stop="openBrowserTab(song.link_url)"
          />
        </span>
        <span v-if="!hideLinks && song.download_url" class="q-ml-md">
          <QIcon
            name="fa-solid fa-download"
            color="green-9"
            class="song-link-icon"
            size="sm"
            @click.stop="openBrowserTab(song.download_url)"
          />
        </span>
        <span v-if="!hideAdmin && isAdmin" class="admin-controls q-ml-md">
          <QIcon
            name="fa-solid fa-trash-alt"
            color="red-5"
            size="sm"
            class="delete-icon"
            @click.stop="$emit('delete', song.id)"
          />
        </span>
      </div>
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { openBrowserTab } from "@/utils/helpers";
import { useMemberStore, useUserStore } from "@/stores";
import { type Tables } from "@/types";

const memberStore = useMemberStore();

interface PropTypes {
  song?: Tables<"song">;
  hideArtist?: boolean;
  hideSpecials?: boolean;
  hideAdmin?: boolean;
  hideLinks?: boolean;
  index?: number;
}

withDefaults(defineProps<PropTypes>(), {
  song: undefined,
  hideArtist: false,
  hideSpecials: false,
  hideLinks: false,
  hideAdmin: false,
  index: undefined,
});

defineEmits<{
  "song-clicked": [];
  delete: [id: number];
}>();

const userStore = useUserStore();
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
</script>

<style lang="scss" scoped>
.q-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
.song-controls {
  iframe {
    width: 22px;
    height: 22px;
    border-radius: 5px;
  }
}
.song-artist {
  color: rgb(148, 148, 148);
  font-weight: 500;
  line-height: 1.75;
}
.song-link-icon {
  cursor: pointer;
}
.song-metadata {
  font-size: 13px;
}
.song-index {
  width: 1.5rem;
  display: inline-block;
}
.highlight {
  background-color: #fefed2;
}
</style>
