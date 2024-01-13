<template>
  <div class="topbar-wrapper bg-black shadow-2">
    <div class="row items-center justify-between full-width">
      <div class="app-block">
        <h1 class="app-name">Band View</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.topbar-wrapper {
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  color: white;
}

.app-block {
  display: flex;
  align-items: center;

  .app-name {
    font-size: 1.5rem;
    font-family: Arial, sans-serif;
  }
}
</style>
