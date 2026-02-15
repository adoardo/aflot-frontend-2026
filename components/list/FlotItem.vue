<template>
  <div class="flot-item">
    <div class="flot-item__top">
      <div class="flot-item__title">{{ data.vessel_name }}</div>
      <div class="flot-item__gray">IMO: {{ data.imo }}</div>
    </div>

    <div class="flot-item__middle">
      <div class="flot-item__content">
        <a v-if="false" href="#" class="flot-item__logo">
          <img src="assets/img/flot/logo-cart.png" alt="image">
        </a>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">Тип судна</div>
          <div v-if="data.ship_type" class="flot-item__subtext">{{data.ship_type}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">Год постройки:</div>
          <div v-if="data.year_built" class="flot-item__subtext">{{data.year_built}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">Длина</div>
          <div v-if="data.length" class="flot-item__subtext">{{data.length}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">Ширина</div>
          <div v-if="data.width" class="flot-item__subtext">{{data.width}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">DWT (t):</div>
          <div v-if="data.dwt" class="flot-item__subtext">{{data.dwt}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div class="flot-item__part">
          <div class="flot-item__subtitle">kW</div>
          <div v-if="data.kw" class="flot-item__subtext">{{data.kw}}</div>
          <div v-else class="flot-item__subtext">-</div>
        </div>

        <div v-if="data.vacancy_count" class="flot-item__part">
        </div>

        <div v-if="data.vacancy_count" class="flot-item__part">
          <a :href="'/navy/vacancies/' + data.id" target="_blank" class="flot-item__link">
            Доступно вакансий: {{data.vacancy_count}}
          </a>
        </div>

      </div>

    </div>

    <div v-if="false" class="flot-item__end">
      <a href="#" class="flot-item__dop">
        <img src="assets/img/flot/icon-1.svg" alt="image">
        <span class="flot-item__link">О судне</span>
        <!-- /.flot-item__link -->
      </a>
      <!-- /.flot-item__dop -->
      <a href="#" class="flot-item__dop">
        <img src="assets/img/flot/icon-2.svg" alt="image">
        <span class="flot-item__link">О компании OJ CREW</span>
        <!-- /.flot-item__link -->
      </a>
      <!-- /.flot-item__dop -->
    </div>
    <!-- /.flot-item__end -->
  </div>
</template>

<script setup>

const props = defineProps({
  data: {},
});
</script>

<style lang="scss" scoped>
.flot-content-navy .flot-content .flot-item__content {
  grid-template-columns: repeat(4, 25%);
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .flot-content-navy .flot-content .flot-item__content {
    grid-template-columns: repeat(2, 50%);
  }
}
</style>
