<template>
  <ClientOnly>
    <NuxtLayout name="default-hero">
      <div class="main cabinet">
        <div>
          <AfHeaderColor />
        </div>
        <section id="resume">
          <div class="container">
            <div class="tabs">
              <div class="tab-header">
                <a
                  href="#company"
                  class="tab-label clear-tab-label"
                  :class="{ active: activeTab === 'company' }"
                  @click="setActiveTab('company')"
                >
                  О компании
                </a>

                <a
                  href="#ships"
                  class="tab-label clear-tab-label"
                  id="clear-tab-label-ships"
                  :class="{ active: activeTab === 'ships' }"
                  @click="setActiveTab('ships')"
                >
                  Мои суда
                </a>

                <a
                  href="#settings"
                  class="tab-label clear-tab-label"
                  :class="{ active: activeTab === 'settings' }"
                  @click="setActiveTab('settings')"
                >
                  Другие настройки
                </a>
              </div>
            </div>
          </div>

          <div class="tab-body" v-show="activeTab === 'company'">
            <div class="container">
              <h1 class="title-none">О компании</h1>

              <div class="resume-main resume-main-margin">
                <div v-if="companyProfile.photo_path" class="company-avatar">
                  <input
                    type="file"
                    name="photo_path"
                    id="photo_path_change"
                    accept="image/png, image/jpeg, image/webp"
                    class="hidden-input"
                    @change="upload($event, 'photo_path')"
                  />
                  <img
                    class="avatar"
                    style="position: absolute"
                    :src="createObjectURL(companyProfile.photo_path)"
                    alt="Аватар"
                  />
                  <button
                    @click="changeAvatar()"
                    style="bottom: -61px !important"
                    class="change-av-button header-menu__button"
                  >
                    Выбрать изображение
                  </button>
                  <button
                    v-if="companyProfile.photo_path"
                    class="delete"
                    @click="deleteAvatar()"
                  >
                    Удалить изображение
                  </button>
                </div>
                
                <div v-else class="resume-avatar">
                  <input
                    type="file"
                    name="photo_path"
                    id="photo_path_change"
                    accept="image/png, image/jpeg, image/webp"
                    class="hidden-input"
                    @change="upload($event, 'photo_path')"
                  />
                  <div class="bordered bordered-ct-logo">
                    <img
                      class="avatar-company"
                      id="imgInpPreview"
                      src="assets/img/header/logo-white.png"
                      alt="avatar"
                    />
                    <span id="photo_path_change_inp"
                      >{{ companyProfile.first_name }}<br />{{
                        companyProfile.last_name
                      }}</span
                    >
                    <text>&#9875;</text>
                  </div>
                  <button
                    @click="changeAvatar()"
                    class="change-av-button header-menu__button"
                  >
                    Выбрать изображение
                  </button>
                </div>

                <div>
                  <h2 style="margin: 0 0 20px">Основные данные:</h2>
                  <div class="resume-grid col2">
                    <AfInput
                      place=""
                      label="Название компании"
                      v-model="companyProfile.company_name"
                    />
                    <div class="input">
                      <label>ИНН компании</label>
                      <span class="company_inn">{{
                        companyProfile.company_inn
                      }}</span>
                    </div>
                    <AfInput
                      place=""
                      label="Адрес компании"
                      v-model="companyProfile.company_address"
                    />

                    <div class="resume-content-all">
                      <h2 style="margin: 0">Контактная информация вакансий:</h2>
                      <p>
                        Информация, которая будет автоматически заполняться при
                        создании вакансии. Принявшие предложение о вакансии
                        моряки, будут видеть данную информацию.
                      </p>
                    </div>

                    <AfInput
                      place=""
                      label="ФИО контактного лица"
                      v-model="companyProfile.f_i_o"
                    />
                    <AfInput
                      place=""
                      label="E-mail"
                      v-model="companyProfile.email"
                    />
                    <AfInput
                      place=""
                      label="Телефон №1"
                      v-model="companyProfile.phone1"
                    />
                    <AfInput
                      place=""
                      label="Телефон №2"
                      v-model="companyProfile.phone2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="resume-buttons">
              <button @click="saveProfile()" class="primary">Сохранить</button>
              <button @click="resetProfile()" class="secondary">
                Сбросить
              </button>
            </div>
          </div>
          <div class="tab-body" v-show="activeTab === 'ships'">
            <div class="container">
              <div class="suda">
                <div class="suda-top">
                  <div
                    class="suda-top__item js-open-modal"
                    @click="toggleModal('existingship')"
                  >
                    <div class="suda-top__plus">+</div>
                    <!-- /.suda-top__plus -->
                    <div class="suda-top__content">
                      <div class="suda-top__title">
                        Добавить судно из «Морского флота»
                      </div>
                      <!-- /.suda-top__title -->
                      <div class="suda-top__text">
                        Выберите судно из нашей базы данных
                      </div>
                      <!-- /.suda-top__text -->
                    </div>
                    <!-- /.suda-top__content -->
                  </div>
                  <!-- /.suda-top__item -->
                  <div
                    class="suda-top__item js-open-modal"
                    @click="toggleModal('newship')"
                  >
                    <div class="suda-top__plus">+</div>
                    <!-- /.suda-top__plus -->
                    <div class="suda-top__content">
                      <div class="suda-top__title">Добавить судно в ручную</div>
                      <!-- /.suda-top__title -->
                      <div class="suda-top__text">
                        Заполните данные по судну, которого нет в нашей базе
                      </div>
                      <!-- /.suda-top__text -->
                    </div>
                    <!-- /.suda-top__content -->
                  </div>
                  <!-- /.suda-top__item -->
                </div>
                <!-- /.suda-top -->

                <div v-show="registeredShipS" class="suda-part">
                  <h3 class="suda-title">Мои суда:</h3>
                  <!-- /.suda-title -->

                  <div class="suda-table-block">
                    <table class="suda-table">
                      <tbody>
                        <tr
                          v-for="(item, i) in registeredShip"
                          :key="'reg-ship-' + i"
                          class="suda-tr"
                        >
                          <td class="suda-td">
                            <div class="suda-td__number">{{ i + 1 }}</div>
                            <!-- /.suda-td__number -->
                          </td>
                          <!-- /.suda-td -->
                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">Судно:</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.vessel_name ? item.vessel_name : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">IMO</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.imo ? item.imo : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">Тип судна:</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.ship_type ? item.ship_type : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">
                                Год постройки:
                              </div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.year_built ? item.year_built : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->
                          <td class="suda-td">
                            <div
                              @click="
                                toggleModal('shipinfo');
                                setactiveship(item);
                              "
                              class="vacancy__button red js-open-modal"
                            >
                              <img
                                src="assets/img/dop-page/red-info.svg"
                                alt=""
                              />
                              Подробнее
                            </div>
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div
                              @click="removeship(item)"
                              class="vacancy__button red"
                            >
                              <img src="assets/img/suda/delete.svg" alt="" />
                              Удалить
                            </div>
                          </td>
                          <!-- /.suda-td -->
                        </tr>
                      </tbody>
                    </table>
                    <!-- /.suda-table -->
                  </div>
                  <!-- /.suda-table-block -->
                </div>
                <!-- /.suda-part -->

                <div v-show="onModerateShipS" class="suda-part">
                  <h3 class="suda-title">Суда на модерации:</h3>
                  <!-- /.suda-title -->

                  <div class="suda-item">
                    <img
                      src="assets/img/suda/icon.png"
                      alt="image"
                      class="suda-item__img"
                    />
                    <div class="suda-item__text">
                      Судна, которых нет в нашей базе, проходят модерацию в
                      течении 24 часов. Наши специалисты проверят информацию, а
                      при неточностях, проведут изменения. В случае
                      возниконвения вопросов пожалуйста
                      <a class="suda-item__link">воспользуйтесь этой формой.</a>
                    </div>
                    <!-- /.suda-item__text -->
                  </div>
                  <!-- /.suda-item -->
                  <div class="suda-table-block">
                    <table class="suda-table">
                      <tbody>
                        <tr
                          v-for="(item, i) in onModerateShip"
                          :key="'mod-ship-' + i"
                          class="suda-tr"
                        >
                          <td class="suda-td">
                            <div class="suda-td__number">{{ i + 1 }}</div>
                            <!-- /.suda-td__number -->
                          </td>
                          <!-- /.suda-td -->
                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">Судно:</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.vessel_name ? item.vessel_name : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">IMO</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.imo ? item.imo : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">Тип судна:</div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.ship_type ? item.ship_type : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div class="suda-td__item">
                              <div class="suda-td__subtitle">
                                Год постройки:
                              </div>
                              <!-- /.suda-td__subtitle -->
                              <div class="suda-td__text">
                                {{ item.year_built ? item.year_built : "-" }}
                              </div>
                              <!-- /.suda-td__text -->
                            </div>
                            <!-- /.suda-td__item -->
                          </td>
                          <!-- /.suda-td -->
                          <td class="suda-td">
                            <div
                              @click="
                                toggleModal('shipinfo');
                                setactiveship(item);
                              "
                              class="vacancy__button red js-open-modal"
                              data-modal="5"
                            >
                              <img
                                src="assets/img/dop-page/red-info.svg"
                                alt=""
                              />
                              Подробнее
                            </div>
                          </td>
                          <!-- /.suda-td -->

                          <td class="suda-td">
                            <div
                              @click="removemodship(item)"
                              class="vacancy__button red"
                            >
                              <img src="assets/img/suda/delete.svg" alt="" />
                              Отменить<br />
                              запрос
                            </div>
                          </td>
                          <!-- /.suda-td -->
                        </tr>
                        <!-- /.suda-tr -->
                      </tbody>
                    </table>
                    <!-- /.suda-table -->
                  </div>
                  <!-- /.suda-table-block -->
                </div>
                <!-- /.suda-part -->
              </div>
            </div>
            <div class="resume-buttons">
              <button @click="saveProfile()" class="primary">Сохранить</button>
              <button @click="resetProfile()" class="secondary">
                Сбросить
              </button>
            </div>
          </div>
          <div class="tab-body" v-show="activeTab === 'settings'">
            <div class="container">
              <h1>Контактные данные аккаунта и уведомления</h1>

              <div class="resume-grid col2 resume-contact-setting">
                <div class="resume-contact">
                  <div class="resume-contact__icon">
                    <img src="assets/img/resume/icon-phone.png" alt="phone" />
                  </div>
                  <div class="resume-contact__content completed">
                    {{ userInfo.info.phone_number }}
                    <img src="assets/img/resume/check.svg" alt="done" />
                  </div>
                </div>
                <div class="resume-contact__second">
                  <!-- <AfCheckbox
                    v-model="companyProfile.notification_settings.send_sms"
                    :linkText="'уведомления на телефон'"
                    :descText="'Присылайте мне '"
                  /> -->
                </div>

                <div class="resume-contact">
                  <div class="resume-contact__icon">
                    <img src="assets/img/resume/icon-mail.png" alt="phone" />
                  </div>
                  <div v-if="!is_verified" class="resume-contact__content">
                    {{ userInfo.info.email }}
                    <a @click="approveingEmail(userInfo.info.email)"
                      >Подтвердить</a
                    >
                  </div>
                  <div v-else class="resume-contact__content verified">
                    {{ userInfo.info.email }}
                    <img src="assets/img/resume/check.svg" alt="done" />
                  </div>
                </div>

                <div class="resume-contact__second">
                  <AfCheckbox
                    v-model="companyProfile.notification_settings.send_email"
                    :linkText="'уведомления на почту'"
                    :descText="'Присылайте мне '"
                  />
                </div>

                <div class="resume-contact">
                  <div class="resume-contact__icon">
                    <img src="assets/img/resume/icon-tg.png" alt="phone" />
                  </div>

                  <TelegramConnect v-if="!is_tg" />

                  <div
                    v-if="!is_tg"
                    style="cursor: pointer"
                    class="resume-contact__content empty forTg"
                  >
                    Подключить Telegram
                  </div>
                  <div
                    v-if="is_tg"
                    class="resume-contact__content empty tg-approved"
                    style="cursor: default"
                  >
                    Telegram подключен<img
                      src="assets/img/resume/check.svg"
                      alt="done"
                    />
                  </div>
                </div>
                <div class="resume-contact__second">
                  <AfCheckbox
                    v-model="companyProfile.notification_settings.send_telegram"
                    :linkText="'уведомления в Telegram'"
                    :descText="'Присылайте мне '"
                  />
                </div>
              </div>

              <h2 class="with-subtitle">Рассылка</h2>

              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  v-model="
                    companyProfile.notification_settings.mailing_notification
                  "
                />
                <span class="checkmark"></span>
                Хочу получать <a href="#">рассылку о новых моряках</a>, по
                должностям, соответствующих актуальным (действующим)<br />
                вакансиям компании
              </label>

              <h2>Безопасность</h2>
              <button @click="tgconnect"> telegram connected</button>

              <div class="resume-password">
                <button
                  class="resume-action-btn"
                  @click="toggleModal('changephone')"
                >
                  <div class="resume-action-left" v-if="false">
                    <img src="assets/img/resume/icon-phone.png" alt="phone" />
                    <span>Изменить номер телефона</span>
                  </div>
                </button>
                <!-- DISCONNECT TELEGRAM -->
                <button
                  class="resume-action-btn"
                  @click="toggleModal('changeinfo')"
                >
                  <div class="resume-action-left">
                    <img src="assets/img/resume/icon-mail.png" alt="email" />
                    <span>Изменить Email</span>
                  </div>
                </button>

                <!-- CHANGE PHONE -->

                <button class="resume-action-btn" @click="openModal('approveTGDisconnect')">
                  <div class="resume-action-left">
                  <img src="assets/img/resume/icon-tg.png" alt="telegram" />
                  <span>Отключить Telegram</span>
                  </div>
                </button>
                <!-- <div class="resume-password__input">
                  <div class="resume-password__icon">
                    <img src="assets/img/resume/icon-pass.png" alt="pass"/>
                  </div>
                  <input type="password"/>
                </div>
                <button @click="toggleModal('changepassword')">Сменить пароль <strong>⭢</strong></button> -->
              </div>
            </div>

            <div class="resume-buttons">
              <button @click="saveProfile()" class="primary">Сохранить</button>
              <button @click="resetProfile()" class="secondary">
                Сбросить
              </button>
            </div>
          </div>
        </section>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["company"],
});
import { ref } from "vue";
import api from "@/api/api";
import TelegramConnect from "~/components/TelegramConnect.vue";
import AfInput from "@/components/uikit/AfInput";
import AfCheckbox from "@/components/uikit/AfCheckbox2";

