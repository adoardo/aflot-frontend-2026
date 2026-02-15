<template>
  <NuxtLayout class="section-hero navy" name="default-hero">

    <div class="section-hero">
      <AfCustomHeader/>
      <div class="vabout-top">
      <div class="container">
        <div class="vabout-top-block">
          <div class="vabout-pag">
            <a href="/" class="vabout-pag-link"><text class="vabout-cursor">←</text>На главную</a>
          </div>
        </div>
      </div>
    </div>
    </div>

    <section class="section-flot">
      <div class="container">
        <div class="no-results">
          <span style="font-size: 50px;">404</span>
          <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img">
        </div>
      </div>
    </section>
    <AfCustomFooter/>
  </NuxtLayout>
</template>



<script setup>
import FlotItem from "~/components/list/FlotItem.vue";
</script>
<style scoped>
.no-results{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
