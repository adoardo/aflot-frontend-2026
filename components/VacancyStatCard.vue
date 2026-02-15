<template>
  <div class="stat-item">
    <div class="stat-top">
      <img src="assets/img/dop-page/stat-1.svg" alt="image" class="stat-top-img">

      <div class="stat-top-content">
        <div class="stat-top-title">
          {{ item.position }}
          <span>от {{ formattedDate }}</span>
        </div>

        <div class="stat-top-subtitle">
          Вакансию просмотрели:
          <span>{{ item.views }} раз</span>
        </div>
      </div>
    </div>

    <div class="stat-part">
      <div class="stat-all">
        <div class="stat-all-blue">Итого, вы приняли:</div>
        <div class="stat-all-number">{{ item.total_accepted }}</div>
        <div class="stat-all-title">моряков</div>
      </div>

      <div class="stat-info">
        <div class="stat-info-item">
          <div class="stat-blue">Поступило:</div>
          <div class="stat-red">{{ item.responses_received }} <span>откликов</span></div>
        </div>

        <div class="stat-info-item">
          <div class="stat-blue">Сделали рассылку на:</div>
          <div class="stat-red">{{ item.offers_sent }} <span>предложений</span></div>
        </div>

        <div class="stat-info-item">
          <div class="stat-blue">По откликам, принято:</div>
          <div class="stat-red">{{ item.approved_responses }} <span>моряков</span></div>
        </div>

        <div class="stat-info-item">
          <div class="stat-blue">Ваше предложение приняло:</div>
          <div class="stat-red">{{ item.approved_offers }} <span>моряков</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VacancyStatCard",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      if (!this.item.created_at) return "-";
      return new Date(this.item.created_at).toLocaleDateString("ru-RU");
    }
  }
};
</script>
