<template>
  <NuxtLayout name="custom" v-if="false">
    <section class="section-about">
      <div class="container">
        <div class="about">
          <div class="tarif-top">
            <h1 class="about-title">
              Тарифы:
            </h1>
            <!-- /.about-title -->

            <ul class="tarif-list" id="tabNav">
              <li v-if="!isAuth || (isAuth && (userInfo.info.role == 'Моряк'))"><a @click="sm=true;sc=false" id="#tab1"
                                                                        :class="{ tactive: sm }">Моряк</a></li>
              <li v-if="!isAuth || (isAuth && (userInfo.info.role == 'Компания'))"><a @click="sm=false;sc=true" id="#tab2"
                                                                           :class="{ tactive: sc }">Компании</a></li>

            </ul>

          </div>
          <!-- /.tarif-top -->

          <div id="tabsWrap" class="tarif-block">
            <div class="tarif-tab" v-if="sm && ((isAuth && (userInfo.info.role == 'Моряк')) || (!isAuth))"
                 id="tab1">
              <div class="tarif-all"
                   v-for="(item, index) in getAfSailorTariffs"
                   :key="index">
                <div class="tarif-cart">
                  <div class="rat-item-zaglushka"></div>
                  <div class="tarif-cart__info">
                    <div class="tarif-cart__images">
                      <img src="assets/img/tarif/image.svg" alt="image">
                    </div>
                    <div class="tarif-cart__block">
                      <div class="tarif-cart__item">
                        <div class="tarif-cart__title">Статус:</div>
                        <div class="tarif-cart__text">{{ item.title }}</div>
                      </div>
                      <div class="tarif-cart__item">
                        <div class="tarif-cart__title">Период</div>
                        <div class="tarif-cart__text">
                          {{ item.period }}
                          <span>месяц</span>
                        </div>
                      </div>
                      <div class="tarif-cart__item">
                        <div class="tarif-cart__title">Стоимость</div>
                        <div class="tarif-cart__text">
                          {{ item.cost.toLocaleString() }}
                          <span>₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button class="tarif-cart__button" @click="buyTarif('sailor')">
                    <img src="assets/img/tarif/cart.svg" alt="image">
                    Приобрести
                  </button>
                </div>
                <div class="tarif-info">
                  <div class="tarif-info__title">
                    Статус «{{ item.title }}» открывает следующие возможности:
                  </div>
                  <div class="tarif-ol">
                    <div class="tarif-li"
                         v-for="(desc, index_desc) in item.description_list"
                         :key="index_desc"
                    >
                      <span class="tarif-li__number">{{ (index_desc + 1) }}</span>
                      <div class="tarif-li__text" v-html="desc"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tarif-dop" v-if="isAuth">
                <div class="tarif-icon">
                  !
                </div>
                <!-- /.tarif-icon -->
                <div class="tarif-dop__text">
                  Для получения статуса необходимо полностью заполнить резюме, если Вы еще этого не сделали -
                  воспользуйтесь <a href="/sailor/resume">этой ссылкой</a>
                </div>
                <!-- /.tarif-dop-text -->
              </div>

            </div>
            <div class="tarif-tab" :class="{ stactive: (isAuth && (userInfo.info.role == 'Компания')) }"
                 v-if="sc && ((isAuth && (userInfo.info.role == 'Компания')) || (!isAuth))" id="tab2">
              <div class="rat-block" style="margin: 0; width: 100%;">
                <div v-for="(item, index) in getAfCompanyTariffs" :key="index">
                  <div :class="{active: item.title.toUpperCase() == 'МАКСИМУМ'}" class="rat-item" v-if="!item.additional">
                    <div v-if="item.title.toUpperCase() != 'МАКСИМУМ'" class="rat-item-zaglushka"></div>
                    <div class="rat-item-content">
                      <img :src="'/_nuxt/assets/img/dop-page/rat-' + (index + 1) + '.svg'" alt="image"
                           class="rat-item-img">
                      <div class="rat-item-top">
                        <div class="rat-item-pretitle">тариф</div>
                        <!-- /.rat-item-pretitle -->
                        <div class="rat-item-title">«{{ item.title.toUpperCase() }}»</div>
                        <!-- /.rat-item-title -->
                      </div>
                      <!-- /.rat-item-top -->

                      <div class="rat-item-info">
                        <div class="rat-item-text">Количество<br>
                          публикаций вакансий:
                        </div>
                        <!-- /.rat-item-text -->
                        <div class="rat-item-num">{{ item.count_publications }}</div>
                        <!-- /.rat-item-num -->
                      </div>
                      <!-- /.rat-item-info -->

                      <div class="rat-item-line"></div>
                      <!-- /.rat-item-line -->

                      <div class="rat-item-info">
                        <div class="rat-item-text">
                          Количество возможностей<br>
                          «Предложить вакансию»:
                        </div>
                        <!-- /.rat-item-text -->
                        <div class="rat-item-num">{{ item.count_possibilities }}</div>
                        <!-- /.rat-item-num -->
                      </div>
                      <!-- /.rat-item-info -->

                      <div class="rat-item-end">
                        <div class="rat-item-price">{{ item.price.toLocaleString() }}</div>
                        <!-- /.rat-item-price -->
                        <div class="rat-item-dop">₽</div>
                        <!-- /.rat-item-dop -->
                      </div>
                      <!-- /.rat-item-end -->
                    </div>
                    <!-- /.rat-item-content -->

                    <button class="rat-item-button" @click="buyTarif('company')">
                      <img src="assets/img/dop-page/cart.svg" alt="image">
                      <span>Приобрести</span>
                    </button>
                    <!-- /.rat-item-button -->
                  </div>
                </div>

              </div>
              <div class="rat-text">
                Вы также можете приобрести отдельное количество вакансий<br> и отдельное количество возможностей
                «Предложить вакансию»:
              </div>

              <div class="rat-end">
                <div v-for="(item, indexAdd) in getAfCompanyTariffs" :key="indexAdd">

                  <div class="rat-part" v-if="item.additional">
                    <div class="rat-item-zaglushka"></div>
                    <img :src="'/_nuxt/assets/img/dop-page/rat-' + indexAdd + '.svg'" alt="image" class="rat-part-img">
                    <div class="rat-part-content">
                      <div class="rat-part-title">Укажите количество</div>
                      <div class="rat-part-red">{{ item.title }}</div>
                    </div>
                    <div class="rat-part-num">
                      <button @click="totalMinus(indexAdd);updateTotals(indexAdd, item.price)" class="rat-part-arrow">
                        -
                      </button>
                      <input v-model="priceAdd[indexAdd]" @change="updateTotals(indexAdd, item.price)"
                             @input="updateTotals(indexAdd, item.price)" type="number" class="rat-part-number">
                      <button @click="totalPlus(indexAdd);updateTotals(indexAdd, item.price)" class="rat-part-arrrow">
                        +
                      </button>
                    </div>


                    <div class="rat-part-price">
                      <text>{{ totalAdd[indexAdd] }}</text>
                      <span>₽</span>
                    </div>

                    <div class="rat-part-button" @click="buyTarif('company')">
                      <img src="assets/img/dop-page/cart.svg" alt="image" class="rat-part-bimg">
                      <div class="rat-part-bbutton">Приобрести</div>
                    </div>
                    <!-- /.rat-part-button -->
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- /.about -->
      </div>
      <!-- /.container -->
    </section>
  </NuxtLayout>
