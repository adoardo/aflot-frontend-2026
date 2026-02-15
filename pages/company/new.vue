<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" class="main cabinet">
      <div>
        <AfHeaderColor/>
      </div>
      <main class="main cabinet vak-edit">


        <div class="container">
          <div class="vak-edit-block sudno-edit-block" id="vessel-edit-wrap">
            <div class="vak-edit-left">
              <h2>Основные данные:</h2>
              <div class="resume-grid col2">
                <div class="tag-input">
                  <AfDropDox
                      title="Должность"
                      :single="true"
                      v-model="vacancyData.position"
                      :error="v$.position.$error && v$.position.required.$invalid"
                      :options-list="professionalList"/>
                </div>

                <div class="input inp-mt10">
                  <label for="">Зарплата, ₽</label>
                  <div class="input-block-zp inppt5">
                    <AfInput
                        place="От"
                        type="number"
                        v-model="vacancyData.salary_from"
                    />
                    <AfInput
                        place="До"
                        type="number"
                        v-model="vacancyData.salary_to"
                    />
                  </div>
                </div>


                <div class="input inp-mt10">
                  <label style="margin-bottom: 12px;">Период посадки</label>
                  <UPopover :popper="{ placement: 'bottom-start' }">
                    <UButton icon="i-heroicons-calendar-days-20-solid">
                      {{ format(selected.start, 'd MMM, yyy', {locale: ru}) }} - {{ format(selected.end, 'd MMM, yyy', {locale: ru}) }}
                    </UButton>

                    <template #panel="{ close }">
                        <div class="header-close menu-close-gray close-reg-about" @click.stop="close()">
                            <span class="header-close__icon"></span>
                        </div>
                      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                        <div class="hidden sm:flex flex-col py-4">
                          <UButton
                              v-for="(range, index) in ranges"
                              :key="index"
                              :label="range.label"
                              color="gray"
                              variant="ghost"
                              class="rounded-none px-6"
                              :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                              truncate
                              @click="selectRange(range.duration)"
                          />
                        </div>

                        <DatePicker v-model="selected" @close="close" />
                      </div>
                    </template>
                  </UPopover>


                </div>
                <div class="input input-date-contract inp-mt10">
                  <AfSelect
                      label="Период посадки:"
                      v-model="vacancyData.contract_duration"
                      :options-list="getAfContractDuration"
                      :error="v$.contract_duration.$error && v$.contract_duration.required.$invalid"
                      :close="close"
                  />
                </div>
              </div>
            </div>
            <!-- /.vak-edit-left -->


          </div>
          <!-- /.vak-edit-block -->

          <div class="vak-sudno-list sudno-list" id="vessels-add-wrap">
            <h2 class="sudno-list-subtitle">Судно:</h2>
            <p>
              Выберите судно из вашего списка «Мои суда», либо из списка «Морского флота»
            </p>
            <p>
              Если ваше судно отсутствует в "Мои суда" или "Морской флот", то добавьте судно в ручную ниже
            </p>
          </div>
          <!-- /.vak-sudno-list -->


          <div class="sudno-group">
            <div class="sudno-group-item">
              <div @click="enNewVessel(false);setActiveTab('tab1');forceResetShip();" class="sudno-top"
                  :class="{ sactive: activeTab === 'tab1' }">
                <div class="sudno-top__text">Выбрать судно из списка «Мои суда»</div>
                <!-- /.sudno-top__text -->
                <img src="assets/img/sudno/white-cursor.svg" alt="image" class="sudno-top__img">
              </div>
              <!-- /.sudno-top -->
              <div v-show="activeTab === 'tab1'" class="sudno-content"
                  :class="{ active: activeTab === 'tab1' }">
                <div class="sudno-info">
                  <div class="sudno-info__top">
                    <h3 class="sudno-info__title">
                      Выбрать судно из списка «Мои суда»
                    </h3>
                    <!-- /.sudno-info__title -->
                    <div v-show="sendEnable" class="sudno-info__check">
                      <img src="assets/img/sudno/green.svg" alt="image" class="sudno-info__icon">
                      <div class="sudno-info__text">
                        Судно выбрано
                      </div>
                      <!-- /.sudno-info__text -->
                    </div>
                    <div v-show="!sendEnable" class="sudno-info__check sudno-info__checkred">
                      <img src="assets/img/sudno/red.svg" alt="image" class="sudno-info__icon">
                      <div class="sudno-info__text">
                        Судно не выбрано
                      </div>
                      <!-- /.sudno-info__text -->
                    </div>
                    <!-- /.sudno-info__check -->
                  </div>
                  <!-- /.sudno-info__top -->


                  <div class="cabinet tag-input modal-tag-input">
                    <AfDropDox
                        v-model="registeredShip"
                        :options-list="registeredNames"
                        title="Судно:"
                        :single="true"
                    />
                  </div>
                  <!-- /.tag-input -->
                  <div class="vabout-info vabout-info-vak">
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Название судна:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.vessel_name"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Тип судна:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.ship_type"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.dwt"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Длина</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.length"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">IMO:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.imo"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">Год постройки:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.year_built"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">kW - двигательная установка:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.kw"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">Ширина:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAdd.width"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                  </div>
                  <!-- /.vabout-info -->

                </div>
                <!-- /.sudno-info -->
              </div>
              <!-- /.sudno-content -->
            </div>
            <!-- /.sudno-group-item -->
            <div class="sudno-group-item">
              <div @click="enNewVessel(false);setActiveTab('tab2');forceResetShipMF();" class="sudno-top"
                  :class="{ sactive: activeTab === 'tab2' }">
                <div class="sudno-top__text">Выбрать судно из списка «Морского флота»</div>
                <!-- /.sudno-top__text -->
                <img src="assets/img/sudno/white-cursor.svg" alt="image" class="sudno-top__img">
              </div>
              <!-- /.sudno-top -->
              <div v-show="activeTab === 'tab2'" class="sudno-content"
                  :class="{ active: activeTab === 'tab2' }">
                <div class="sudno-info">
                  <div class="sudno-info__top">
                    <h3 class="sudno-info__title">
                      Выбрать судно из списка «Морского флота»
                    </h3>
                    <!-- /.sudno-info__title -->
                    <div v-show="sendEnableMF" class="sudno-info__check">
                      <img src="assets/img/sudno/green.svg" alt="image" class="sudno-info__icon">
                      <div class="sudno-info__text">
                        Судно выбрано
                      </div>
                      <!-- /.sudno-info__text -->
                    </div>
                    <div v-show="!sendEnableMF" class="sudno-info__check sudno-info__checkred">
                      <img src="assets/img/sudno/red.svg" alt="image" class="sudno-info__icon">
                      <div class="sudno-info__text">
                        Судно не выбрано
                      </div>
                      <!-- /.sudno-info__text -->
                    </div>
                    <!-- /.sudno-info__check -->
                  </div>
                  <!-- /.sudno-info__top -->


                  <div class="cabinet tag-input modal-tag-input">
                    <AfDropDox
                        v-model="unregisteredShipMF"
                        :options-list="unregisteredNamesMF"
                        title="Судно:"
                        :single="true"
                    />
                  </div>
                  <!-- /.tag-input -->
                  <div class="vabout-info vabout-info-vak">
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Название судна:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.vessel_name"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Тип судна:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.ship_type"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.dwt"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">Длина</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.length"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                    <div class="vabout-item">
                      <div class="vabout-subtitle">IMO:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.imo"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">Год постройки:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.year_built"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">kW - двигательная установка:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.kw"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->

                    <div class="vabout-item">
                      <div class="vabout-subtitle">Ширина:</div>
                      <!-- /.vabout-subtitle -->
                      <div class="vabout-subtext" v-html="shipToAddMF.width"></div>
                      <!-- /.vabout-subtext -->
                    </div>
                    <!-- /.vabout-item -->
                  </div>
                  <!-- /.vabout-info -->


                  <div class="resume-contact__second">
                    <AfCheckbox
                        @click="shipToAddNew.append_company = !shipToAddNew.append_company"
                        v-model="vacancyData.addNewShip"
                        :descText="'По окончании публикации, добавить это судно в список '"
                        :linkText="'«Мои суда»'"
                    />
                  </div>

                </div>
                <!-- /.sudno-info -->

              </div>
              <!-- /.sudno-content -->
            </div>
            <!-- /.sudno-group-item -->
            <div class="sudno-group-item">
              <div @click="enNewVessel(true);setActiveTab('tab3')" class="sudno-top"
                  :class="{ sactive: activeTab === 'tab3' }">
                <div class="sudno-top__text">Добавить судно в ручную</div>
                <!-- /.sudno-top__text -->
                <img src="assets/img/sudno/white-cursor.svg" alt="image" class="sudno-top__img">
              </div>
              <!-- /.sudno-top -->
              <div v-show="activeTab === 'tab3'" class="sudno-content"
                  :class="{ active: activeTab === 'tab3' }">
                <div class="sudno-info">
                  <div class="sudno-info__top">
                    <h3 class="sudno-info__title">
                      Добавить судно в ручную
                    </h3>
                    <!-- /.sudno-info__title -->
                    <div v-if="formData?.vessel_name && formData?.imo" class="sudno-info__check">
                      <img src="assets/img/sudno/green.svg" alt="image" class="sudno-info__icon">
                      <div class="sudno-info__text">
                        Данные заполнены
                      </div>
                      <!-- /.sudno-info__text -->
                    </div>
                    <!-- /.sudno-info__check -->
                  </div>
                  <!-- /.sudno-info__top -->
                  <div class="suda-item__text">
                    Заполните данные по судну, которого нет в нашей базе. После публикации, объявление
                    будет скрыто в ожидании проверки данных нашими
                    сотрудниками. В соответствиями с правилами сайта такая проверка будет занимать не
                    более 24 часов.
                    <br>
                    <a class="suda-item__link">Уточнить характеристики судна вы можете по этой
                      ссылке.</a>
                  </div>


                  <div class="vabout-info vabout-info-vak modal-vabout modal-vabout__two modal-vabout__line">
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: EVER GIVEN"
                          label="Название судна: <text>*</text>"
                          type="text"
                          v-model="shipToAddNew.vessel_name"
                          :error="vShip$.vessel_name.$error && vShip$.vessel_name.required.$invalid"
                      />
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: 9811000"
                          label="IMO судна: <text>*</text>"
                          type="text"
                          v-model="shipToAddNew.imo"
                          :error="vShip$.imo.$error && vShip$.imo.required.$invalid"
                      />
                    </div>
                  </div>
                  <div class="vabout-info vabout-info-vak modal-vabout modal-vabout__line">
                    <div class="vabout-item">

                      <AfDropDox
                          title="Тип судна:"
                          :single="true"
                          v-model="shipToAddNew.ship_type"
                          :options-list="shipList"/>
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: 2018"
                          label="Год постройки:"
                          v-model="shipToAddNew.year_built"
                      />
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: 199 489"
                          label="DWT (t) - валовая вместимость:"
                          v-model="shipToAddNew.dwt"
                      />
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="-"
                          label="kW - двигательная установка:"
                          v-model="shipToAddNew.kw"
                      />
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: 399 m / 1309 ft"
                          label="Длина:"
                          v-model="shipToAddNew.length"
                      />
                    </div>
                    <div class="vabout-item">
                      <AfInput
                          place="Пример: 59 m / 194 ft"
                          label="Ширина:"
                          v-model="shipToAddNew.width"
                      />
                    </div>
                  </div>

                  <div class="resume-contact__second">
                    <AfCheckbox
                        @click="shipToAddNew.append_company = !shipToAddNew.append_company"
                        v-model="vacancyData.addNewShip"
                        :descText="'По окончании публикации, добавить это судно в список '"
                        :linkText="'«Мои суда»'"
                    />
                  </div>

                </div>
                <!-- /.sudno-info -->

                <div v-if="newVesselValidationError" class="sudno-end">
                  <img src="assets/img/sudno/icon-end.png" alt="image" class="sudno-end__icon">
                  <div class="sudno-end__text">
                    Данное IMO/судно уже зарегистрировано в нашей базе «Морского флота».<br>
                    Воспользуйтесь функционалом Выбрать судно из списка «Морского флота»
                  </div>
                  <!-- /.sudno-end__text -->
                </div>
                <!-- /.sudno-end -->
              </div>
              <!-- /.sudno-content -->
            </div>
            <!-- /.sudno-group-item -->
          </div>
          <!-- /.sudno-group -->


          <h2 class="with-subtitle">Контактная информация вакансий:</h2>
          <div class="resume-grid col2 vak-edit-contact">
            <div class="input">
              <label for="">ФИО контактного лица</label>
              <input type="text" v-model="companyProfile.f_i_o">
            </div>
            <div class="input">
              <label for="">E-mail</label>
              <input type="text" v-model="companyProfile.email">
            </div>
            <div class="input">
              <label for="">Телефон №1</label>
              <input type="text" v-model="companyProfile.phone1">
            </div>
            <div class="input">
              <label for="">Телефон №2</label>
              <input type="text" v-model="companyProfile.phone2">
            </div>
          </div>
        </div>

      </main>


      <div class="resume-buttons sudno-buttons">
        <button class="primary" @click="send(true)">Сохранить</button>
        <!-- <button class="secondary" @click="create30Vacancies">
          Создать 30 вакансий (тест)
        </button> -->

        <button class="secondary" @click="send(false)">Сохранить в черновиках</button>
        <button class="secondary" @click="resetVacancy()">Сбросить</button>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["company"],
})
import {ref} from "vue";
import api from "@/api/api";