import { useUsersStore } from "~/store/useUserStore";

const userStore = useUsersStore();

const { userInfo, isTg } = storeToRefs(userStore);
import { useGlobalSettings } from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const { getCurrentShip } = storeToRefs(globalSettings);

import { useModalStore } from "~/store/modal";

const { closeModal, openModal, toggleModal } = useModalStore();

const profile = ref(null);

let is_verified = ref(false);
let is_tg = ref(false);

const deletedFile = ref("");

const activeTab = ref("company");

function setActiveTab(tab) {
  activeTab.value = tab;
}

const approveingEmail = async (email) => {
  openModal("confirmemail");
  try {
    const response = await api.post("/change_password", {
      email: email,
      type: "confirm_email",
    });
  } catch (error) {
    console.error("Error during verification:", error);
  }
};

const url = useRequestURL();
console.log("full url:", url.href);
if (url.href.includes("ships")) {
  setActiveTab("ships");
  activeTab.value = "ships";
} else if (url.href.includes("settings")) {
  setActiveTab("settings");
  activeTab.value = "settings";
} else {
  setActiveTab("company");
  activeTab.value = "company";
}

async function getProfile() {
  try {
    const { data } = await api.get(`/profile`);
    const companyData = await api.post("/getVerification", {
      email: JSON.parse(localStorage.getItem("global/user") || "{}")?.decemail,
    });
    is_verified.value = companyData.data.is_verified;
    is_tg.value = companyData.data.is_tg;

    console.log(companyVerification.value.is_tg);
    console.log(companyVerification.value.is_verified);

    profile.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  document.body.classList.add("bg-white");

  const hash = window.location.hash;

  if (hash === "#ships") {
    setActiveTab("ships");
    $(".clear-tab-label").removeClass("active");
    $("#clear-tab-label-ships").addClass("active");
  } else if (hash === "#settings") {
    setActiveTab("settings");
    $(".clear-tab-label").removeClass("active");
    // Optional: add id="clear-tab-label-settings" to your settings tab in template
    $("#clear-tab-label-settings").addClass("active");
  } else {
    setActiveTab("company");
    $(".clear-tab-label").removeClass("active");
    // Optional: add id="clear-tab-label-company" if you want consistent highlighting
    $("#clear-tab-label-company").addClass("active");
  }

  getProfile();
});

