<template>
  <NuxtLayout name="default-hero">
    <div class="section-hero section-hero-post section-top-vabout">
      <AfCustomHeader/>
      <div class="vabout-top">
        <div class="container">
          <div class="vabout-top-block">
            <a href="#" class="vabout-cursor">
              ←
            </a>
            <div class="vabout-pag">
              <a href="/" class="vabout-pag-link">Главная</a>
              <a href="/vacancies" class="vabout-pag-link">Морские вакансии</a>
              <a class="vabout-pag-link">{{ vacancy.position }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section-vabout">
      <div class="container">
        <div class="post">
          <div class="vabout-top-content">
            <h1 class="vabout-title">
              {{ vacancy.position }}
            </h1>

            <div class="news-info">
              <div class="news-date vabout-date">{{ vacancyDate }}</div>
              <div v-if="vacancy.view_count > 0" class="news-view">
                <img src="assets/img/news/icon.svg" alt="image">
                <span>{{ vacancy.view_count }}</span>
              </div>
            </div>
          </div>

          <div class="vabout-block">
            <div class="vabout-content">
              <div class="vabout-part">
                <h2 class="vabout-h2">Основные данные:</h2>
                <div class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Зарплата:</div>
                    <strong v-if="vacancy.salary_from && vacancy.salary_to"
                            class="vabout-subtext">{{ vacancy.salary_from }} - {{ vacancy.salary_to }} ₽</strong>
                    <strong v-if="vacancy.salary_from && !vacancy.salary_to" class="vabout-subtext">от
                      {{ vacancy.salary_from }} ₽</strong>
                    <strong v-if="!vacancy.salary_from && vacancy.salary_to" class="vabout-subtext">до
                      {{ vacancy.salary_to }} ₽</strong>
                    <strong v-if="!vacancy.salary_from && !vacancy.salary_to" class="vabout-subtext">не указана</strong>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Период посадки:</div>
                    <div v-html="vacancy.contract_duration ? vacancy.contract_duration : 'не указана'"
                         class="vabout-subtext"></div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Дата посадки:</div>
                    <div v-html="departureDateDisplay ? departureDateDisplay : 'не указана'"
                         class="vabout-subtext"></div>
                  </div>
                </div>
              </div>

              <div class="vabout-part">
                <h2 class="vabout-h2">Судно:</h2>
                <div class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Судно:</div>
                    <div v-html="vessel.vessel_name ? vessel.vessel_name : '-'" class="vabout-subtext"></div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">IMO</div>
                    <div v-html="vessel.imo ? vessel.imo : '-'" class="vabout-subtext"></div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Тип судна:</div>
                    <div v-html="vessel.ship_type ? vessel.ship_type : '-'" class="vabout-subtext"></div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Год постройки:</div>
                    <div v-html="vessel.year_built ? vessel.year_built : '-'" class="vabout-subtext"></div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Длина:</div>
                    <div v-html="vessel.length ? vessel.length : '-'" class="vabout-subtext"></div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">Ширина:</div>
                    <div v-html="vessel.width ? vessel.width : '-'" class="vabout-subtext"></div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
                    <div v-html="vessel.dwt ? vessel.dwt : '-'" class="vabout-subtext"></div>
                  </div>

                  <div class="vabout-item">
                    <div class="vabout-subtitle">kW - двигательная установка:</div>
                    <div v-html="vessel.kw ? vessel.kw : '-'" class="vabout-subtext"></div>
                  </div>
                </div>
              </div>

              <div class="vabout-part">
                <h2 class="vabout-h2">Контантая информация:</h2>
                <div v-if="!showContacts" class="vabout-red">
                  <img src="assets/img/vabout/red.svg" alt="image">
                  <div>Данная информация станет доступна только после отправки и принятия отклика.</div>
                </div>

                <div v-if="!showContacts" class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Контактное лицо:</div>
                    <div class="vabout-subtext">хххххх хххх хххххххххх</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Email:</div>
                    <div class="vabout-subtext">xxxxxx@xxxxx.xx</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Телефон №1</div>
                    <div class="vabout-subtext">х ххх ххх хх хх</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Телефон №2</div>
                    <div class="vabout-subtext">х ххх ххх хх хх</div>
                  </div>
                </div>
                <div v-else class="vabout-info">
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Контактное лицо:</div>
                    <div v-if="vacancy.contact_person" class="vabout-subtext">{{ vacancy.contact_person }}</div>
                    <div v-else class="vabout-subtext">Не указано</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Email:</div>
                    <div v-if="vacancy.email" class="vabout-subtext">{{ vacancy.email }}</div>
                    <div v-else class="vabout-subtext">Не указан</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Телефон №1</div>
                    <div v-if="vacancy.phone1" class="vabout-subtext">{{ vacancy.phone1 }}</div>
                    <div v-else class="vabout-subtext">Не указан</div>
                  </div>
                  <div class="vabout-item">
                    <div class="vabout-subtitle">Телефон №2</div>
                    <div v-if="vacancy.phone2" class="vabout-subtext">{{ vacancy.phone2 }}</div>
                    <div v-else class="vabout-subtext">Не указан</div>
                  </div>
                </div>
              </div>
            </div>

            <aside class="vabout-aside">
              <div class="vabout-aside-top">
                <img v-if="company.photo_path" :src="company.photo_path" alt="image"
                     class="company-info-img vabout-aside-img">
                <span v-if="company.photo_path" class="company-info-title">{{ company.company_name }}</span>
                <div v-if="!company.photo_path" class="vabout-aside-img resume-avatar">
                  <div class="bordered bordered-ct-logo">
                    <img id="imgInpPreview" src="assets/img/header/logo-white.png" alt="avatar"/>
                    <span>{{ company.company_name }}</span>
                    <text>&#9875;</text>
                  </div>
                </div>
                <div v-if="vacancy.photo_path" class="vabout-aside-title">{{ company.company_name }}</div>
              </div>

              <div class="vabout-aside-dop">
                <a v-if="false" href="#" class="vabout-aside-button vabout-aside-red"
                  @click="sendResponse(vacancyId, vacancy.position , company);">>
                  <img src="assets/img/vabout/aside-1.svg" alt="image">
                  <div>Отправить отклик<br>
                    на вакансию
                  </div>
                </a>


                <a v-if="isAuth && !responseSend && userInfo.info.role == 'Моряк'"
                   class="vabout-aside-button vabout-aside-red"
                   @click="sendResponse(vacancyId, vacancy.position , company);">
                  <img src="assets/img/vabout/aside-1.svg" alt="image">
                  <div>Отправить отклик<br>
                    на вакансию
                  </div>
                </a>
                <a v-if="isAuth && responseSend && userInfo.info.role == 'Моряк'"
                   class="vabout-aside-button vabout-aside-success"
                   @click="sendResponse(vacancyId, vacancy.position , company);">
                  <img src="assets/img/vabout/aside-1.svg" alt="image">
                  <div>Отклик<br>
                    отправлен
                  </div>
                </a>


                <a v-if="isAuth && !favoriteVacancySend && userInfo.info.role == 'Моряк'"
                   @click="addFavoriteVacancy(vacancy._id)" class="vabout-aside-button vabout-aside-blue">
                  <img src="assets/img/vabout/aside-2.svg" alt="image">
                  <div>
                    Добавить вакансию<br>
                    в избранное
                  </div>
                </a>
                <a v-if="isAuth && favoriteVacancySend && userInfo.info.role == 'Моряк'"
                   class="vabout-aside-button vabout-aside-success-blue">
                  <img src="assets/img/vabout/aside-2.svg" alt="image">
                  <div>
                    Вакансия<br>
                    в избранном
                  </div>
                </a>

              </div>
              <!-- /.vabout-aside-dop -->

              <div class="vabout-aside-end">
                <a :href="'/company/vacancies/' + company._id" target="_blank" class="vabout-aside-link">Все вакансии
                  компании ({{ vacancies_count }})</a>


                <a v-if="isAuth && !favoriteCompanySend && userInfo.info.role == 'Моряк'"
                   @click="addFavoriteCompany(company._id)" class="vabout-aside-link">
                  Добавить компанию в избранное
                </a>

                <a v-if="isAuth && favoriteCompanySend && userInfo.info.role == 'Моряк'"
                   class="vabout-aside-link vabout-aside-link-success-disable">
                  Компания в избранном
                </a>
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
import api from "@/api/api";
import {ref} from "vue";

import {useModalStore} from "~/store/modal";
import {useUsersStore} from "~/store/useUserStore";
import {useGuestsStore} from "~/store/useGuestsStore";

const userStore = useUsersStore();
const {userInfo, isAuth, userProfileId} = storeToRefs(userStore)
const {openModalAfNotifications, toggleModal, closeModal} = useModalStore();

const guests = useGuestsStore()
const route = useRoute()
const company = ref({})
const vacancy = ref({})
const vessel = ref({})
const vacancyDate = ref('')
const vacancies_count = ref('')
const vacancyId = ref('')
const responseSend = ref(false)

const favoriteVacancySend = ref(false)
const favoriteCompanySend = ref(false)

const showContacts = ref(false)

const departureDateDisplay = ref('')

const vacancyInit = async (vacancyId) => {
  const {data} = await api.get("/all-vacancies/" + vacancyId);
  vacancy.value = data.vacancy;
  company.value = data.company_data;
  vessel.value = data.vessel
  vacancies_count.value = data.vacancies_count

  let tmpFrom = vacancy.value.date_of_departure_from.split('-');
  let tmpTo = vacancy.value.date_of_departure_to.split('-');

  departureDateDisplay.value = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

  const mon = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  let tdate = vacancy.value.created_at.split('T')[0];
  tdate = tdate.split('-');
  vacancyDate.value = parseInt(tdate[2]) + ' ' + mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]

  if (isAuth && userInfo.value.info.role == 'Моряк') {

    if (vacancy.value.responses) {
      for (let k = 0; k < vacancy.value.responses.length; k++) {
        if (userProfileId.value.resumeID === vacancy.value.responses[k]) {
          responseSend.value = true;
          break;
        }
      }
    }

    await api.get("/resume-full").then((resp) => {
      for (let i = 0; i < resp.data.favorite_vacancies.length; i++) {
        if (resp.data.favorite_vacancies[i] === vacancy.value._id) {
          favoriteVacancySend.value = true
          break
        }
      }
      for (let i = 0; i < resp.data.favorite_companies.length; i++) {
        if (resp.data.favorite_companies[i] === company.value._id) {
          favoriteCompanySend.value = true
          break
        }
      }
    })

  }



}
onMounted(async () => {
  let s = window.location.href.split('vacancy/')
    console.log(s)
  if (s.length > 1 && s[1] !== '') {
    await vacancyInit(s[1]);
    vacancyId.value = s[1];
  }
  for (let i = 0; i < vacancy.value.approved_offers.length; i++) {
    if (userProfileId.value.resumeID === vacancy.value.approved_offers[i]) {
      showContacts.value = true
      break;
    }
  }
  for (let i = 0; i < vacancy.value.approved_responses.length; i++) {
    if (userProfileId.value.resumeID === vacancy.value.approved_responses[i]) {
      showContacts.value = true
      break;
    }
  }
});

