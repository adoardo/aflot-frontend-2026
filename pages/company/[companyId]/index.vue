<template>
  <ClientOnly>
    <profile />
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["company"],
})
import profile from "../profile.vue";
</script>

<style lang="scss" scoped></style>
