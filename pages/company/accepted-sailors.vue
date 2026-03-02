<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" class="main cabinet">
      <div>
        <AfHeaderColor />
      </div>

      <section id="responses">
        <div class="container">
          <div class="vacancy-start-title">
            <a class="vacancy-link-off">
              <span>←</span>
              готовы к работе
            </a>
          </div>

          <!-- LOADING -->
          <div v-if="loading" class="text-center py-5">
            Загрузка...
          </div>

          <!-- ERROR -->
          <div v-else-if="error" class="text-center py-5 text-danger">
            {{ error }}
          </div>

          <!-- EMPTY -->
          <div v-else-if="!vacanciesWithSailors.length" class="not-allowed-sailor text-center py-5">
            <div class="no-results">
              <span>Нет одобренных моряков по вашим вакансиям.</span>
              <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
            </div>
          </div>

          <!-- MAIN LIST -->
          <div v-else class="vacancy-list">

            <div
              v-for="vacancy in vacanciesWithSailors"
              :key="vacancy.vacancy_id"
              class="vacancy-group"
            >
              <!-- Vacancy Title -->
              <div class="vacancy-group-header">
                <div class="vacancy-group-title">
                  <strong>{{ vacancy.vacancy_name }}</strong>
                  <span v-if="vacancy.vessel_name && vacancy.vessel_name !== '—'">
                    · Судно: {{ vacancy.vessel_name }}
                  </span>
                </div>
              </div>

              <!-- SAILOR CARDS -->
              <div class="sailor_list"
                :class="{ 'sailor_list_single': vacancy.approved_sailors.length === 1 }"
              >

                <div
                  v-for="sailor in vacancy.approved_sailors"
                  :key="sailor.id || sailor._id || sailor.info?.id"
                  class="vacancy vacancy-item-off"
                    :class="{
                        'card-red': sailor.tarif === 'Ищу работу',
                        'card-blue': sailor.tarif === 'Рассмотрю предложение',
                        'card-grey': sailor.tarif === 'Трудоустроен',
                        }"

                >
                  <div class="vacancy-top-off">
                    <div v-if="sailor.photo_path" class="vacancy__logo">
                      <img :src="sailor.photo_path" alt="logo" />
                    </div>
                    <div v-else class="vacancy__logo vacancy__logo_empty">
                      <div class="ed-lk-fn-ln">
                        {{ sailor.last_name.substring(0, 1).toUpperCase() }}
                        {{ sailor.first_name.substring(0, 1).toUpperCase() }}
                      </div>
                      <img src="assets/img/header/logo-white.png" alt="logo" />
                      <text>⚓</text>
                    </div>

                    <div class="vacancy-content-off">
                      <div class="vacancy__label">
                        {{ getSailorFullName(sailor) }}
                        <img src="assets/img/dop-page/icon-red.svg" alt="image" />
                      </div>

                      <div class="vacancy__meta">
                        <div class="vacancy__info">
                          <div class="vi-item">
                            <div class="vacancy-subwork-off">
                              {{ vacancy.vacancy_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- SAILOR INFO -->
                  <div class="vacancy__info">

                    <div v-if="getSalaryText(sailor)" class="vi-item">
                      <div class="vi-label">Минимальная зарплата:</div>
                      <strong>{{ getSalaryText(sailor) }}</strong>
                    </div>

                    <div v-if="getLocationText(sailor)" class="vi-item">
                      <div class="vi-label">Местонахождение:</div>
                      {{ getLocationText(sailor) }}
                    </div>

                    <div v-if="getVesselsText(sailor)" class="vi-item">
                      <div class="vi-label">Работал на судах:</div>
                      {{ getVesselsText(sailor) }}
                    </div>

                  </div>

                  <!-- PHONES -->
                  <div v-if="getPhones(sailor).length" class="vacancy__buttons">
                    <div class="vacancy__button vacancy__button_pblock">
                      <img src="assets/img/dop-page/phone-gray.svg" alt="" />
                      <template v-for="(phone, idx) in getPhones(sailor)" :key="idx">
                        <a class="vacancy__button-phone" :href="`tel:${phone}`">
                          {{ phone }}
                        </a>
                        <span v-if="idx < getPhones(sailor).length - 1"> | </span>
                      </template>
                    </div>
                  </div>

                  <!-- ACTION BUTTONS -->
                  <div class="vacancy__buttons">
                    <div class="vacancy__button red" @click="gotoSailor(sailor._id)">
                      <img src="assets/img/responses/more.png" alt="" />
                      Подробнее о моряке
                    </div>
                    <div class="vacancy__button" @click="deleteSailor(sailor._id ,vacancy.vacancy_id )">
                      <img src="assets/img/responses/cancel.png" alt="" />
                      Пометить неактуальным
                    </div>
                  </div>

                  <!-- STATUS BADGE -->
                  <div class="vacancy__date new vacancy-dateoff">
                    <div
                      :class="[
                        sailor.tarif === 'Ищу работу' ? 'status-red' : sailor.tarif === 'Рассмотрю предложение' ? 'status-blue' : 'status-grey',
                        ]"

                    >
                      {{ sailor.tarif }}
                    </div>
                  </div>

                </div> <!-- end card -->
              </div> <!-- end grid -->

            </div> <!-- end vacancy-group -->

          </div>
        </div>
      </section>

      <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'" />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'
import { useUsersStore } from '~/store/useUserStore'

definePageMeta({ middleware: ['company'] })

const usersStore = useUsersStore()
const vacanciesWithSailors = ref([])
const loading = ref(false)
const error = ref(null)

import { useModalStore } from "~/store/modal";
const modalStore = useModalStore();
const { openModal, closeModal } = modalStore;

const resolveCompanyId = async () => {
  if (!usersStore.userdata || (!usersStore.userdata.id && !usersStore.userdata._id)) {
    try { await usersStore.getCompanyData() } catch {}
  }
  return usersStore.userdata?.id || usersStore.userdata?._id || null
}

const fetchApprovedUsers = async () => {
  try {
    loading.value = true
    error.value = null

    const companyId = await resolveCompanyId()
    if (!companyId) {
      error.value = 'Не удалось определить компанию.'
      return
    }

    const { data } = await api.get(`/approved-users/${companyId}`)
    vacanciesWithSailors.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e?.response?.data?.detail || 'Ошибка при загрузке'
  } finally {
    loading.value = false
  }
}

const getSailorFullName = (sailor) => {
  const info = sailor.info || {}
  return (
    [info.last_name, info.first_name, info.patronymic].filter(Boolean).join(' ') ||
    [sailor.last_name, sailor.first_name, sailor.patronymic].filter(Boolean).join(' ') ||
    sailor.full_name || sailor.name || 'Без имени'
  )
}

const getSalaryText = (sailor) => {
  const info = sailor.info || {}
  const min = sailor.min_salary || info.min_salary
  const max = sailor.max_salary || info.max_salary
  const currency = sailor.currency || info.currency || 'USD'
  if (min && max) return `${min} - ${max} ${currency}`
  if (min) return `${min} ${currency}`
  return ''
}

const getLocationText = (sailor) => {
  const info = sailor.info || {}
  const country = sailor.country || info.country
  const city = sailor.city || info.city
  return country || city ? [city, country].filter(Boolean).join(', ') : ''
}

const getVesselsText = (sailor) => {
  const info = sailor.info || {}
  const vessels =
    sailor.vessels ||
    sailor.vessel_types ||
    info.vessels ||
    info.vessel_types ||
    []
  return Array.isArray(vessels) && vessels.length ? vessels.join(', ') : ''
}

const getPhones = (sailor) => {
  const info = sailor.info || {}
  const phones = [
    sailor.phone_number,
    info.phone_number,
    sailor.phone,
    info.phone,
    sailor.extra_phone,
    info.extra_phone,
  ].filter(Boolean)
  return [...new Set(phones)]
}

const gotoSailor = (sailor_id) => {
  window.location.href = `/sailor/${sailor_id}`;
};

const deleteSailor = async (sailor_id, vacancy_id) => {
  openModal('loader')
  try {
    await api.post(`/company-vacancy-incoming-response/${vacancy_id}/cancel/${sailor_id}`);
    fetchApprovedUsers()
  } catch (e) {
    console.error(e);
    throw e;
  }
  closeModal('loader')
};

onMounted(() => {
  document.body.classList.add('bg-white')
  fetchApprovedUsers()
})
</script>

<style lang="scss" scoped>

.vacancy-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.vacancy-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 10px;
  border: 1px solid #868686;
  margin-bottom: 20px;
  padding: 10px;
}
.vacancy-group-header{
    margin-top: -30px;
    margin-left: -11px;
    height: 40px;
}