import DatePicker from "@/components/DatePicker";
import { sub, format, isSameDay, type Duration } from 'date-fns'
import ru from 'date-fns/locale/ru';
import {useModalStore} from "~/store/modal";
const {openModal, closeModal} = useModalStore();

import { useRouter } from 'vue-router';

const router = useRouter();

import AfInput from "@/components/uikit/AfInput";
import AfDropDox from "@/components/uikit/AfDropDox";
import AfSelect from "@/components/uikit/AfSelect";
import AfCheckbox from "@/components/uikit/AfCheckbox2";

import {useGlobalSettings} from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const {getAfJobs, getAfShips, getAfContractDuration} = storeToRefs(globalSettings)

import {useUsersStore} from "~/store/useUserStore";
const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)

import useVuelidate from "@vuelidate/core";
import {required, email, minLength} from "@vuelidate/validators";

const professionalList = ref(getAfJobs);
const shipList = ref(getAfShips);

const activeTab = ref("tab1");

function setActiveTab(tab) {
  activeTab.value = tab;
}

onMounted(() => {
  document.body.classList.add('bg-white');
});

const companyProfile = ref({
  company_name: "",
  company_address: "",
  f_i_o: "",
  email: "",
  phone1: "",
  phone2: "",
  notification_settings: {
    send_email: true,
    send_sms: true,
    send_telegram: true,
    mailing_notification: true,
  }
});

