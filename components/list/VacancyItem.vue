<template>
  <div class="vacancy vacancy-detail">
    <div class="vacancy__label">Cook (повар)</div>

    <div class="vacancy__info">
      <div class="vi-item">
        <div class="vi-label">Название коробля:</div>
        «Победа»
      </div>
      <div class="vi-item">
        <div class="vi-label">Дата посадки:</div>
        22.01 - 31.01.2024
      </div>
      <div class="vi-item">
        <div class="vi-label">Зарплата:</div>
        2000 - 2300 USD
      </div>
      <div class="vi-item">
        <div class="vi-label">Телефон №1:</div>
        +7 812 777 77 77
      </div>

      <div class="vi-item">
        <div class="vi-label">Тип судна:</div>
        Контейнеровоз
      </div>
      <div class="vi-item">
        <div class="vi-label">Длит-ть контракта:</div>
        6 месяцев
      </div>
      <div class="vi-item">
        <div class="vi-label">Email для связи:</div>
        ivanov@manager.ru
      </div>
      <div class="vi-item">
        <div class="vi-label">Телефон №2:</div>
        +7 812 777 77 77
      </div>
    </div>

    <div class="vacancy__links">
      <div>
        <span>Готовы к работе</span>
        <span>Отклики <span class="count">5</span></span>
        <span>Отправленные предложения</span>
      </div>
      <div>
        <span>Поднять в топ 10</span>
        <span>Создать рассылку</span>
      </div>
      <div>
        <span class="blue">Редактировать вакансию</span>
        <span class="blue">Переопубликовать вакансию</span>
        <span class="blue">Закрыть вакансию</span>
      </div>
    </div>

    <div class="vacancy__date">13 декабря 2023 - 23 декабря 2023</div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {},
});
</script>

<style lang="scss" scoped></style>
