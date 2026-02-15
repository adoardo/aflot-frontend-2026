<template>
  <NuxtLink to="/" class="header-logo">
    <img v-if="type === 'white'" src="assets/img/header/logo-white.png" alt="logo" />
    <img v-else src="assets/img/header/logo-blue.png" alt="logo" />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "white",
  },
});
</script>

<style lang="scss" scoped></style>