const registeredShip = ref(null);
const onModerateShip = ref(null);
const registeredShipS = ref(false);
const onModerateShipS = ref(false);
const currentShip = ref({
  dwt: "-",
  imo: "-",
  kw: "-",
  length: "-",
  ship_type: "-",
  vessel_name: "-",
  width: "-",
  year_built: "-",
  _id: "",
});
const { $uploadFile, $deleteFile } = useNuxtApp();
const companyProfile = ref({
  photo_path: null,
  avatar: null,
  media_file: null,
  company_name: "",
  company_address: "",
  f_i_o: "",
  email: "",
  phone1: "",
  phone2: "",
  is_tg: false,
  is_verified: false,
  notification_settings: {
    send_email: true,
    send_sms: true,
    send_telegram: true,
    mailing_notification: true,
  },
});

const upload = (e, key) => {
  const file = e.target.files[0];
  companyProfile.value[key] = file;
  document.getElementById("photo_path_change_inp").style.display = "none";
};

const createObjectURL = (file) => {
  return file && file instanceof File ? URL.createObjectURL(file) : file;
};

const init = async () => {
  try {
    await api
      .get("/navy/registered?email=" + userInfo.value.info.email)
      .then((data) => {
        let regShips = [];
        let modShips = [];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].is_active) {
            regShips.push(data.data[i]);
            registeredShipS.value = true;
          } else {
            modShips.push(data.data[i]);
            onModerateShipS.value = true;
          }
        }
        registeredShip.value = regShips;
        onModerateShip.value = modShips;
      });
  } catch (e) {}

  try {
    await api.get("/company/profile").then((data) => {
      companyProfile.value = data.data;
    });
  } catch (e) {}
};
init();

