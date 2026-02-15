<template>
  <ClientOnly>
    <NuxtLayout name="default-hero">
      <div style="background-color: #fff">
        <AfHeaderColor />
      </div>
      <section id="resume" class="main cabinet">
        <div class="container">
          <div class="tabs">

            <div class="tab-header">
              <div class="tab-label" @click="activeTab = 1" :class="{ active: activeTab === 1 }">Резюме</div>
              <div class="tab-label" @click="activeTab = 2" :class="{ active: activeTab === 2 }">Настройки профиля</div>
            </div>
          </div>
        </div>

        <div class="tab-body" v-if="activeTab === 1"  >
          <div class="container">
            <h1>
              Резюме
            </h1>

            <div class="resume-main">

              <div class="resume-avatar">
                <span>{{ formData.last_name.substring(0, 1).toUpperCase() }} {{ formData.first_name.substring(0, 1).toUpperCase() }}</span>
              </div>
              <div class="resume-grid">
                <div class="input">
                  <label for="">Фамилия</label>
                  <input type="text" v-model="formData.last_name">
                </div>

                <div class="input">
                  <label for="">Имя</label>
                  <input type="text" v-model="formData.first_name">
                </div>

                <div class="input">
                  <label for="">Отчество</label>
                  <input type="text" v-model="formData.patronymic">
                </div>

                <div class="input">
                  <label for="">Страна (где находитесь)</label>
                  <input type="text" v-model="formData.country">
                </div>

                <div class="input">
                  <label for="">Регион</label>
                  <input type="text" v-model="formData.region">
                </div>

                <div class="input">
                  <label for="">Город</label>
                  <input type="text" v-model="formData.city">
                </div>

                <div class="input">
                  <label for="">Дата рождения</label>
                  <input type="date" v-model="formData.birth_date">
                </div>

                <div class="input">
                  <label for="">Контактный телефон</label>
                  <input type="text" v-model="formData.phone_number">
                </div>
              </div>
            </div>

            <div class="tag-input userSelUnput-wrap" style="margin-top: 30px;">
              <AfDropDox v-model="formData.positions" :options-list="professionalList" />
            </div>



            <div class="tag-input" style="margin-top: 30px;">
              <AfDropDox
                  v-model="formData.worked"
                  :options-list="seilorList"
                  title="Работал на судах (выбрать типа судов из списка)"
              />
            </div>

            <h2>Основные документы:</h2>
            <div class="docs-block-table">
              <div class="docs">
                <div class="docs__head">Название:</div>
                <div class="docs__head">Данные:</div>
                <div class="docs__label">Заграничный паспорт</div>
                <div class="docs__value alert">
                  <div class="date">
                    <input type="date" v-model="formData.main_documents.foreign_passport">
                  </div>
                  <div class="info" style="display: none;">
                    <img src="assets/img/resume/alert.svg" alt="">
                    <span>Срок действия истек! Заменить можно <a href="#">здесь</a></span>
                  </div>
                </div>

                <div class="docs__label">Удостоверение личности моряка</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.seafarers_ID_card">
                </div>

                <div class="docs__label">Диплом/ Свидетельство</div>
                <div class="docs__value">
                  <div class="date">
                    <input type="date" v-model="formData.main_documents.diploma">
                  </div>
                </div>

                <div class="docs__label">Начальная подготовка по безопасности</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.initial_safety_training">
                </div>

                <div class="docs__label">Назначенные обязанности по охране</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.designated_safeguarding_responsibilities">
                </div>

                <div class="docs__label">Специалист по шлюпкам и плотам</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.dinghy_and_raft_specialist">
                </div>


              </div>




              <div class="docs">
                <div class="docs__head">Название:</div>
                <div class="docs__head">Данные:</div>





                <div class="docs__label">Борьба с пожаром по расширенной программе</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.fighting_fire_with_an_expanded_program">
                </div>

                <div class="docs__label">Оказание первой медицинской помощи</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.providing_first_aid">
                </div>

                <div class="docs__label">Предотвращение загрязнения моря</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.prevention_of_marine_pollution">
                </div>

                <div class="docs__label">Танкерное свидетельство</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.tanker_certificate">
                </div>

                <div class="docs__label">Охрана труда</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.occupational_health_and_safety">
                </div>

                <div class="docs__label">Медицинская комиссия</div>
                <div class="docs__value">
                  <input type="text" placeholder="Введите данные" v-model="formData.main_documents.medical_commission">
                </div>
              </div>
            </div>
            <!-- /.docs-block-table -->

            <div class="docs-block-table">
              <div class="docs-block-item">
                <h2>
                  <div class="check">
                    <img src="assets/img/resume/check.svg" alt="check">
                  </div>
                  Документы судоводителей:
                </h2>

                <div class="docs">
                  <div class="docs__head">Название:</div>
                  <div class="docs__head">Действительно до:</div>

                  <div class="docs__label">ГМССБ</div>
                  <div class="docs__value alert">
                    <div class="date">
                      <input type="date" v-model="formData.shipwrights_papers.gmssb">
                    </div>
                    <div class="info" style="display: none;">
                      <img src="assets/img/resume/alert.svg" alt="">
                      <span>Срок действия истек! Заменить можно <a href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">ЭКНИС</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.shipwrights_papers.eknis">
                  </div>

                  <div class="docs__label">РЛТ</div>
                  <div class="docs__value">
                    <div class="date">
                      <input type="date" v-model="formData.shipwrights_papers.rlt">
                    </div>
                  </div>

                  <div class="docs__label">САРП</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.shipwrights_papers.sarp">
                  </div>

                </div>
              </div>
              <div class="docs-block-item">
                <h2>
                  <div class="check">
                    <img src="assets/img/resume/check.svg" alt="check">
                  </div>
                  Дополнительные документы:
                </h2>

                <div class="docs">
                  <div class="docs__head">Название:</div>
                  <div class="docs__head">Действительно до:</div>

                  <div class="docs__label">Изолирующие дыхательные приборы</div>
                  <div class="docs__value alert">
                    <div class="date">
                      <input type="date" v-model="formData.additional_documents.isolation_breathing_apparatus">
                    </div>
                    <div class="info" style="display: none;">
                      <img src="assets/img/resume/alert.svg" alt="">
                      <span>Срок действия истек! Заменить можно <a href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">Военно-морская подготовка</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.additional_documents.naval_training">
                  </div>

                  <div class="docs__label">Транспортная безопасность</div>
                  <div class="docs__value">
                    <div class="date">
                      <input type="date" v-model="formData.additional_documents.transportation_safety">
                    </div>
                  </div>

                  <div class="docs__label">Танкерное свидетельство</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.additional_documents.tanker_certificate">
                  </div>

                </div>
              </div>
            </div>
            <h2 class="with-subtitle">Опыт работы:</h2>

            <div class="cabinet-subtitle">
              <img src="assets/img/resume/info.png" alt="info">
              Система автоматически сортирует вакансии по периоду работы, в порядке убывания, от сегоднянешго (последнего)
              к годам ранее. Заполняйте информацию, в удобном для Вас порядке.
            </div>

            <div class="resume-experience">
              <table>
                <thead>
                <tr>
                  <th>Судовладелец</th>
                  <th>Тип судна</th>
                  <th>Название судна</th>
                  <th>Должность</th>
                  <th>Период работы</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in itemsWork" :key="index">
                  <td data-title="Судовладелец"><input v-model="item.shipowner" type="text" placeholder="Введите данные"></td>
                  <td data-title="Тип судна"><input v-model="item.type_of_vessel" type="text" placeholder="Введите данные"></td>
                  <td data-title="Название судна"><input v-model="item.ships_name" type="text" placeholder="Введите данные"></td>
                  <td data-title="Должность"><input v-model="item.position" type="text" placeholder="Введите данные"></td>
                  <td data-title="Период работы">
                    <div class="wne-dates">
                      <span>
                        <label>с</label>
                        <input v-model="item.period_of_work_from" type="date" placeholder="с">
                      </span>
                      <span>
                        <label>по</label>
                        <input v-model="item.period_of_work_to" type="date" placeholder="по">
                      </span>
                    </div>
                  </td>
                  <td class="resume-experience__delete">
                    <button @click="deleteWorkExpierience(index)">
                      <img src="assets/img/resume/delete.png" alt="delete">
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button @click="addWorkExpierience" class="resume-experience__add">
                      <span>+</span>
                      Добавить место работы
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <h2 class="with-subtitle">Ваши файлы:</h2>

            <div class="cabinet-subtitle">
              Вы можете прикрепить дополнительную информацию, к примеру файл с резюме, эти файлы будут видны работодателю.
            </div>

            <div class="files">
              <div class="file">
                <div class="file__icon">
                  <img src="assets/img/resume/doc.png" alt="doc">
                </div>
                <div class="file__label">Резюме Иванов Иван Иванович.doc</div>
                <div class="file__action">
                  <img src="assets/img/resume/delete.png" alt="delete">
                </div>
              </div>

              <div class="file upload">
                <div class="file__icon">
                  <img src="assets/img/resume/file.png" alt="file">
                </div>
                <div class="file__label">Загрузить файл</div>
              </div>
            </div>

            <h2 class="with-subtitle">Ваше резюме:</h2>

            <div class="cabinet-subtitle">
              На основе заполненных Вами данных, мы сформировали для Вас резюме, которое вы можете скачать в формате PDF.
            </div>

            <div class="files">
              <div class="file af-show-resume-button">
                <div class="file__label">Посмотреть свое резюме</div>
              </div>
            </div>
          </div>

          <div class="resume-buttons">
            <button @click="saveResume" class="primary">Сохранить</button>
            <button @click="resetResume" class="secondary">Сбросить</button>
          </div>
        </div>
        <div class="tab-body" v-if="activeTab === 2" >
          <div class="container">
            <h1>Контактные данные и уведомления</h1>

            <div class="resume-grid col2 resume-contact-setting">
              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-phone.png" alt="phone">
                </div>
                <div class="resume-contact__content completed">
                  {{userInfo.info.phone_number}}
                  <img src="assets/img/resume/check.svg" alt="done">
                </div>
              </div>
              <div class="resume-contact__second">
                <AfCheckbox
                    v-model="formData.notification_settings.send_sms"
                    :descText="'Присылайте мне '"
                    :linkText="'уведомления на телефон'"
                />
              </div>

              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-mail.png" alt="phone">
                </div>
                <div class="resume-contact__content pending">
                  {{userInfo.info.email}}
                  <a @click="toggleModal('approveemail')">Подвтердить</a>
                </div>
              </div>
              <div class="resume-contact__second">
                <AfCheckbox
                    v-model="formData.notification_settings.send_email"
                    :descText="'Присылайте мне '"
                    :linkText="'уведомления на почту'"
                />
              </div>

              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-vk.png" alt="phone">
                </div>
                <div v-if="!isVk" @click="toggleModal('approvevk')" style="cursor: pointer;" class="resume-contact__content empty">Подключить Вконтакте</div>
                <div v-if="isVk" class="resume-contact__content empty tg-approved" style="cursor: default;">Вконтакте подключен<img src="assets/img/resume/check.svg" alt="done"/></div>

              </div>
              <div class="resume-contact__second"></div>

              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-tg.png" alt="phone">
                </div>
                <div v-if="!isTg" @click="toggleModal('approvetg')" style="cursor: pointer;" class="resume-contact__content empty">Подключить Telegram</div>
                <div v-if="isTg" class="resume-contact__content empty tg-approved" style="cursor: default;">Telegram подключен<img src="assets/img/resume/check.svg" alt="done"/></div>

              </div>
              <div class="resume-contact__second">
                <AfCheckbox
                    v-model="formData.notification_settings.send_telegram"
                    :descText="'Присылайте мне '"
                    :linkText="'уведомления в Telegram'"
                />
              </div>
            </div>

            <h2 class="with-subtitle">Рассылка</h2>

            <label class="custom-checkbox">
              <input type="checkbox" v-model="formData.notification_settings.mailing_notification">
              <span class="checkmark"></span>
              Хочу получать <a href="#">рассылку по новым вакансиям</a> для выбранных должностей
            </label>

            <h2>Безопасность</h2>

            <div class="resume-password">
              <div class="resume-password__input">
                <div class="resume-password__icon">
                  <img src="assets/img/resume/icon-pass.png" alt="pass">
                </div>
                <input type="password">
              </div>
              <button @click="toggleModal('changepassword')">Сменить пароль</button>
            </div>

          </div>

          <div class="resume-buttons">
            <button @click="saveResume" class="primary">Сохранить</button>
            <button @click="resetResume" class="secondary">Сбросить</button>
          </div>
        </div>

      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["sailor"],
})
import { ref } from "vue";
import api from "@/api/api";