const newVesselValidationError = ref(false);
const vesselId = ref(0);

const vacancyData = ref({
  position: '',
  salary_from: '',
  salary_to: '',
  date_of_departure: '',
  date_of_departure_from: '',
  date_of_departure_to: '',
  contract_duration: getAfContractDuration.value[0],
  vessel: vesselId.value,
  contact_person: companyProfile.value.f_i_o,
  email: companyProfile.value.email,
  phone1: companyProfile.value.phone1,
  phone2: companyProfile.value.phone2,
  responses: [],
  job_offers: [],
  approved_responses: [],
  approved_offers: [],
  is_publish: true,
  is_active: true,
  addNewShip: true,
  created_at: Date.now(),
  view_count: 0
});

const ranges = [
  { label: '7 дней', duration: { days: 7 } },
  { label: '14 дней', duration: { days: 14 } },
  { label: '30 дней', duration: { days: 30 } },
  { label: '3 месяца', duration: { months: 3 } },
  { label: '6 месяцев', duration: { months: 6 } },
  { label: 'Год', duration: { years: 1 } }
]
const selected = ref({ start: sub(new Date(), { years: 1 }), end: new Date() })

const setVacancyDates = async () => {
  let dFrom = selected.value.start.getUTCFullYear() + '-' + ('0' + (selected.value.start.getUTCMonth()+1)).slice(-2) + '-' + ("0" + selected.value.start.getUTCDate()).slice(-2);
  let dTo = selected.value.end.getUTCFullYear() + '-' + ('0' + (selected.value.end.getUTCMonth()+1)).slice(-2) + '-' + ("0" + selected.value.end.getUTCDate()).slice(-2);

  vacancyData.value.date_of_departure = dFrom;
  vacancyData.value.date_of_departure_from = dFrom;
  vacancyData.value.date_of_departure_to = dTo;
}

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}

