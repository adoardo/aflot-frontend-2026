<template>
  <div :class="{ 'menu-show': isOpen }" class="menu-reg menu-none menu-reg-sailor cabinet" id="reg-about">
    <AfCloseModal modalName="company" />

    <div class="menu-reg-title">Регистрация компании</div>

    <div class="reg-about-top">
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        class="hidden-input"
        @change="upload($event, 'photo_path')"
      />

      <img
        v-if="formData.photo_path"
        class="avatar"
        :src="createObjectURL(formData.photo_path)"
        alt="аватар"
      />
      <img v-else src="assets/img/menu/logo-about.png" alt="image" />

      <div class="reg-about-inputs">
        <div class="reg-about-intop">
          <AfInput
            place="Название компании"
            label="Название компании <text>*</text>"
            id="company_name"
            v-model="formData.company_name"
            :error="v$.company_name.$error && (v$.company_name.required.$invalid || v$.company_name.minLength.$invalid)"
          />

          <AfInput
            place="ИНН"
            label="ИНН компании <text>*</text>"
            id="company_inn"
            type="text"
            v-model="formData.company_inn"
            :maxlength="12"
          />

          <!-- REGION (fixed: same logic as sailor) -->
          <div class="input region-field" ref="regionFieldRef" @pointerdown.stop>
            <label>Регион</label>

            <div class="region-select" @pointerdown.stop="openRegionDropdown">
            <input
              type="text"
              v-model="regionSearch"
              placeholder="Начните вводить регион"
              @focus="openRegionDropdown"
              @input="openRegionDropdown"
              @pointerdown.stop
            />
              <span class="chevron">▾</span>
            </div>

            <div
              v-if="showRegionDropdown"
              class="resume-status__dropdown region-dropdown"
              @pointerdown.stop
            >
              <div
                v-for="r in filteredRegions"
                :key="regionKey(r)"
                class="dropdown-item"
                @pointerdown.prevent="selectRegion(r)"
              >
                {{ regionLabel(r) }}
              </div>

              <div v-if="(filteredRegions?.length || 0) === 0" class="dropdown-empty">
                Ничего не найдено
              </div>
            </div>
          </div>
          <!-- /REGION -->
        </div>
      </div>
    </div>

    <div class="reg-about-subtitle">
      Контактная информация:
    </div>

    <div class="resume-grid cabinet">
      <AfInput
        place="Почта"
        label="Email <text>*</text>"
        type="email"
        id="email_input"
        v-model="formData.email"
        :showCheckbox="true"
        v-model:checkboxValue="formData.notification_settings.send_email"
        :error="v$.email.$error && (v$.email.required.$invalid || v$.email.minLength.$invalid)"
        :note="noteData.email"
      />

      <AfInput
        place="Телефон"
        label="Номер телефона <text>*</text>"
        type="tel"
        id="phone_input"
        v-model="formData.phone_number"
        :showCheckbox="true"
        v-model:checkboxValue="formData.notification_settings.send_sms"
        :error="v$.phone_number.$error && (v$.phone_number.required.$invalid || v$.phone.minLength.$invalid)"
        :note="noteData.phone"
      />

      <AfInput
        place="Ник в telegram"
        label="Ник в telegram"
        type="email"
        id="telegram_input"
        v-model="formData.telegram"
        :showCheckbox="true"
        v-model:checkboxValue="formData.notification_settings.send_telegram"
        :error="v$.telegram.$error && v$.telegram.required.$invalid"
        :note="noteData.telegram"
      />

      <AfInput
        place="Иванов"
        label="Фамилия <text>*</text>"
        id="family_input"
        v-model="formData.first_name"
        :error="v$.first_name.$error && (v$.first_name.required.$invalid || v$.first_name.minLength.$invalid)"
      />

      <AfInput
        place="Иван"
        label="Имя <text>*</text>"
        id="name_input"
        v-model="formData.last_name"
        :error="v$.last_name.$error && (v$.last_name.required.$invalid || v$.last_name.minLength.$invalid)"
      />

      <AfInput
        place="Иванович"
        label="Отчество"
        id="lastname_input"
        v-model="formData.patronymic"
        :error="v$.patronymic.$error && v$.patronymic.required.$invalid"
      />
    </div>

    <div v-if="(isVk === false && isTg === false)" class="reg-sailor-inputs">
      <AfInputPassword
        v-model="formData.password"
        title="Укажите пароль"
        :errormsg="noteData.passno"
        :error="v$.password.$error && (v$.password.required.$invalid || v$.password.minLength.$invalid)"
      />
      <AfInputPassword
        v-model="formData.confirm_password"
        title="Подтвердите пароль"
        :errormsg="noteData.passrep"
        :error="!v$.password.$error && (formData.password != formData.confirm_password)"
      />
    </div>

    <div class="reg-sailor-end">
      <div class="resume-contact__second">
        <AfCheckbox v-model="formData.notification_settings.mailing_notification" />
      </div>

      <AfGroupBtn @register="handleRegistration()" />
    </div>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeAllDropdowns(); closeModal('company')"
  ></div>