import AfInput from "@/components/uikit/AfInput";
import AfCheckbox from "@/components/uikit/AfCheckbox2";
import AfDropDox from "@/components/uikit/AfDropDox";


import { useUsersStore } from "~/store/useUserStore";
const userStore = useUsersStore();
const { userInfo, isTg, isVk } = storeToRefs(userStore)

import {useModalStore} from "~/store/modal";
const {closeModal, toggleModal} = useModalStore();

const url = useRequestURL()
const activeTab = ref(1);
if (url.href.includes('/resume?settings')) {
  activeTab.value = 2;
}

const formData = ref({
  first_name: "",
  last_name: "",
  main_documents: {},
  shipwrights_papers: {},
  additional_documents: {},
  working_experience: {},
  notification_settings: {
    send_email: false,
    send_sms: false,
    send_telegram: false,
    mailing_notification: false,
  }
})
if (!formData.value.working_experience_new) {
  formData.value.working_experience_new = []
}
const itemsWork = ref({});
async function getResume() {
  const { data } = await api.get("/resume");
  resume.value = data;
  console.log('1RESUME: ', resume.value);

  formData.value = resume.value;

  if (!formData.value.working_experience_new) {
    formData.value.working_experience_new = []
  }

  itemsWork.value = formData.value.working_experience_new;
}
getResume();

