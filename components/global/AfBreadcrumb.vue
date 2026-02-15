<template>
  <div class="vabout-top">
    <div class="container">
      <div class="vabout-top-block">
        <a href="#" class="vabout-cursor"> ← </a>
        <div class="vabout-pag">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
            <NuxtLink v-if="!crumb.active" :to="crumb.to" class="vabout-pag-link">{{
              crumb.text
            }}</NuxtLink>
            <span v-else>{{ crumb.text }}</span>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter((p) => p);
  const breadcrumbs = paths.map((path, index, arr) => {
    const to = "/" + arr.slice(0, index + 1).join("/");
    const text = path.replace("-", " ");
    return {
      text: text.charAt(0).toUpperCase() + text.slice(1),
      to,
      active: index === arr.length - 1,
    };
  });

  return [{ text: "Главная", to: "/" }, ...breadcrumbs];
});
</script>

<style lang="scss" scoped>
.breadcrumb-item {
  color: white;
  a,
  span {
    color: inherit;
  }
}
</style>
