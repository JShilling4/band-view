<script setup lang="ts">
import { ref } from "vue";
import { Song } from "@/types";
import { VueDraggableNext } from "vue-draggable-next";

const songlist = ref<Song[]>([
  {
    name: "Heart On Fire",
    leadVocal: ["Ken"],
    hasBanjoStandard: false,
    hasBanjoTunedUp: false,
    starters: ["KV"],
  },
  {
    name: "Fast As You",
    leadVocal: ["Ken"],
    hasBanjoStandard: false,
    hasBanjoTunedUp: false,
    starters: ["KV"],
  },
  {
    name: "Boots Made For Walkin",
    leadVocal: ["Amber"],
    hasBanjoStandard: false,
    hasBanjoTunedUp: false,
    starters: ["M", "Gtrs"],
  },
]);

const set1 = ref<Song[]>([]);
</script>

<template>
  <div class="page-wrapper">
    <div class="main-content">
      <section class="section song-container">
        <h2 class="section-title">Unassigned Songs</h2>
        <div class="song-list">
          <vue-draggable-next v-model="songlist" handle=".handle">
            <div
              class="song row"
              v-for="(song, index) in songlist"
              :key="index"
            >
              <font-awesome-icon class="handle" icon="fa-solid fa-times">
              </font-awesome-icon>
              <span class="lead-vocal">{{ song.leadVocal.join(",") }}</span>
              <span class="song-name">{{ song.name }}</span>
            </div>
          </vue-draggable-next>
        </div>
      </section>

      <section class="section set-container">
        <h2 class="section-title">Set 1</h2>
        <ul class="set-list">
          <li class="song" v-for="song in set1">
            <span class="lead-vocal">{{ song.leadVocal.join(",") }}</span>
            <span class="song-name">{{ song.name }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  padding: 2rem;
}
.main-content {
  display: flex;

  .section {
    width: 50%;
    .section-title {
      margin-bottom: 2rem;
    }
  }
}
.song-list {
  .song {
    font-size: 2rem;
    cursor: default;
    .lead-vocal {
      display: inline-block;
      width: 8rem;
    }
    .song-name {
    }
  }
}
</style>
