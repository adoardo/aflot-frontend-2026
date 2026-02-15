<template>
  <a :href="'/vacancy/' + data.id">
    <div class="vak-item">
      <div class="vak-top">
        <div class="vak-info">
          <div class="vak-title-top">
            <h3 class="vak-title">
              {{ data.position }}
              <img src="assets/img/vak/icon.svg" alt="image" />
            </h3>
            <div v-if="data.photo_path" class="vak-logo">
              <img :src="data.photo_path" alt="logo"/>
            </div>
            <div v-else class="vacancy__logo vacancy__logo_empty no-fio">
              <div class="ed-lk-fn-ln"></div>
              <text>⚓</text>
            </div>
          </div>

          <div class="vak-dop">
            <div v-if="data.company_id" class="vak-dop-link" style="cursor: pointer;">
              <img src="assets/img/responses/company.png" alt=""/>
              <a :href="'/company/vacancies/'+data.company_id" target="_blank" class="vak-dop-link">
                <span>{{ data.company_name }}</span>
              </a>
            </div>
            <div v-if="data.vessel" class="vak-dop-link" style="cursor: pointer;">
              <img src="assets/img/responses/ship.png" alt=""/>
              <a :href="'/navy/vacancies/'+data.vessel" target="_blank" class="vak-dop-link">
                <span>{{ data.vessel_data.vessel_name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="vak-bottom">
        <div class="vak-bottom-item">
          <div class="vak-subtitle">Зарплата:</div>
          <strong v-if="data.salary_from && data.salary_to">{{ data.salary_from }} - {{ data.salary_to }} ₽</strong>
          <strong v-else-if="data.salary_from">от {{ data.salary_from }} ₽</strong>
          <strong v-else-if="data.salary_to">до {{ data.salary_to }} ₽</strong>
          <strong v-else>не указана</strong>
        </div>
        <div class="vak-bottom-item">
          <div class="vak-subtitle">Дата посадки:</div>
          {{ data.departureDateDisplay }}
        </div>
        <div class="vak-bottom-item">
          <div class="vak-subtitle">Длит-ть контракта:</div>
          {{ data.contract_duration }}
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped>
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
.vacancy__logo_empty.no-fio {
  position: relative;
  opacity: .8;
}
.vacancy__logo_empty.no-fio .ed-lk-fn-ln {
  width: 63px;
  height: 63px;
  background: transparent;
  border:1px solid #3b45a9;
}
.vacancy__logo_empty.no-fio text {
  bottom: 18px;
  left: calc(50% - 13px);
  font-size: 20px;
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

a.vak-dop-link:hover span {
  border-bottom: 1px solid #fff;
}
.vak-logo img {
  width: 65px;
  object-fit: cover;
}
.vak-dop {
  gap: 0px;
  width: 100%;
  min-height: 40px;
}
.vak-dop > div:not(.vacancy__info):nth-child(1) {
  width: 60%;
}
.vak-dop > div:not(.vacancy__info):nth-child(2) {
  width: 40%;
}
a.vak-dop-link {
  display: inline;
}
.vak-title-top {
  height: 65px;
}
</style>
