<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
    class="px-5"
  >
    <slot />
  </v-card>
</template>

<script>
  export default { name: 'AppCard' }
</script>

<style scoped>
</style>
