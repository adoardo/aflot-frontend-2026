<template>
    <ClientOnly>
      <NuxtLayout name="default-hero" class="main cabinet" style="background-color: #fff">
          <div>
              <AfHeaderColor/>
          </div>
          <section id="responses">
              <div class="container">
                  <div v-if="false" class="flex-title">
                      <h1>Принятые предложения:</h1>
                      <div>3 актуальных вакансий</div>
                  </div>

                  <div class="tabs">
                      <div class="tab-header">
                          <div
                                  :class="['tab-label', { active: activeTab === 1 }]"
                                  @click="setActiveTab(1)"
                                  data-id="1"
                          >
                              Принятые
                          </div>
                          <div
                                  :class="['tab-label', { active: activeTab === 2 }]"
                                  @click="setActiveTab(2)"
                                  data-id="2"
                          >
                              Архив неактуальных предложений
                          </div>
                      </div>

                      <div class="tab-body" v-show="activeTab === 1" data-id="1">
                          <div class="vacancy-list vacancy-acc">
                              <div class="vacancy">

                                  <div class="vacancy__label-top">
                                      <div class="vacancy__label">Cook (повар) <img src="assets/img/responses/fav.png"
                                                                                  alt=""></div>
                                      <div class="vacancy__logo">
                                          <img src="assets/img/flot/logo-cart.png" alt="logo">
                                      </div>
                                  </div>
                                  <div class="vacancy__meta">
                                      <div class="vacancy__company"><img src="assets/img/responses/company.png" alt="">OJ
                                          Crew
                                      </div>
                                      <div class="vacancy__ship"><img src="assets/img/responses/ship.png" alt="">Победа
                                      </div>
                                  </div>

                                  <div class="vacancy__info">
                                      <div class="vi-item">
                                          <div class="vi-label">Зарплата:</div>
                                          <strong>2000 - 2300 USD</strong>
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Дата посадки:</div>
                                          22.01 - 31.01.2024
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Длит-ть контракта:</div>
                                          6 месяцев
                                      </div>
                                  </div>
                                  <div class="vacancy__info__cont">
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/phone-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content">
                                              <a href="tel: +7 812 777 77 77">+7 812 777 77 77</a>
                                              <a href="tel: +7 812 555 55 55">+7 812 555 55 55</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/email-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content vacancy-cont__email">
                                              <a href="mailto: manager@ojcrew.ru">manager@ojcrew.ru</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                  </div>
                                  <!-- /.vacancy__info__cont -->
                                  <div class="vacancy__buttons">
                                      <div class="vacancy__button red"><img src="assets/img/responses/more.png" alt="">
                                          Подробнее о вакансии
                                      </div>
                                      <div class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">Пометить
                                          неактуальной
                                      </div>
                                  </div>

                                  <div class="vacancy__date new">13 декабря 2023</div>
                              </div>
                              <div class="vacancy">

                                  <div class="vacancy__label-top">
                                      <div class="vacancy__label">Cook (повар) <img src="assets/img/responses/fav.png"
                                                                                  alt=""></div>
                                      <div class="vacancy__logo">
                                          <img src="assets/img/flot/logo-cart.png" alt="logo">
                                      </div>
                                  </div>
                                  <div class="vacancy__meta">
                                      <div class="vacancy__company"><img src="assets/img/responses/company.png" alt="">OJ
                                          Crew
                                      </div>
                                      <div class="vacancy__ship"><img src="assets/img/responses/ship.png" alt="">Победа
                                      </div>
                                  </div>

                                  <div class="vacancy__info">
                                      <div class="vi-item">
                                          <div class="vi-label">Зарплата:</div>
                                          <strong>2000 - 2300 USD</strong>
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Дата посадки:</div>
                                          22.01 - 31.01.2024
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Длит-ть контракта:</div>
                                          6 месяцев
                                      </div>
                                  </div>
                                  <div class="vacancy__info__cont">
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/phone-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content">
                                              <a href="tel: +7 812 777 77 77">+7 812 777 77 77</a>
                                              <a href="tel: +7 812 555 55 55">+7 812 555 55 55</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/email-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content vacancy-cont__email">
                                              <a href="mailto: manager@ojcrew.ru">manager@ojcrew.ru</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                  </div>
                                  <!-- /.vacancy__info__cont -->
                                  <div class="vacancy__buttons">
                                      <div class="vacancy__button red"><img src="assets/img/responses/more.png" alt="">
                                          Подробнее о вакансии
                                      </div>
                                      <div class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">Пометить
                                          неактуальной
                                      </div>
                                  </div>

                                  <div class="vacancy__date">13 декабря 2023</div>
                              </div>
                              <div class="vacancy">

                                  <div class="vacancy__label-top">
                                      <div class="vacancy__label">Cook (повар) <img src="assets/img/responses/fav.png"
                                                                                  alt=""></div>
                                      <div class="vacancy__logo">
                                          <img src="assets/img/flot/logo-cart.png" alt="logo">
                                      </div>
                                  </div>
                                  <div class="vacancy__meta">
                                      <div class="vacancy__company"><img src="assets/img/responses/company.png" alt="">OJ
                                          Crew
                                      </div>
                                      <div class="vacancy__ship"><img src="assets/img/responses/ship.png" alt="">Победа
                                      </div>
                                  </div>

                                  <div class="vacancy__info">
                                      <div class="vi-item">
                                          <div class="vi-label">Зарплата:</div>
                                          <strong>2000 - 2300 USD</strong>
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Дата посадки:</div>
                                          22.01 - 31.01.2024
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Длит-ть контракта:</div>
                                          6 месяцев
                                      </div>
                                  </div>
                                  <div class="vacancy__info__cont">
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/phone-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content">
                                              <a href="tel: +7 812 777 77 77">+7 812 777 77 77</a>
                                              <a href="tel: +7 812 555 55 55">+7 812 555 55 55</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/email-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content vacancy-cont__email">
                                              <a href="mailto: manager@ojcrew.ru">manager@ojcrew.ru</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                  </div>
                                  <!-- /.vacancy__info__cont -->
                                  <div class="vacancy__buttons">
                                      <div class="vacancy__button red"><img src="assets/img/responses/more.png" alt="">
                                          Подробнее о вакансии
                                      </div>
                                      <div class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">Пометить
                                          неактуальной
                                      </div>
                                  </div>

                                  <div class="vacancy__date">13 декабря 2023</div>
                              </div>
                          </div>
                      </div>

                      <div class="tab-body" v-show="activeTab === 2" data-id="2">
                          <div class="vacancy-list vacancy-acc">
                              <div class="vacancy">

                                  <div class="vacancy__label-top">
                                      <div class="vacancy__label">Cook (повар) <img src="assets/img/responses/fav.png"
                                                                                  alt=""></div>
                                      <div class="vacancy__logo">
                                          <img src="assets/img/flot/logo-cart.png" alt="logo">
                                      </div>
                                  </div>
                                  <div class="vacancy__meta">
                                      <div class="vacancy__company"><img src="assets/img/responses/company.png" alt="">OJ
                                          Crew
                                      </div>
                                      <div class="vacancy__ship"><img src="assets/img/responses/ship.png" alt="">Победа
                                      </div>
                                  </div>

                                  <div class="vacancy__info">
                                      <div class="vi-item">
                                          <div class="vi-label">Зарплата:</div>
                                          <strong>2000 - 2300 USD</strong>
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Дата посадки:</div>
                                          22.01 - 31.01.2024
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Длит-ть контракта:</div>
                                          6 месяцев
                                      </div>
                                  </div>
                                  <div class="vacancy__info__cont">
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/phone-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content">
                                              <a href="tel: +7 812 777 77 77">+7 812 777 77 77</a>
                                              <a href="tel: +7 812 555 55 55">+7 812 555 55 55</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/email-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content vacancy-cont__email">
                                              <a href="mailto: manager@ojcrew.ru">manager@ojcrew.ru</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                  </div>
                                  <!-- /.vacancy__info__cont -->
                                  <div class="vacancy__buttons">
                                      <div class="vacancy__button red"><img src="assets/img/responses/more.png" alt="">
                                          Подробнее о вакансии
                                      </div>
                                      <div class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">Пометить
                                          неактуальной
                                      </div>
                                  </div>

                                  <div class="vacancy__date new">13 декабря 2023</div>
                              </div>

                              <div class="vacancy">

                                  <div class="vacancy__label-top">
                                      <div class="vacancy__label">Cook (повар) <img src="assets/img/responses/fav.png"
                                                                                  alt=""></div>
                                      <div class="vacancy__logo">
                                          <img src="assets/img/flot/logo-cart.png" alt="logo">
                                      </div>
                                  </div>
                                  <div class="vacancy__meta">
                                      <div class="vacancy__company"><img src="assets/img/responses/company.png" alt="">OJ
                                          Crew
                                      </div>
                                      <div class="vacancy__ship"><img src="assets/img/responses/ship.png" alt="">Победа
                                      </div>
                                  </div>

                                  <div class="vacancy__info">
                                      <div class="vi-item">
                                          <div class="vi-label">Зарплата:</div>
                                          <strong>2000 - 2300 USD</strong>
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Дата посадки:</div>
                                          22.01 - 31.01.2024
                                      </div>
                                      <div class="vi-item">
                                          <div class="vi-label">Длит-ть контракта:</div>
                                          6 месяцев
                                      </div>
                                  </div>
                                  <div class="vacancy__info__cont">
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/phone-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content">
                                              <a href="tel: +7 812 777 77 77">+7 812 777 77 77</a>
                                              <a href="tel: +7 812 555 55 55">+7 812 555 55 55</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                      <div class="vacancy-cont__item">
                                          <img src="assets/img/dop-page/email-gray.svg" alt="image"
                                              class="vacancy-cont__img">
                                          <div class="vacancy-cont__content vacancy-cont__email">
                                              <a href="mailto: manager@ojcrew.ru">manager@ojcrew.ru</a>
                                          </div>
                                          <!-- /.vacancy-cont__content -->
                                      </div>
                                      <!-- /.vacancy-cont__item -->
                                  </div>
                                  <!-- /.vacancy__info__cont -->
                                  <div class="vacancy__buttons">
                                      <div class="vacancy__button red"><img src="assets/img/responses/more.png" alt="">
                                          Подробнее о вакансии
                                      </div>
                                      <div class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">Пометить
                                          неактуальной
                                      </div>
                                  </div>

                                  <div class="vacancy__date">13 декабря 2023</div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'"/>
      </NuxtLayout>
    </ClientOnly>
</template>

<script setup>
    definePageMeta({
      middleware: ["sailor"],
    })
    import {ref} from "vue";

    const activeTab = ref(1);

    const setActiveTab = (tab) => {
        activeTab.value = tab;
    };

    onMounted(() => {
      document.body.classList.add('bg-white');
    });
</script>

<style lang="scss" scoped></style>
