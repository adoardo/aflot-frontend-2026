<template>
    <div class="new-slide swiper-slide">
      <a :href="'/news/'+data._id">
        <div class="new-top">
          <img v-if="data.photo_path" :src="data.photo_path" :alt="data.title" class="new-img"/>
          <div class="afn-logo-r-list" v-if="!data.photo_path"></div>
          <div class="new-top__title">
            <div class="new-top__number">
              {{ data.afDate1 }}
            </div>

            <div class="new-top__subtitle">
              {{ data.afDate2 }}
            </div>
          </div>
        </div>

        <div class="new-content">
          <div class="new-text">
            {{data.title}}
          </div>
        </div>
      </a>
    </div>

</template>

<script setup>

const props = defineProps({
  data: {},
});
</script>

<style lang="scss" scoped>
.new-top {
  height: 195px;
  img {
    height: 100%;
    background-size: cover;
  }
}

</style>
