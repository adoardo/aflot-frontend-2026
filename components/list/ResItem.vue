<template>
  <a :href="'/sailor/'+data._id">
    <div class="vacancy vak-item">
          <div class="vacancy__date"

                :class="{
                    'card-red': data.tarif === 'Ищу работу',
                    'card-blue': data.tarif === 'Рассмотрю предложение',
                    'card-grey': data.tarif === 'Трудоустроен',
                  }">
                  {{ data?.tarif }}

    </div>
      <div class="vacancy__label-top">
        <div class="vacancy__label">
          <span class="vacancy-label-name">{{ data.first_name }} {{ data.last_name }} <br v-if="data.patronymic"> {{ data.patronymic }}</span>
          <img src="assets/img/responses/fav.png" alt=""/>
        </div>
        <div v-if="data.photo_path" class="vacancy__logo">
          <img class="vacancy__logo__img" :src="data.photo_path" alt="logo"/>
        </div>
        <div v-else class="vacancy__logo vacancy__logo_empty">
          <div class="ed-lk-fn-ln">
            {{ data.last_name.substring(0, 1).toUpperCase() }} {{ data.first_name.substring(0, 1).toUpperCase() }}
          </div>
          <img src="assets/img/header/logo-white.png" alt="logo"/>
          <text>⚓</text>
        </div>
      </div>
      <div class="vacancy__meta">
        <div class="vacancy__info">
          <div class="vi-item">
            <div class="vi-label">Минимальная зарплата:</div>
            <strong>не указана</strong>
          </div>
          <div class="vi-item">
            <div class="vi-label">Местонахождение:</div>
            <template v-if="!data.region && !data.country">не указано</template>
            <template v-if="data.region && data.country"> {{ data.country }} , {{ data.region }}, {{data?.city}}</template>
            <template v-if="!data.region && data.country">{{ data.country }}</template>
            <template v-if="data.region && !data.country">{{ data.region }}</template>

          </div>
          <Worked :data="data"/>
        </div>
      </div>

    </div>
  </a>
</template>

<script setup>

import Worked from "~/components/list/helpers/Worked.vue";

const props = defineProps({
  data: {},
});
</script>

<style lang="scss" scoped>
.vacancy__logo_empty {
  position: relative;
}

.vacancy__logo_empty .ed-lk-fn-ln {
  width: 107px;
  height: 107px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  background-color: #3b45a9;
  font-size: 26px;
}

.vacancy__logo_empty text {
  position: absolute;
  bottom: 5px;
  left: calc(50% - 14px);
  font-size: 20px;
  filter: grayscale(1) brightness(2);
  opacity: 0.6;
}

.vacancy__logo_empty img {
  position: absolute;
  top: 14px;
  display: flex;
  width: auto;
  left: calc(50% - 32px);
  height: 12px;
  opacity: 0.8;
}
.vacancy__logo > img.vacancy__logo__img {
  height: 65px;
}
.vacancy__logo_empty .ed-lk-fn-ln {
  width: 65px;
  height: 65px;
  font-size: 17px;
}
.vacancy__logo_empty img {
  position: absolute;
  top: 10px;
  display: flex;
  width: auto;
  left: calc(34% - 11px);
  height: 8px;
  opacity: 0.8;
}
.vacancy__logo {
  max-width: 65px;
}
.vacancy__logo_empty text {
  bottom: 1px;
  left: calc(50% - 8px);
  font-size: 14px;
}

.card-red{
  background-color: #9b2719;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  text-align: center;
  margin-bottom: 20px;
}
.card-blue{
  text-wrap: nowrap;
  background-color: #3b45a9;
  color: #fff;
  padding: 5px 10px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
}

.card-grey{
  background-color: #6c757d;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  text-align: center;
  margin-bottom: 20px;
} 
</style>
