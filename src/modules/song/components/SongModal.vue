<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ action }} Song</h6>
      </QCardSection>
      <QCardSection v-if="song" class="modal-body">
        <QInput v-if="isAdmin && 'id' in song" v-model="song.id" label="ID" readonly />
        <QInput v-model="song.artist" label="Artist" />
        <QInput v-model="song.title" label="Title" />
        <QSelect v-model="song.status" :options="SONG_STATUSES" label="Status" behavior="menu" />
        <QSelect
          v-model="song.vocal_lead"
          :options="memberStore.members"
          option-value="id"
          :option-label="(option: Tables<'member'>) => `${option.first_name} ${option.last_name}`"
          label="Vocal Lead"
          emit-value
          map-options
          clearable
          behavior="menu"
          @update:model-value="
            (val: string | null) => {
              if (!val) val = null;
            }
          "
        />
        <QSelect
          v-model="song.vocal_second"
          :options="memberStore.members.filter((m: Tables<'member'>) => m.id !== song?.vocal_lead)"
          option-value="id"
          :option-label="(option: Tables<'member'>) => `${option.first_name} ${option.last_name}`"
          label="Vocal Second"
          emit-value
          map-options
          clearable
          behavior="menu"
          @update:model-value="
            (val: string | null) => {
              if (!val) val = null;
            }
          "
        />
        <QSelect
          v-model="song.vocal_third"
          :options="
            memberStore.members.filter(
              (m: Tables<'member'>) => m.id !== song?.vocal_lead && m.id !== song?.vocal_second
            )
          "
          option-value="id"
          :option-label="(option: Tables<'member'>) => `${option.first_name} ${option.last_name}`"
          label="Vocal Third"
          emit-value
          map-options
          clearable
          behavior="menu"
          @update:model-value="
            (val: string | null) => {
              if (!val) val = null;
            }
          "
        />
        <QInput v-model="song.link_url" label="YouTube Link" />
        <QInput v-model="song.download_url" label="Download Link" />
        <div class="row q-mt-md items-center">
          <span class="radio-label q-field__label q-mr-sm">Highlighted?</span>
          <QOptionGroup
            v-model="song.is_highlighted"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]"
            color="primary"
            inline
          />
        </div>
        <QSelect
          v-model="song.specials"
          :options="SONG_SPECIALS"
          label="Specials"
          multiple
          behavior="menu"
        />
        <QInput v-model="song.length" label="Length" />
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn v-close-popup label="Save" color="green-10" no-caps @click="onSaveSong" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { type Tables } from "@/core/models";
import { type LocalSong, SONG_SPECIALS, SONG_STATUSES } from "@/modules/song/models";

const props = defineProps<{
  action: "Add" | "Edit";
}>();

const song = defineModel<LocalSong | Tables<"song">>("song");
const showModal = defineModel<boolean>("showModal");
const memberStore = useMemberStore();
const songStore = useSongStore();
const userStore = useUserStore();

const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

async function onSaveSong() {
  if (!song.value) return;
  if (props.action === "Add") {
    await songStore.createSong(song.value);
  } else {
    await songStore.updateSong(song.value as Tables<"song">);
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/breakpoints" as *;

.modal-content {
  width: 100%;

  @include from-tablet {
    width: 500px;
  }
}

.modal-body {
  padding: 0 1.5rem 2rem;
}
</style>