const formData = ref({})

const shipToAdd = ref({
  dwt: "-",
  imo: "-",
  kw: "-",
  length: "-",
  ship_type: "-",
  vessel_name: "-",
  width: "-",
  year_built: "-",
  _id: ""
});
const shipToAddMF = ref({
  dwt: "-",
  imo: "-",
  kw: "-",
  length: "-",
  ship_type: "-",
  vessel_name: "-",
  width: "-",
  year_built: "-",
  _id: ""
});
const shipToAddNew = ref({
  vessel_name: '',
  imo: '',
  ship_type: '',
  year_built: '',
  dwt: '',
  kw: '',
  length: '',
  width: '',
  company_email: userInfo.value.info.email,
  append_company: true
});
const sendEnable = ref(false);
const sendEnableMF = ref(false);
const sendEnableNew = ref(false);
const registered = ref();
const unregisteredMF = ref();
const registeredShip = ref([]);
const registeredNames = ref();
const unregisteredShipMF = ref([]);
const unregisteredNamesMF = ref();
const newShipChecker = ref(false);
const init = async () => {
  try {
    await api.get("/company/profile").then((data) => {
      companyProfile.value = data.data;
    });
  } catch (e) {

  }

  try {
    await api.get("/navy/unregistered?email=" + userInfo.value.info.email).then((data) => {
      unregisteredMF.value = data.data

      let tmp = [];
      for (let i = 0; i < data.data.length; i++) {
        tmp.push(data.data[i].vessel_name);
      }
      unregisteredNamesMF.value = tmp;
    });
  } catch (e) {
    unregisteredMF.value = []
  }

  try {
    await api.get("/navy/registered?email=" + userInfo.value.info.email).then((data) => {
      registered.value = data.data

      let tmp = [];
      for (let i = 0; i < data.data.length; i++) {
        tmp.push(data.data[i].vessel_name);
      }
      registeredNames.value = tmp;
    });
  } catch (e) {
    registered.value = []
  }
}
if (isAuth.value) {
  init();
}
const enNewVessel = async (nsc) => {
  newShipChecker.value = nsc
}

