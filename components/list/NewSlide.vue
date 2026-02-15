<template>
  <div class="new-slide">
    <NuxtLink :to="'/news/' + data._id" class="new-item">
      <div class="new-top">
        <img src="assets/img/new/image.png" alt="image" class="new-img" />
        <div class="new-top__title">
          <div class="new-top__number">{{ dayOfMonth }}</div>
          <div class="new-top__subtitle">{{ dateAsString }}</div>
        </div>
      </div>

      <div class="new-content">
        <div class="new-text">{{ data.title }}</div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    photo_path: "",
    title: "",
    date: "",
  },
});

const dateParts = computed(() => {
  return props.data.created_at.split(" ");
});

const dayOfMonth = computed(() => {
  return dateParts.value[0];
});
const dateAsString = computed(() => {
  return dateParts.value.slice(1).join(" ");
});
</script>

<style lang="scss" scoped></style>