.vacancy-group-title {
  font-size: 20px;
  font-weight: 600;
  height: 100%;
  line-height: 40px;
  width: auto;
  display:inline-block;
  padding-inline: 30px;
  background-color: #585858;
  color: white;
}

.sailor_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px 20px;
  padding-top: 20px;
}

.sailor_list_single{
  grid-template-columns: 1fr;
}

.not-allowed-sailor {
  font-size: 20px;
  color: grey;
}

/* CARD BORDER BY STATUS */
.card-red {
  border: 2px solid #9b2719 !important;
}

.card-blue {
  border: 2px solid #3b45a9 !important;
}

.vacancy-dateoff-text{
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  margin-left: -1px;
}



/* STATUS BADGE COLORS */
.status-red {
  background: #9b2719 !important;
  color: #fff !important;
  text-transform: uppercase;
  padding: 8px 25px;
  transform: translateX(-1px);
}

.status-blue {
  background: #3b45a9 !important;
  color: #fff !important;
  text-transform: uppercase;
  padding: 8px 25px;
}
.status-grey {
  background: #6c757d !important;
  color: #fff !important;
  text-transform: uppercase;
  padding: 8px 25px;
}

.vacancy-item-off {
  min-width: 350px;
  padding: 15px;
  background: #fff;
  border: 1px solid #3b45a9;
}

.vacancy__info {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px;
  .vi-item:last-child { grid-column: span 2; }
}
</style>