const setactiveship = async (item) => {
  globalSettings.setCurrentShip(item);
};

const removeship = async (item) => {
  try {
    await api
      .put(
        "/navy/remove_existing?id=" +
          item._id +
          "&email=" +
          userInfo.value.info.email
      )
      .then((data) => {
        window.location.reload();
      });
  } catch (e) {}
};
const removemodship = async (item) => {
  try {
    await api
      .put(
        "/navy/remove_moderate?id=" +
          item._id +
          "&email=" +
          userInfo.value.info.email
      )
      .then((data) => {
        window.location.reload();
      });
  } catch (e) {}
};

const prepareDataForSending = (formData) => {
  const preparedData = {
    ...formData.value,
    positions: formData.value.positions,
    worked: formData.value.worked,
  };

  return preparedData;
};
  const tgconnect = async () => {
  const localUser = JSON.parse(localStorage.getItem("global/user") || "{}");
  const email = localUser?.decemail;

  if (!email) {
    console.error("❌ Email not found in localStorage, cannot connect Telegram.");
    return;
  }

  const tgId = userStore?.tg_id || "7386545535";

  try {
    // 1️⃣ Connect Telegram ID to user
    await api.post("/connect_telegram", {
      email,
      tg_id: tgId,
    });

    // 2️⃣ Send welcome message with disconnect button
    await api.post("/telegram_message", {
      email,
      type: "tg_connection",
    });

    console.log("✅ Telegram connected and welcome message sent");

  } catch (err) {
    console.error("TG connect error:", err);
    openModal("telegramWarning");
  }
};