const professionalList = ref();
const seilorList = ref();

const initJobsShips = async () => {
  let jobs = await api.get("/available-jobs");
  professionalList.value = jobs.data;

  let ships = await api.get("/ship-types");
  seilorList.value = ships.data;
}
initJobsShips();

onMounted(async () => {
  document.body.classList.add('bg-white');
});

const prepareDataForSending = () => {
  const preparedData = {
    ...formData.value,
    positions: formData.value.positions,
    worked: formData.value.worked,
    working_experience_new: itemsWork.value
  };

  console.log('DATA TO SEND: ', preparedData)

  return preparedData;
};

const saveResume = async () => {
  const dataToSubmit = prepareDataForSending();
  await api.put("/resume", dataToSubmit).then((data) => {
    console.log('RESULT: ', data.value);
    window.location.reload();
  });
}
const resetResume = async () => {
  window.location.reload();
}



const addWorkExpierience = async () => {
  itemsWork.value.push({
    shipowner: "",
    type_of_vessel: "",
    ships_name: "",
    position: "",
    period_of_work_from: "1990-01-01",
    period_of_work_to: "2000-01-01"
  })
}
const deleteWorkExpierience = async (index) => {
  itemsWork.value.splice(index, 1);
}








const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
}
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", event);
}
const myOptions = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]



</script>

<style scoped>
.tab-label.tactive {
  border-bottom: 4px solid #3b45a9;
  color: #3b45a9;
}
.tab-body {
  display: block;
}
.resume-contact__content.tg-approved {
  background-color: #3b45a9;
  color: #fff;
}

.af-show-resume-button {
  background-color: #3b45a9;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  padding: 15px;
  width: 100%;
}
.af-show-resume-button:hover {
  background-color: #9b2719;
}
</style>