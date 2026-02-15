<template>
  <div
    :style="{ backgroundColor: background ? offBackground : '' }"
    class="custom-layout"
  >
    <AfHeaderColor />
    <slot />
    <AfCustomFooter />
  </div>
  <ScrollTop/>
</template>

<script setup>
import AfCustomFooter from "../components/AfCustomFooter.vue";
import AfHeaderColor from "~/components/AfHeaderColor.vue";

import ScrollTop from '~/components/ScrollTop.vue';

const props = defineProps({
  background: {
    default: "#eaecf7",
  },
  offBackground: true,
});
</script>

<style lang="scss" scoped>
.custom-layout {
  min-height: 100vh;
}
</style>