const saveProfile = async () => {
  const dataToSubmit = prepareDataForSending(companyProfile);
  if (dataToSubmit["photo_path"] instanceof File) {
    const fileUrl = await $uploadFile(dataToSubmit["photo_path"]).then(
      (res) => res
    );
    dataToSubmit.photo_path = fileUrl;
    companyProfile.value.photo_path = fileUrl;
  }

  console.log("AAAAAAAAAAAAAAAAAAAAA", dataToSubmit);

  // await Promise.all(FILE_KEYS.map(async fileKey => {
  //   if (dataToSubmit[fileKey] instanceof File) {
  //     const fileUrl = await $uploadFile(companyProfile[fileKey]).then((res) => res)
  //     dataToSubmit[fileKey] = fileUrl
  //   }
  // }))

  try {
    await api.put("/company/profile", dataToSubmit).then(async (data) => {
      if (deletedFile.value) {
        await $deleteFile(deletedFile.value);
      }
      //window.location.reload();
    });
  } catch (e) {
    console.log("company profile save error: ", e);
  }
};
const resetProfile = async () => {
  window.location.reload();
};

const deleteAvatar = async () => {
  try {
    deletedFile.value = companyProfile.value.photo_path;
    companyProfile.value.photo_path = "";
  } catch (error) {
    console.error("Error deleting media file:", error);
  }
};