const forceResetShip = async () => {
  registeredShip.value = [];
}
const forceResetShipMF = async () => {
  unregisteredShipMF.value = [];
}

watch(unregisteredShipMF, () => {
  sendEnable.value = false;
  sendEnableMF.value = false;
  shipToAddMF.value = {
    dwt: "-",
    imo: "-",
    kw: "-",
    length: "-",
    ship_type: "-",
    vessel_name: "-",
    width: "-",
    year_built: "-",
    _id: "",
    company_email: userInfo.value.info.email,
    append_company: true
  };
  for (let i = 0; i < unregisteredMF.value.length; i++) {
    if (unregisteredMF.value[i].vessel_name == unregisteredShipMF.value) {
      shipToAddMF.value = unregisteredMF.value[i];
      sendEnableMF.value = true;
    }
  }
});
watch(registeredShip, () => {
  sendEnable.value = false;
  sendEnableMF.value = false;
  shipToAdd.value = {
    dwt: "-",
    imo: "-",
    kw: "-",
    length: "-",
    ship_type: "-",
    vessel_name: "-",
    width: "-",
    year_built: "-",
    _id: "",
    company_email: userInfo.value.info.email,
    append_company: true
  };
  for (let i = 0; i < registered.value.length; i++) {
    if (registered.value[i].vessel_name == registeredShip.value) {
      shipToAdd.value = registered.value[i];
      sendEnable.value = true;
    }
  }
});

const rules = {
  position: {required},
  //date_of_departure_from: {required},
  contract_duration: {required},
};
const rulesShip = {
  vessel_name: {required},
  imo: {required},
};
const v$ = useVuelidate(rules, vacancyData);
const vShip$ = useVuelidate(rulesShip, shipToAddNew);

const prepareDataForSending = (form) => {
  const preparedData = {
    ...form.value,
  };

  return preparedData;
};

const validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const sendFinally = async (publishState) => {
  await setVacancyDates();

  if (vesselId.value) {
    vacancyData.value.vessel = vesselId.value
    let dataToSubmit = prepareDataForSending(vacancyData)

    dataToSubmit.position = vacancyData.value.position[0];
    dataToSubmit.responses = [];
    dataToSubmit.job_offers = [];
    dataToSubmit.append_company = vacancyData.value.addNewShip;

    if (!vacancyData.value.salary_from) dataToSubmit.salary_from = 0;
    if (!vacancyData.value.salary_to) dataToSubmit.salary_to = 0;

    dataToSubmit.f_i_o = companyProfile.value.f_i_o;
    dataToSubmit.email = companyProfile.value.email;
    dataToSubmit.phone1 = companyProfile.value.phone1;
    dataToSubmit.phone2 = companyProfile.value.phone2;

    // ✅ Apply your new logic
    if (publishState) {
      // Simple Save
      dataToSubmit.is_active = true;
      dataToSubmit.is_publish = true;
    } else {
      // Save as Draft
      dataToSubmit.is_active = true;
      dataToSubmit.is_publish = false;
    }

    if (!validateEmail(dataToSubmit.email)) {
      dataToSubmit.email = 'hide@hide.com';
    }

    try {
      await api.post("/all-vacancies/create", dataToSubmit).then((data) => {
        console.log('vacancy new', data);
        openModal('loader');
        setTimeout(() => {
          closeModal('loader');
          openModal('vacancySuccess');
        }, 1000);
      });
    } catch (e) {
      console.log('Error creating vacancy', e);
    }

  } else {
    alert('Ошибка при добавлении судна. Пожалуйста, обновите страницу.');
  }
};

