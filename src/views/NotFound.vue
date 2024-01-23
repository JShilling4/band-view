<template>
  <div class="container">
    <h1 class="heading">
      Ooops!! That page doesn't exist. <br />
      So you might want to return to your last page.
    </h1>

    <q-btn
      class="q-mt-xl"
      rounded
      no-caps
      color="blue-10"
      size="lg"
      padding=".5rem 5rem"
      @click="$router.replace('/')"
    >
      Return
    </q-btn>
  </div>
</template>

<style lang="sass" scoped>
.container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 80vh

.heading
  text-align: center
  font-size: 40px
  font-weight: 500
</style>