const changeAvatar = () => {
  document.getElementById("photo_path_change").click();
};
</script>

<style lang="scss" scoped>
.tab-label.tactive {
  border-bottom: 4px solid #3b45a9;
  color: #3b45a9;
}

.tab-body {
  display: block;
}
.resume-contact {
  position: relative;
}

.company_inn {
  display: block;
  background: none;
  border: none;
  border-bottom: solid 2px #e6e6ed;
  padding: 10px 0 16px 0;
  font-family: "Myriad Pro";
  font-size: 20px;
  color: #c3c3c3;
  width: 100%;
  transition: 1s;
  cursor: default;
  min-height: 23px;
}

.avatar-wrapper {
  .container {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
  }

  .file-container {
    position: relative;
    cursor: pointer;
  }

  form {
    width: 500px !important;
    position: absolute;
    top: 55%;
    left: 0;
    margin-top: -100px;
    width: 100%;
    height: 90px;
    border-radius: 5px;
    border: 1.5px dashed #a0a0a0;
    cursor: pointer;
  }

  form div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  form input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
  }

  form button {
    margin: 0;
    color: #fff;
    background: #16a085;
    border: none;
    width: 508px;
    height: 35px;
    margin-top: -20px;
    margin-left: -4px;
    border-radius: 4px;
    border-bottom: 4px solid #117a60;
    transition: all 0.2s ease;
    outline: none;
  }

  form button:hover {
    background: #149174;
    color: #0c5645;
  }

  form button:active {
    border: 0;
  }

  .images {
    position: relative;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .images-lists {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
  }

  .image-container {
    padding: 4px;
    border: 0.5px solid #a0a0a0;
    border-radius: 10px;
  }

  .image-style {
    height: 150px;
    width: 150px;
    object-fit: cover;
  }

  .cross-icon {
    position: absolute;
    top: 0%;
    right: 0;
    cursor: pointer;
  }
}

.resume-avatar .bordered.bordered-ct-logo {
  background: #3b45a9;
  padding: 0px;
  width: 202px;
  height: 202px;
  position: relative;
}

.hidden-input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.resume-avatar {
  position: relative;
  width: 202px;
  height: 202px;
}

.upload {
  position: relative;
}

.avatar {
  height: 202px;
  width: 202px;
  border-radius: 50%;
  object-fit: cover;
}

.resume-avatar {
  .bordered.bordered-ct-logo {
    img {
      position: absolute;
      top: -15px;
      display: flex;
      width: 34%;
      left: calc(50% - 42px);
      height: 76px;
      opacity: 0.8;
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
      bottom: 15px;
      left: calc(50% - 25px);
      font-size: 34px;
      filter: grayscale(1) brightness(2);
      opacity: 0.6;
    }
  }
}

.change-av-button {
  bottom: -88px;
}

.resume-contact__content.tg-approved {
  background-color: #3b45a9;
  color: #fff;
}

.verified {
  background-color: #3b45a9;
  color: #fff;
}

.delete {
  position: absolute;
  bottom: -120px;
  left: 0px;
  width: 182px;
  height: 17px;
  font-size: 14px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 13px;
  background-color: #9b2719;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #ffffff;
  transition: 0.3s all;
}
.forTg {
  position: relative;
}
.resume-password {
  display: flex;
  flex-direction: column;
}
.resume-action-btn {
  width: 100%;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.2s, border-color 0.2s;
  max-width: 400px;
}

.resume-action-btn:hover {
  background: #f9f9f9;
  border-color: #d3d3d3;
}

.resume-action-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.resume-action-left img {
  width: 22px;
  height: 22px;
}
</style>