const getUserRole = () => {
  return userInfo.value.info.role
}
const addFavoriteVacancy = async (id) => {
  openModalAfNotifications('Вакансия добавлена в избранное', '');
  favoriteVacancySend.value = true;
  try {
    await api.post("/all-vacancies-favorite/vacancy/" + id).then((res) => {
      console.log(res);
      setTimeout(() => {
        closeModal('afnotifications')
      }, 5000);
    });
  } catch (e) {
    console.log(e);
  }
}
const addFavoriteCompany = async (id) => {
  openModalAfNotifications('Компания добавлена в избранное', '');
  favoriteCompanySend.value = true;
  try {
    await api.post("/all-vacancies-favorite/company/" + id).then((res) => {
      console.log(res);
      setTimeout(() => {
        closeModal('afnotifications')
      }, 5000);
    });
  } catch (e) {
    console.log(e);
  }
}

const sendResponse = async (vacancyId, position , data) => {
  openModalAfNotifications('Вы оставили отклик на вакансию:', position);
  responseSend.value = true;
  
  try {
    const resumeId = JSON.parse(localStorage.getItem("global/user") || '{}')?.userProfileId?.resumeID
    await api.post("/all-vacancies/" + vacancyId + "/respond").then(async (res) => {
        const telegramData = {
          vacancy_id: vacancyId,
          email: data.email,
          type: 'respond',
          vacancy_name: position,
          resumeId:resumeId,
          fio: userInfo.value.info.last_name + ' ' + userInfo.value.info.first_name
        };
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          console.log(`${key}:`, localStorage.getItem(key));
        }
        try {
          await api.post("/telegram_message", telegramData);
          console.log('Telegram message sent');
        } catch (error) {
          console.log('Error sending Telegram message:', error);
        }

        if (userInfo.value.info.role === 'Моряк' && WebSocketService.instance) {
          const resumeId =
            userProfileId?.value?.resumeID ||
            JSON.parse(localStorage.getItem("global/user") || "{}")?.userProfileId?.resumeID;

          const senderId = userInfo.value.info.id || userInfo.value.info._id;

          WebSocketService.instance.sendMessage({
            type: "notify",
            receiver_id: data._id,
            receiver_role: "Компания",
            message: {
              sender_id: senderId,
              role: userInfo.value.info.role,
              name: `${userInfo.value.info.first_name} ${userInfo.value.info.last_name}`,
              resume_id: resumeId,
              vacancy_id: vacancyId,
              vacancy_name: position,
              type: 'respond'
            }
          });
        }


      setTimeout(() => {
        closeModal('afnotifications')
      }, 5000);
      
      console.log('Response sent for vacancy:', vacancyId);
    });
  } catch (e) {
    console.log('Error sending response:', e);
  }
}


</script>

<style lang="scss" scoped>
.resume-avatar .bordered.bordered-ct-logo {
  background: #3b45a9;
  padding: 15px;
  width: 275px;
  height: 275px;
  position: relative;
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

.company-info-title {
  text-align: center;
  font-size: 20px;
  font-family: "Myriad Pro Semibold", sans-serif;
  color: rgb(59, 69, 169);
  font-weight: bold;
  text-decoration: underline;
}

.company-info-img {
  width: 275px;
  height: 275px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #999;
}

</style>