</template>

<script setup>
import {ref} from "vue";

import {useUsersStore} from "~/store/useUserStore.js";

const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)

import {useGlobalSettings} from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const {getAfSailorTariffs, getAfCompanyTariffs} = storeToRefs(globalSettings)

import {useModalStore} from "~/store/modal";
import api from "~/api/api.js";

const {toggleModal, openTarifModal, closeModal, openModal} = useModalStore();

const sm = ref(true);
const sc = ref(false);

const priceAdd = ref([])
const totalAdd = ref([])

onMounted(async () => {
  getAfCompanyTariffs.value.forEach((t) => {
    priceAdd.value.push(1);
    totalAdd.value.push(t.price.toLocaleString());
  });
});

const totalMinus = async (ind) => {
  if (priceAdd.value[ind] > 1) {
    priceAdd.value[ind]--;
  }
}
const totalPlus = async (ind) => {
  priceAdd.value[ind]++;
}
const updateTotals = async (ind, price) => {
  totalAdd.value[ind] = (price * priceAdd.value[ind]).toLocaleString()
}

if (isAuth.value && (userInfo.value.info.role == 'Моряк')) {
  sm.value = true;
  sc.value = false;
}
if (isAuth.value && (userInfo.value.info.role == 'Компания')) {
  sm.value = false;
  sc.value = true;
}
const buyTarif = async (role) => {
  if (!isAuth.value) {
    toggleModal('lk');
    await userStore.resetSocialsAuth();
  } else {
    if (role === 'sailor') {
      window.location.href = "/sailor/balance";
    } else if (role === 'company') {
      //window.location.href = "/company/balance";
      openModal("loader")
      await api.put("/tariffs/company/order").then((data) => {
        console.log('RESULT: ', data);
        let msg = 'Вы приобрели тариф <strong>«МАКСИМУМ»</strong><br><br><br>';
        msg += 'Количество публикаций вакансий: <strong>100</strong><br><br>'
        msg += 'Количество возможностей «Предложить вакансию»: <strong>8000</strong>'
        setTimeout(() => {
          closeModal("loader")
          openTarifModal('tarifmessage', msg)
          if (userStore.user.info.role === 'Компания') {
            userStore.getCompanyData()
          }
        }, 1000)

      });


    } else {
      alert('В разработке')
    }
  }
}


</script>

<style lang="scss" scoped>
.tarif-list a.tactive {
  color: #9b2719;
  border-bottom: 2px solid #9b2719;
}

.rat-item-img {
  height: 120px;
}

.tarif-tab.stactive {
  display: flex;
}

.rat-part-price {
  justify-content: flex-end;
  padding-right: 20px;

  span {
    padding-top: 3px;
    font-size: 25px;
  }
}

.rat-end {
  grid-gap: 0px;
  margin-top: 20px;
  .rat-part {
    margin-top: 20px;
  }
}

.tarif-tab {
  display: flex;
}

.rat-item, .tarif-cart {
  position: relative;
}
.rat-item.active {
  box-shadow: 0px 0px 10px 0px rgba(0, 166, 43, 0.4);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 166, 43, 0.4);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 166, 43, 0.4);
  box-shadow: 0px 0px 10px 0px rgba(0, 166, 43, 0.4);
  transform: scale(1.04);
}
.rat-item-zaglushka {
  width: 100%;
  position: absolute;
  height: 100%;
  background: #00000005;
  backdrop-filter: grayscale(100%);
}
.rat-item-button, .rat-part-button  {
  background-color: #6e6e6e;
}
.active.rat-item .rat-item-button {
  background-color: #3b45a9;
  transition: .5s;
}
.rat-end .rat-part {
  position: relative;
}
.tarif-cart__button {
  padding: 22px 0px;
  background-color: #6e6e6e;
}
.rat-item:not(.active), .tarif-cart {
  opacity: .7;
}
.active.rat-item .rat-item-button:hover {
  background-color: #9b2719;
}
</style>