</template>

<script setup>
import api from "@/api/api";
import AfInput from "@/components/uikit/AfInput";
import AfInputPassword from "@/components/uikit/AfInputPassword";
import AfCheckbox from "@/components/uikit/AfCheckbox";
import AfGroupBtn from "@/components/uikit/AfGroupBtn";
import AfCloseModal from "@/components/uikit/AfCloseModal";

import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import { useModalStore } from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";
import { useGlobalSettings } from "~/store/useGlobalSettings";
import { useUsersStore } from "~/store/useUserStore";

import { storeToRefs } from "pinia";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

const globalSettings = useGlobalSettings();
const { getAfRegionsRussia } = storeToRefs(globalSettings);

const { closeModal, openModal, openModalCommon } = useModalStore();

const userStore = useUsersStore();
const { isTg, isVk, authError } = storeToRefs(userStore);

const { $uploadFile } = useNuxtApp();

const props = defineProps({
  isOpen: { type: Boolean },
});

watch(() => props.isOpen, watchScrollModal);

// --------------------- REGION (same as sailor) ---------------------
const showRegionDropdown = ref(false);
const regionSearch = ref("");
const regionFieldRef = ref(null);

const toArray = (v) => (Array.isArray(v) ? v : []);

const regions = computed(() => {
  const src = getAfRegionsRussia.value;
  const first = src?.[0];
  if (Array.isArray(first?.option_values)) return first.option_values;
  if (Array.isArray(src?.option_values)) return src.option_values;
  if (Array.isArray(src)) return src;
  return [];
});
console.log(regions , "regions")

const regionLabel = (r) =>
  typeof r === "string" ? r : r?.name ?? r?.title ?? r?.label ?? "";

const regionKey = (r) => (typeof r === "string" ? r : r?.id ?? regionLabel(r));

const filteredRegions = computed(() => {
  const list = toArray(regions.value); // ВСЕГДА []
  const q = (regionSearch.value || "").trim().toLowerCase();
  if (!q) return list;
  return list.filter((r) => regionLabel(r).toLowerCase().includes(q));
});

const openRegionDropdown = () => {
  showRegionDropdown.value = true;
};

const selectRegion = (r) => {
  const val = regionLabel(r);
  formData.value.company_address = val;
  regionSearch.value = val;
  showRegionDropdown.value = false;
};


const closeAllDropdowns = () => {
  showRegionDropdown.value = false;
};

const onOutsidePointerDown = (e) => {
  const regionEl = regionFieldRef.value;
  const clickedInRegion = regionEl?.contains?.(e.target);
  if (!clickedInRegion) showRegionDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("pointerdown", onOutsidePointerDown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onOutsidePointerDown, true);
});
// --------------------- /REGION ---------------------

const formData = ref({
  photo_path: null,
  avatar: null,
  media_file: null,

  email: "",
  password: "",
  confirm_password: "",

  first_name: "",
  last_name: "",
  patronymic: "",
  f_i_o: "",

  phone_number: "",
  phone1: "",
  phone2: "",

  company_name: "",
  company_inn: "",
  company_address: "",

  // IMPORTANT: добавили region, чтобы dropdown реально писал значение в форму
  region: "",

  telegram: "",
  notification_settings: {
    send_email: true,
    send_sms: true,
    send_telegram: true,
    mailing_notification: true,
  },

  telegram_id: "",
  vk_id: "",
  is_vk: false,
  is_tg: false,
});

const noteData = ref({
  email: "указанную почту",
  phone: "указанный номер",
  telegram: "в мессенджере",
  passno: "Укажите пароль (мин. длина 8 символов)",
  passrep: "Пароли не совпадают",
});

