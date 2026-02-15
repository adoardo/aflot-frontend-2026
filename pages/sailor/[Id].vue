<template>
  <NuxtLayout name="default-hero">
    <div class="section-hero section-hero-post section-vabout-s">
      <AfCustomHeader/>
      <div class="vabout-top">
        <div class="container">
          <div class="vabout-top-block">
            <a href="#" class="vabout-cursor">
              ←
            </a>
            <!-- /.vabout-cursor -->
            <div class="vabout-pag">
              <a href="/" class="vabout-pag-link">Главная</a>
              <!-- /.vabout-pag-link -->
              <a href="/resumes" class="vabout-pag-link">Анкеты морков</a>
              <!-- /.vabout-pag-link -->
              <a class="vabout-pag-link">{{ resume.last_name + " " + resume.first_name + " " + resume.patronymic }}</a>
              <!-- /.vabout-pag-link -->
            </div>
            <!-- /.vabout-pag -->
          </div>
          <!-- /.vabout-top-block -->
        </div>
        <!-- /.container -->
      </div>
    </div>

    <section class="section-vabout">
      <div class="container">
        <div class="post">
          <div class="pdf-show-logo">
            <AfLogo type="blue" />
          </div>
          <div class="vabout-top-content">
            <h1 class="vabout-title">
              {{ resume.last_name + " " + resume.first_name + " " + resume.patronymic }}
            </h1>
            <!-- /.vabout-title -->

            <div class="news-info">
              <div v-if="resume.tarif=='Ищу работу'" class="tarif-badge vabout-bwork">
                Ищу работу
              </div>
              <div v-if="resume.tarif == 'Рассмотрю предложение'" class="tarif-badge vabout-bwork-blue">
                Рассмотрю предложение
              </div>
              <div v-if="resume.tarif == 'Трудоустроен'" class="tarif-badge vabout-bwork-grey">
                Трудоустроен
              </div>
              <!-- /.vabout-bwork -->
              <div v-if="resume.view_count > 0" class="news-view pdf-hide">
                <img src="assets/img/news/icon.svg" alt="image">
                <span>{{resume.view_count}}</span>
              </div>
              <!-- /.news-view -->
            </div>
            <!-- /.post-info -->
          </div>
          <!-- /.vabout-top-block -->

          <div class="vabout-block vabout-block-2">
            <div class="vabout-content">
              <div class="vabout-part">
                <div class="hideonpage">

                </div>
                <h2 class="vabout-h2">Основные данные:</h2>

                <div class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Желаемая должность:</div>
                    <div v-if="resume.positions" class="vabout-subtext">{{ resume.positions }}</div>
                    <div v-else class="vabout-subtext">не указана</div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Минимальная зарплата</div>
                    <strong v-if="resume.salary" class="vabout-subtext">{{ resume.salary }} ₽</strong>
                    <strong v-else class="vabout-subtext">не указана</strong>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Местонахождение:</div>
                    <div v-if="resume.full_loc" class="vabout-subtext">{{ resume.full_loc }}</div>
                    <div v-else class="vabout-subtext">не указано</div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Работал на судах:</div>
                    <div v-if="resume.worked" class="vabout-subtext">{{ resume.worked }}</div>
                    <div v-else class="vabout-subtext">не указано</div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Дата рождения</div>
                    <div v-if="resume.birth_date" class="vabout-subtext">{{ resume.birth_date }}</div>
                    <div v-else class="vabout-subtext">не указана</div>
                  </div>

                </div>

              </div>


              <div class="vabout-part">
                <div class="let-top accordion" :class="{active: showMainDocs}" @click="toggleShowMainDocs()">
                  <div class="let-top-title">
                    Основные документы:
                  </div>
                  <div class="let-top-cursor pdf-hide">
                    <img src="assets/img/let/cursor.svg" alt="image" class="let-top-img">
                  </div>
                </div>




                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="docs-block-table docs-accordion-table pdf-force-mh" id="mainDocsTable">
                  <div class="docs">
                    <div class="docs__head">Название:</div>
                    <div class="docs__head">Действительно до:</div>

                    <div class="docs__label">Заграничный паспорт</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.foreign_passport" class="date">
                        {{ resume.main_documents.foreign_passport }}
                      </div>
                      <div v-else class="date">не указан</div>
                    </div>

                    <div class="docs__label">Удостоверение личности моряка</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.seafarers_ID_card" class="date">
                        {{ resume.main_documents.seafarers_ID_card }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Диплом/ Свидетельство</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.diploma" class="date">{{ resume.main_documents.diploma }}</div>
                      <div v-else class="date">не указан</div>
                    </div>

                    <div class="docs__label">Начальная подготовка по безопасности</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.initial_safety_training" class="date">
                        {{ resume.main_documents.initial_safety_training }}
                      </div>
                      <div v-else class="date">не указана</div>
                    </div>

                    <div class="docs__label">Назначенные обязанности по охране</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.designated_safeguarding_responsibilities" class="date">
                        {{ resume.main_documents.designated_safeguarding_responsibilities }}
                      </div>
                      <div v-else class="date">не указаны</div>
                    </div>

                    <div class="docs__label">Специалист по шлюпкам и плотам</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.dinghy_and_raft_specialist" class="date">
                        {{ resume.main_documents.dinghy_and_raft_specialist }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>
                  </div>

                  <div class="docs">
                    <div class="docs__head">Название:</div>
                    <div class="docs__head">Действительно до:</div>

                    <div class="docs__label">Борьба с пожаром по расширенной программе</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.fighting_fire_with_an_expanded_program" class="date">
                        {{ resume.main_documents.fighting_fire_with_an_expanded_program }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Оказание первой медицинской помощи</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.providing_first_aid" class="date">
                        {{ resume.main_documents.providing_first_aid }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Предотвращение загрязнения моря</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.prevention_of_marine_pollution" class="date">
                        {{ resume.main_documents.prevention_of_marine_pollution }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Танкерное свидетельство</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.tanker_certificate" class="date">
                        {{ resume.main_documents.tanker_certificate }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Охрана труда</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.occupational_health_and_safety" class="date">
                        {{ resume.main_documents.occupational_health_and_safety }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Медицинская комиссия</div>
                    <div class="docs__value">
                      <div v-if="resume.main_documents.medical_commission" class="date">
                        {{ resume.main_documents.medical_commission }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vabout-part">
                <div class="let-top accordion" :class="{active: showDopDocs}" @click="toggleShowDopDocs()">
                  <div class="let-top-title">
                    Дополнительные документы:
                  </div>
                  <div class="let-top-cursor pdf-hide">
                    <img src="assets/img/let/cursor.svg" alt="image" class="let-top-img">
                  </div>
                </div>

                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info docs-accordion-table pdf-force-mh" id="dopDocsTable">
                  <div class="docs">

                    <div class="docs__head">Название:</div>
                    <div class="docs__head">Действительно до:</div>

                    <div class="docs__label">Изолирующие дыхательные приборы</div>
                    <div class="docs__value">
                      <div v-if="resume.additional_documents.isolation_breathing_apparatus" class="date">
                        {{ resume.additional_documents.isolation_breathing_apparatus }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Военно-морская подготовка</div>
                    <div class="docs__value">
                      <div v-if="resume.additional_documents.naval_training" class="date">
                        {{ resume.additional_documents.naval_training }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Транспортная безопасность</div>
                    <div class="docs__value">
                      <div v-if="resume.additional_documents.transportation_safety" class="date">
                        {{ resume.additional_documents.transportation_safety }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">Танкерное свидетельство</div>
                    <div class="docs__value">
                      <div v-if="resume.additional_documents.tanker_certificate" class="date">
                        {{ resume.additional_documents.tanker_certificate }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vabout-part">
                <div class="let-top accordion" :class="{active: showShipDocs}" @click="toggleShowShipDocs()">
                  <div class="let-top-title">
                    Документы судоводителей:
                  </div>
                  <div class="let-top-cursor pdf-hide">
                    <img src="assets/img/let/cursor.svg" alt="image" class="let-top-img">
                  </div>
                </div>
                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info docs-accordion-table pdf-force-mh" id="shipDocsTable">
                  <div class="docs">

                    <div class="docs__head">Название:</div>
                    <div class="docs__head">Действительно до:</div>

                    <div class="docs__label">ГМССБ</div>
                    <div class="docs__value">
                      <div v-if="resume.shipwrights_papers.gmssb" class="date">{{ resume.shipwrights_papers.gmssb }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">ЭКНИС</div>
                    <div class="docs__value">
                      <div v-if="resume.shipwrights_papers.eknis" class="date">{{ resume.shipwrights_papers.eknis }}
                      </div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">РЛТ</div>
                    <div class="docs__value">
                      <div v-if="resume.shipwrights_papers.rlt" class="date">{{ resume.shipwrights_papers.rlt }}</div>
                      <div v-else class="date">не указано</div>
                    </div>

                    <div class="docs__label">САРП</div>
                    <div class="docs__value">
                      <div v-if="resume.shipwrights_papers.sarp" class="date">{{ resume.shipwrights_papers.sarp }}</div>
                      <div v-else class="date">не указано</div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="resume.working_experience_new.length > 0" class="vabout-part">
                <h2 class="vabout-h2">Опыт работы:</h2>

                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info resume-experience">
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


                    <tr v-for="(item, i) in resume.working_experience_new"
                        :data="item"
                        :key="'working_experience_new-item-' + i">
                      <td v-if="item.shipowner" data-title="Судовладелец"><span>{{ item.shipowner }}</span></td>
                      <td v-else data-title="Судовладелец"><span>не указан</span></td>

                      <td v-if="item.type_of_vessel" data-title="Тип судна"><span>{{ item.type_of_vessel }}</span></td>
                      <td v-else data-title="Тип судна"><span>не указан</span></td>

                      <td v-if="item.ships_name" data-title="Название судна"><span>{{ item.ships_name }}</span></td>
                      <td v-else data-title="Название судна"><span>не указано</span></td>

                      <td v-if="item.position" data-title="Должность"><span>{{ item.position }}</span></td>
                      <td v-else data-title="Должность"><span>не указана</span></td>

                      <td v-if="item.period_of_work_from" data-title="Период работы">
                        <span>{{ item.period_of_work_from }}</span></td>
                      <td v-else data-title="Период работы"><span>не указан</span></td>

                      <td class="resume-experience__delete">

                      </td>
                    </tr>

                    </tbody>
                  </table>
                </div>

              </div>


              <div v-if="resume.media_files" class="vabout-part pdf-hide">
                <h2 class="vabout-h2">Файлы моряка:</h2>

                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info cabinet">
                  <div class="files">
                    <div v-for="(item, i) in resume.media_files" class="file">
                      <a style="cursor: pointer;" :href="item.url" target="_blank">
                        <div class="file__icon">
                          <img src="assets/img/resume/doc.png" alt="doc">
                        </div>
                        <div class="file__label">{{item.label}}</div>
                        <div class="file__action">
                          <img src="assets/img/vabout/down.svg" alt="delete">
                        </div>
                      </a>
                    </div>


                  </div>
                </div>

              </div>


              <div class="vabout-part pdf-hide">
                <h2 class="vabout-h2">Резюме сайта:</h2>

                <div class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info cabinet">
                  <div class="files">
                    <div @click="generatePdf" style="width:100%" class="file">
                      <div style="width: 40px;" class="file__icon">
                        <img src="assets/img/pdf17.svg" alt="doc">
                      </div>
                      <div style="cursor: pointer;" class="file__label">{{ resume.last_name + " " + resume.first_name + " " + resume.patronymic }}.pdf</div>
                    </div>


                  </div>
                </div>

              </div>


              <div class="vabout-part">
                <h2 class="vabout-h2">Контантая информация:</h2>

                <div v-if="false" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Некоторая информация станет доступна только после отправки и принятия
                    предложения по вакансии.
                  </div>
                </div>

                <div class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Контактное лицо:</div>
                    <div class="vabout-subtext">{{ resume.last_name + " " + resume.first_name + " " + resume.patronymic }}</div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Email:</div>
                    <div v-if="resume.email" class="vabout-subtext">{{resume.email}}</div>
                    <div v-else class="vabout-subtext">не указан</div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Телефон</div>
                    <div v-if="resume.phone_number" class="vabout-subtext">{{ resume.phone_number }}</div>
                    <div v-else class="vabout-subtext">не указан</div>
                  </div>
                </div>

              </div>
            </div>
            <!-- /.vabout-content -->
            <aside class="vabout-aside">


              <div v-if="resume.photo_path" class="vabout-aside-top vabout-aside-top-new">
                <img :src="resume.photo_path" alt="image" class="vabout-aside-img">
              </div>
              <div v-if="!resume.photo_path" class="vabout-aside-top">
                <div style="transform: scale(.85);" class="vabout-aside-img resume-avatar">
                  <div class="bordered bordered-ct-logo">
                    <div class="ed-lk-fn-ln">
                      {{ resume.last_name.substring(0, 1).toUpperCase() }} {{ resume.first_name.substring(0, 1).toUpperCase() }}
                    </div>
                    <img id="imgInpPreview" src="assets/img/header/logo-white.png" alt="avatar"/>
                    <text>&#9875;</text>
                  </div>
                </div>
              </div>
              <!-- /.vabout-aside-top -->

              <div v-if="isAuth && userInfo.info.role == 'Компания'" class="vabout-aside-dop">
                <a @click="openOfferModal('companyvac', route.params.Id)" class="vabout-aside-button vabout-aside-red">
                  <img src="assets/img/vabout/aside-1.svg" alt="image">
                  <div>Предложить<br> вакансию</div>
                </a>
                <!-- /.vabout-aside-button -->
                <a v-if="!favoriteSend" @click="addToFavorite()" class="vabout-aside-button vabout-aside-blue">
                  <img src="assets/img/vabout/aside-2.svg" alt="image">
                  <div>
                    Добавить моряка<br> в избранное
                  </div>
                </a>
                <a target="_blank" href="/company/featured-sailor" v-else class="vabout-aside-button vabout-aside-blue vabout-aside-tb">
                  <img src="assets/img/mor/icon-3.png" alt="icon"/>
                  <div>
                    Моряк <br> в избранном
                  </div>
                </a>
                <!-- /.vabout-aside-button -->
              </div>
              <!-- /.vabout-aside-dop -->

              <div v-if="isAuth && userInfo.info.role == 'Компания'" class="vabout-aside-end">
                <a v-if="!blackSend" @click="addToBlackList()" class="vabout-aside-link vabout-aside-linkdop">Добавить моряка<br> в черный
                  список</a>
                <!-- /.vabout-aside-link -->
                <div v-else>
                  Моряк в <a target="_blank" style="text-decoration: underline;" href="/company/featured-sailor#black-list">черном списке</a>
                </div>
              </div>
              <!-- /.vabout-aside-end -->
            </aside>
            <!-- /.vabout-aside -->

          </div>
          <!-- /.vabout-block -->

        </div>
        <!-- /.post -->
      </div>
      <!-- /.container -->
    </section>
    <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'"/>
  </NuxtLayout>

</template>

<script setup>
definePageMeta({
  ssr: false,
})
import {ref} from "vue";
import api from "@/api/api";
import {useUsersStore} from "~/store/useUserStore";
import { useGuestsStore } from "~/store/useGuestsStore";

import axios from 'axios'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import AfLogo from "@/components/uikit/AfLogo";

import convertPositions from "../../utils/convertPositions.js";
import convertLocation from "../../utils/convertLocation.js";

const userStore = useUsersStore();
const guests = useGuestsStore()

const {userInfo, isAuth} = storeToRefs(userStore)

import { useModalStore } from "@/store/modal";
const { openBLModal, openOfferModal, openModal, closeModal, toggleModal, openModalCommon } = useModalStore();

const route = useRoute()

const favoriteSend = ref(false)
const blackSend = ref(false)

const company = ref(false)
const resume = ref({
  first_name: "",
  last_name: "",
  patronymic: "",
  salary: "",
  birth_date: "",
  country: "",
  city: "",
  region: "",
  full_loc: "",
  main_documents: {},
  positions: "не указана",
  shipwrights_papers: {},
  additional_documents: {},
  working_experience: {},
  working_experience_new: {},
  notification_settings: {
    send_email: false,
    send_sms: false,
    send_telegram: false,
    mailing_notification: false,
  }
})

const showMainDocs = ref(false)
const showDopDocs = ref(false)
const showShipDocs = ref(false)

async function getResume() {
  const {data} = await api.get("/resumes/" + route.params.Id);
  resume.value = data;
  resume.value.positions = convertPositions(resume.value.positions)
  console.log(data , "data")
  let tmp = resume.value.worked;
  if (!tmp) {
    resume.value.worked = "не указано"
  } else if (tmp.length === 1) {
    resume.value.worked = resume.value.worked[0]
  } else {
    tmp = '';
    for (let i = 0; i < resume.value.worked.length; i++) {
      tmp = tmp + resume.value.worked[i];
      if (resume.value.worked[i + 1]) {
        tmp = tmp + ', ';
      }
    }
    resume.value.worked = tmp
  }

  resume.value.full_loc = convertLocation(resume.value)
  if (!resume.value.full_loc) {
    resume.value.full_loc = 'не указано';
  }


  if (resume.value.birth_date) {
    let d = new Date(),
        month = (d.getMonth() + 1),
        day = d.getDate(),
        year = d.getFullYear();

    let date = resume.value.birth_date;
    date = date.split('-');
    let month_c = date[1];
    let day_c = date[2];
    let year_c = date[0];

    let calc = year - year_c;
    if ((month_c > month) || ((month_c === month) && (day_c > day))) {
      calc = calc - 1;
    }

    if (month_c.length < 2)
      month_c = '0' + month;
    if (day_c.length < 2)
      day_c = '0' + day;

    resume.value.birth_date = day_c + '.' + month_c + '.' + year_c + ' (' + calc + ' лет)';
  }

  for (let i = 0; i < resume.value.working_experience_new.length; i++) {
    if (resume.value.working_experience_new[i].period_of_work_from) {
      tmp = resume.value.working_experience_new[i].period_of_work_from.split('-')
      resume.value.working_experience_new[i].period_of_work_from = tmp[2] + '.' + tmp[1] + '.' + tmp[0]
      tmp = resume.value.working_experience_new[i].period_of_work_to.split('-')
      resume.value.working_experience_new[i].period_of_work_to = tmp[2] + '.' + tmp[1] + '.' + tmp[0]

      resume.value.working_experience_new[i].period_of_work_from = resume.value.working_experience_new[i].period_of_work_from + ' - ' + resume.value.working_experience_new[i].period_of_work_to
    }
  }

  let label = '';
  let url = '';
  if (resume.value.media_files) {
    for (let i = 0; i < resume.value.media_files.length; i++) {
      url = resume.value.media_files[i];
      label = resume.value.media_files[i].split('/');
      label = label[label.length - 1];
      label = label.split('-');
      label.shift();
      if (Array.isArray(label)) {
        label = label.join('-');
      }

      resume.value.media_files[i] = {
        'url': url,
        'label': label
      };
    }
  }
}
getResume();

async function getCompany() {
  if (isAuth && userInfo.value.info.role == 'Компания') {
    const {data} = await api.get("/company/profile");
    company.value = data;

    let id = route.params.Id
    if (data.black_list) {
      for (let i = 0; i < data.black_list.length; i++) {
        if (id === data.black_list[i].sailor_id) {
          blackSend.value = true
          break
        }
      }
    }
    if (data.favorites_resume) {
      for (let i = 0; i < data.favorites_resume.length; i++) {
        if (id === data.favorites_resume[i]) {
          favoriteSend.value = true
          break
        }
      }
    }
  }
}
getCompany();
const addToFavorite = async () => {
  await api.post("/resumes/favorite/add/" + route.params.Id).then((data) => {
    favoriteSend.value = true
  });
}
const addToBlackList = async () => {
  openBLModal('blacklist', route.params.Id)
  // await api.post("/resumes/blacklist/add/" + route.params.Id).then((data) => {
  //   blackSend.value = true
  // });
}

const toggleShowMainDocs = async() => {
  showMainDocs.value = !ShowMainDocs.value
}
const toggleShowDopDocs = async() => {
  showDopDocs.value = !ShowDopDocs.value
}
const toggleShowShipDocs = async() => {
  showShipDocs.value = !ShowShipDocs.value
}
onMounted(() => {

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  if(userInfo.value.info.role === 'Компания') {
    if(WebSocketService.instance) {
      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: route.params.Id,
        receiver_role: "Моряк",
        message: {
          sender_id: userInfo.value.info.id,
          role: userInfo.value.info.role,
          name: userInfo.value.info.first_name,
          resume_id: route.params.Id,
          vacancy_id: 'aflot',
          vacancy_name: 'aflot',
          type: 'visit'
        }
      })
    }
  }
});

const generatePdf = () => {

    const iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.style.width = '100%'
    iframe.style.height = 0
    document.body.appendChild(iframe);
    const iframedoc = iframe.contentDocument||iframe.contentWindow.document;

    iframedoc.body.innerHTML = $('html').html();
    iframedoc.querySelector('.vabout-aside').remove()
    iframedoc.querySelector('.section-hero').remove()
    iframedoc.querySelector('.footer').remove()
    iframedoc.querySelectorAll('.pdf-hide').forEach(el => {
      el.style.display = "none";
    });
    iframedoc.querySelectorAll('.pdf-force-mh').forEach(el => {
      el.style.maxHeight='100%';
    });
    iframedoc.querySelector('.pdf-show-logo').style.display='flex';
    iframedoc.querySelector('.pdf-show-logo').style.justifyContent='start';
    iframedoc.querySelector('.vabout-top-content').style.justifyContent='start';
    
    iframedoc.querySelector('.vabout-content').style.width='100%';
    iframedoc.querySelector('.vabout-content').style.maxWidth='100%';
    iframedoc.querySelector('.docs__value').style.paddingTop='10px';
    iframedoc.querySelectorAll('.docs__value').forEach(docsValue => {
      const docsLabel = docsValue.previousElementSibling
      if (docsLabel && docsLabel.textContent.trim()) {
        return
      }
      docsValue.remove()
      if (docsLabel) {
        docsLabel.remove()
      }
    })
    iframedoc.querySelectorAll('.vabout-info tbody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      let shouldRemoveRow = Array.from(cells).some(cell => {
        const span = cell.querySelector('span');
        return span && span.textContent.trim() === ""
      })

      if (shouldRemoveRow) {
        row.remove()
      }
    })

    html2canvas(iframedoc.body).then((canvas) => {
      iframe.remove()
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF('p','mm',[297, 210]);
      const imgProps= pdf.getImageProperties(imgData);
      const width = 210
      const height = (imgProps.height * width) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(resume.value.last_name + " " + resume.value.first_name + " " + resume.value.patronymic + '.pdf');
    })
}

</script>

<style lang="scss" scoped>
.hideonpage.showonlypdf {
  display: flex;
}
.pdfwidth100 {
  max-width: 100%;
}
.vabout-aside-top-new {
  border: 2px solid rgb(var(--color-gray-200) / 1);
  border-radius: 50%;
  overflow: hidden;
}

.resume-avatar {
  .bordered.bordered-ct-logo {
    img {
      position: absolute;
      top: -5px;
      display: flex;
      width: 40%;
      left: calc(50% - 56px);
      height: 76px;
      opacity: .8;
    }

    span {
      text-transform: uppercase;
      display: flex;
      color: #fff;
      text-align: center;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 22px;
      border-radius: 50%;
      overflow: hidden;
    }

    text {
      position: absolute;
      bottom: 5px;
      left: calc(50% - 25px);
      font-size: 34px;
      filter: grayscale(1) brightness(2);
      opacity: .6;
    }
  }
}

.resume-avatar .bordered.bordered-ct-logo {
  background: #3b45a9;
  padding: 15px;
  width: 275px;
  max-width: 275px;
  height: 275px;
  position: relative;
}
.file > a {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
}
.cabinet .files .file__action {
  position: absolute;
  right: 0px;
  top: 0px;
}
.cabinet .files .file__label {
  padding-left: 20px;
}
.vabout-info .files {
  flex-wrap: wrap;
}
.cabinet .files .file {
  width: calc(50% - 103px);
}
.cabinet .files .file {
  position: relative;
  justify-content: space-between;
}
.vabout-aside-tb {
  border: transparent;
  text-decoration: none;
  font-weight: 600;
}
.ed-lk-fn-ln {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  background-color: #3b45a9;
  font-size: 64px;
}

.docs-accordion-table {
  max-height: 0px;
  overflow: hidden;
  transition: .2s;
}

.pdf-show-logo {
  align-items: center;
  justify-content: center;
  display: none;
  margin-bottom: 30px;
}
.tarif-badge{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
