<template>
  <div class="vacancy vacancy-mailing">
    <div class="vacancy__label-top">
      <div class="vacancy__label">
        <span>{{ item.position }}</span>
        <div class="vacancy__views" v-if="item.view_count">
          <img src="/assets/img/news/icon.svg" alt="views" />
          <span>{{ item.view_count }}</span>
        </div>
      </div>

      <div v-if="item.company_logo || company?.photo_path" class="vacancy__logo">
        <img :src="item.company_logo || company?.photo_path" alt="logo" />
      </div>
    </div>

    <div class="vacancy__meta">
      <div class="vacancy__company" v-if="company?.company_name">
        <img src="/assets/img/responses/company.png" alt="" />
        <span>{{ company.company_name }}</span>
      </div>

      <div class="vacancy__ship" v-if="vesselName">
        <img src="/assets/img/responses/ship.png" alt="" />
        <span>{{ vesselName }}</span>
      </div>
    </div>

    <div class="vacancy__info">
      <div class="vi-item">
        <div class="vi-label">Зарплата:</div>
        <strong>{{ salary }}</strong>
      </div>

      <div class="vi-item">
        <div class="vi-label">Дата посадки:</div>
        {{ departure }}
      </div>

      <div class="vi-item">
        <div class="vi-label">Длит-ть контракта:</div>
        {{ item.contract_duration || "не указана" }}
      </div>
    </div>

    <div class="vacancy__buttons">
      <div class="vacancy__button blue" @click="goToVacancyDetails">
        <img src="/assets/img/dop-page/blue-info.svg" alt="info" /> Подробнее
      </div>

      <div class="vacancy__button red" @click="goToCreateMailing">
        <img src="/assets/img/search/link.png" alt="mailing" /> Создать рассылку
      </div>
    </div>

    <div class="vacancy__date">{{ created }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  item: { type: Object, required: true },
  company: { type: Object, default: () => null },
  vessels: { type: Array, default: () => [] }
});

const router = useRouter();

/* --- DATA FORMATTERS --- */

const salary = computed(() => {
  if (props.item.salary_from && props.item.salary_to)
    return `${props.item.salary_from} - ${props.item.salary_to} ₽`;
  if (props.item.salary_from) return `от ${props.item.salary_from} ₽`;
  if (props.item.salary_to) return `до ${props.item.salary_to} ₽`;
  return "не указана";
});

const departure = computed(() => {
  const i = props.item;
  return (
    i.date_of_departure_from ||
    i.departure_from ||
    i.date_from ||
    "не указана"
  ) +
    " - " +
    (i.date_of_departure_to || i.departure_to || i.date_to || "не указана");
});

const created = computed(() =>
  new Date(props.item.created_at).toLocaleDateString("ru-RU")
);

const vesselName = computed(() => {
  const vessel = props.vessels.find((v) => v.id === props.item.vessel);
  return vessel?.vessel_name || null;
});

/* --- ACTIONS --- */

function goToVacancyDetails() {
    console.log(props.item);
    console.log("props.item");

  router.push(`/vacancy/${props.item._id || props.item.id}`);
}

function goToCreateMailing() {
  const id = props.item._id || props.item.id;
  router.push({
    path: "/company/mailings/create-newsletter",
    query: { v: id, n: props.item.position }
  });
}
</script>

<style scoped>
.vacancy-mailing {
  padding: 24px;
  background: #fff;
      width:100%;
}
.vacancy__label-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.vacancy__logo img {
  max-height: 48px;
}
.vacancy__views {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #7c8db5;
}
.vacancy__meta {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  color: #7c8db5;
}
.vacancy__info {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.vacancy__buttons {
  margin-top: 18px;
  display: flex;
  gap: 12px;
}
.vacancy__button {
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.vacancy__button.blue {
  background: #eaecf7;
  color: #3b45a9;
}
.vacancy__button.red {
  background: #fff;
}
.vacancy__date {
  margin-top: 0px;
  color: #7c8db5;
  font-size: 14px;
}
</style>
