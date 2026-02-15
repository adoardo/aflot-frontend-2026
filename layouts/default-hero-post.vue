<template>
  <div>
    <slot/>
  </div>
  <ScrollTop/>
</template>

<script setup>
import AfCustomHeader from "../components/AfCustomHeader.vue";
import AfCustomFooter from "../components/AfCustomFooter.vue";

import ScrollTop from '~/components/ScrollTop.vue';
</script>