const isSameAsPassword = (value) => value === formData.value.password;

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
  company_name: { required, minLength: minLength(4) },
  company_inn: { required, minLength: minLength(8) },
  company_address: { required },
  confirm_password: {
    required,
    sameAsPassword: {
      $validator: isSameAsPassword,
      $message: "Пароли должны совпадать",
    },
  },
  phone_number: { required },
  first_name: { required },
  last_name: { required },
  patronymic: {},
  country: {},
  region: {},
  city: {},
  telegram: {},
};

// FIX: социальная авторизация (refs)
watch([isVk, isTg], ([vk, tg]) => {
  if (vk || tg) {
    rules.password = {};
    rules.confirm_password = {};
  } else {
    rules.password = { required, minLength: minLength(8) };
    rules.confirm_password = {
      required,
      minLength: minLength(8),
      sameAsPassword: {
        $validator: isSameAsPassword,
        $message: "Пароли должны совпадать",
      },
    };
  }
});

const v$ = useVuelidate(rules, formData);

const pickOne = (v) => (Array.isArray(v) ? (v[0] || "") : (v || ""));

const prepareDataForSending = () => {
  const preparedData = { ...formData.value };
  preparedData.company_address = pickOne(preparedData.company_address);
  preparedData.region = pickOne(preparedData.region);
  return preparedData;
};

const handleRegistration = async () => {
  try {
    userStore.setAuthRole("company");

    const dataToSubmit = prepareDataForSending();
    dataToSubmit.f_i_o =
      dataToSubmit.last_name + " " + dataToSubmit.first_name + " " + dataToSubmit.patronymic;

    dataToSubmit.company_inn = dataToSubmit.company_inn.toString();

    v$.value.$touch();

    if (!v$.value.$error) {
      if (dataToSubmit.photo_path instanceof File) {
        const fileUrl = await $uploadFile(dataToSubmit.photo_path);
        dataToSubmit.photo_path = fileUrl;
      }

      if (isVk.value || isTg.value) {
        const data = await userStore.getSocData();

        dataToSubmit.telegram_id = data.telegram_id?.toString?.() || "";
        dataToSubmit.vk_id = data.vk_id?.toString?.() || "";
        dataToSubmit.is_vk = !!data.is_vk;
        dataToSubmit.is_tg = !!data.is_tg;

        const pwd = "TsQ7@66a_" + dataToSubmit.telegram_id + dataToSubmit.vk_id;
        dataToSubmit.password = pwd;
        dataToSubmit.confirm_password = pwd;
        dataToSubmit.username = dataToSubmit.email;

        await userStore.signIn(dataToSubmit, "user");

        if (userStore.authError) {
          openModalCommon(userStore.authError);
        } else {
          await userStore.login(dataToSubmit, "company");
          if (userStore.authError) {
            openModalCommon(userStore.authError);
          } else {
            closeModal("company");
            openModal("modalAuthVerify");
          }
        }
      } else {
        dataToSubmit.username = dataToSubmit.email;

        await userStore.signIn(dataToSubmit, "company");

        if (userStore.authError) {
          openModalCommon(userStore.authError);
        } else {
          await userStore.login(dataToSubmit, "user");
          if (userStore.authError) {
            openModalCommon(userStore.authError);
          } else {
            closeModal("company");
            openModal("modalAuthVerify");
          }
        }
      }
    } else {
      console.log("Validation errors:", v$.value.$errors);
    }

    await api.post("/telegram_message", {
      type: "registration",
      email: dataToSubmit.email,
      fio: `${dataToSubmit.first_name} ${dataToSubmit.last_name} ${dataToSubmit.patronymic || ""}`.trim(),
    });
  } finally {
    userStore.clearAuthError();
  }
};

const upload = async (e, key) => {
  const file = e.target.files[0];
  formData.value[key] = file;
};

const createObjectURL = (file) => {
  return file && file instanceof File ? URL.createObjectURL(file) : file;
};
</script>

<style scoped>
.hidden-input {
  width: 126px;
  height: 128px;
  opacity: 0;
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.reg-about-top {
  position: relative;
}

.avatar {
  height: 126px;
  width: 128px;
  border-radius: 45%;
}

/* optional: like sailor */
.region-select {
  display: flex;
  align-items: center;
}

.resume-status__dropdown.region-dropdown {
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
    border:1px solid #9c9c9c;
    padding:2px;
}

.dropdown-item {
  padding: 6px 0;
  cursor: pointer;
}
</style>
