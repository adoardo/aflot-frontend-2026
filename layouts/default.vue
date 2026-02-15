<template>
  <div>
    <AfCustomHeader/>
    <slot/>
    <AfCustomFooter v-if="footer"/>
  </div>
  <ScrollTop/>
</template>

<script setup>
import AfCustomHeader from "../components/AfCustomHeader.vue";
import AfCustomFooter from "../components/AfCustomFooter.vue";
import AfNav from "../components/AfNav.vue";

import ScrollTop from '../components/ScrollTop.vue';

const props = defineProps({
  footer: {
    type: Boolean,
    default: true,
  },
});
</script>