// ================================
// CREATE 30 VACANCIES WITH SHIPS
// ================================
const create30Vacancies = async () => {
  try {
    // 1. Load all registered ships for this company
    const shipsResp = await api.get("/navy/registered?email=" + userInfo.value.info.email);
    const ships = shipsResp.data;

    if (!ships.length) {
      alert("У вас нет созданных судов. Сначала создайте суда.");
      return;
    }

    // 2. Loop and create 30 vacancies
    for (let i = 0; i < 30; i++) {
      const ship = ships[i % ships.length]; // rotate through ships

      const vacancy = {
        position: "Капитан " + (i + 1),
        salary_from: 500000,
        salary_to: 700000,
        date_of_departure: "2025-01-10",
        date_of_departure_from: "2025-01-10",
        date_of_departure_to: "2025-12-31",
        contract_duration: "2 месяца",
        vessel: ship._id, // 👈 assign ship
        contact_person: companyProfile.value.f_i_o,
        email: companyProfile.value.email,
        phone1: companyProfile.value.phone1,
        phone2: companyProfile.value.phone2,

        responses: [],
        job_offers: [],
        approved_responses: [],
        approved_offers: [],

        is_publish: true,
        is_active: true,
        addNewShip: false,

        created_at: new Date(),
        view_count: 0
      };

      try {
        await api.post("/all-vacancies/create", vacancy);
        console.log(`Vacancy ${i + 1} created for ship ${ship.vessel_name}`);
      } catch (e) {
        console.error(`Error creating vacancy ${i + 1}`, e.response?.data || e);
      }

      // Delay to avoid server overloading
      await new Promise((r) => setTimeout(r, 100));
    }

    alert("30 вакансий успешно созданы!");
  } catch (err) {
    console.error(err);
    alert("Ошибка при создании вакансий");
  }
};


const send = async (publishState) => {
  v$.value.$touch();
  if (!v$.value.$error) {

    if (newShipChecker.value) {
      console.log('new ship')
      const dataToSubmit = prepareDataForSending(shipToAddNew)

      dataToSubmit.is_active = true;
      dataToSubmit.imo = dataToSubmit.imo.toString();
      dataToSubmit.append_company = vacancyData.value.addNewShip;
      dataToSubmit.ship_type = dataToSubmit.ship_type[0];

      vShip$.value.$touch();
      if (!vShip$.value.$error) {
        try {
          let data = await api.post("/navy/register", dataToSubmit).then((data) => {
            newVesselValidationError.value = false
            console.log('vessel new', data.data._id);
            vesselId.value = data.data._id;

            sendFinally();
          });
        } catch (e) {
          console.log(-1)
          newVesselValidationError.value = true
        }
      }

    } else {

      console.log('existing ship')
      if (sendEnableMF.value) {
        vesselId.value = shipToAddMF.value._id;
      } else if (sendEnable.value) {
        console.log('my ship', shipToAdd.value);
        vesselId.value = shipToAdd.value._id;
      } else {
        vesselId.value = -1;
        $('html, body').animate({
          scrollTop: $("#vessels-add-wrap").offset().top
        }, 300);

      }

      await sendFinally(publishState);

    }

  } else {
    $('html, body').animate({
      scrollTop: $("#vessel-edit-wrap").offset().top
    }, 300);
  }

}

const resetVacancy = async () => {
  window.location.reload();
}


</script>

<style lang="scss" scoped>
.sudno-top.sactive {
  display: none;
}

.inp-mt10 {
  margin-top: 10px;
}

.inppt5 {
  padding-top: 5px;
}

.vabout-item {
  .input {
    label {
      color: #9497b3;
      font-size: 16px;
    }
  }

}

.vabout-item {
  .input {
    input {
      font-size: 16px;
    }
  }

}

.input-date-contract {
  position: relative;
}

.vabout-info {
  .tag-input {
    width: 100%;
  }
}
.close-reg-about{
  position: relative;
  right: 5px;
  top: 5px;
}
</style>
