<script setup lang="ts">
import { ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useSetStore } from "@/stores/set.store";
import { useSongStore } from "@/stores/song.store";
import { storeToRefs } from "pinia";

const setStore = useSetStore();
const songStore = useSongStore();

const { sets } = storeToRefs(setStore);
const { songs } = storeToRefs(songStore);

const activeSet = ref("");
</script>

<template>
  <div class="page-wrapper">
    <div class="main-content">
      <section class="section song-container">
        <h2 class="section-title">Unassigned Songs</h2>
        <div class="song-list">
          <vue-draggable-next
            v-model="songs"
            handle=".handle"
            group="set1.songList"
          >
            <div class="song row" v-for="(song, index) in songs" :key="index">
              <font-awesome-icon class="handle" icon="fa-solid fa-times" />
              <span class="lead-vocal">{{ song.leadVocal.join(",") }}</span>
              <span class="song-name">{{ song.name }}</span>
            </div>
          </vue-draggable-next>
        </div>
      </section>

      <section class="section set-container">
        <q-card>
          <q-tabs
            v-model="activeSet"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              v-for="set in sets"
              :key="set.order"
              :name="set.name"
              :label="set.name"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="activeSet" animated>
            <q-tab-panel v-for="set in sets" :name="set.name">
              <h2 class="section-title">
                {{ set.name }}
                <span class="accent">
                  ({{ set.songCount - set.songList.length }})
                </span>
              </h2>
              <ul class="set-list">
                <vue-draggable-next
                  v-model="set.songList"
                  handle=".handle"
                  group="set1.songList"
                >
                  <li class="song" v-for="song in set.songList">
                    <font-awesome-icon
                      class="handle"
                      icon="fa-solid fa-times"
                    />
                    <span class="lead-vocal">{{
                      song.leadVocal.join(",")
                    }}</span>
                    <span class="song-name">{{ song.name }}</span>
                  </li>
                </vue-draggable-next>
              </ul>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
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
      .accent {
        color: teal;
      }
    }
  }
}
.song-list,
.set-list {
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
