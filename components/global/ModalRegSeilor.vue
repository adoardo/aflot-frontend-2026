<template>
  <div
    class="menu-reg menu-none menu-reg-sailor cabinet"
    id="reg-sailor"
    :class="{ 'menu-show': isOpen }"
  >
    <AfCloseModal modalName="seilor" />
    <div class="menu-reg-title">Регистрация моряка</div>

    <div class="resume-grid cabinet">
      <AfInput
        place="Почта"
        label="Email <text>*</text>"
        type="email"
        id="email_input"
        v-model="formData.email"
        :showCheckbox="true"
        v-model:checkboxValue="formData.notification_settings.send_email"
        :error="v$.email.$error && (v$.email.required.$invalid || v$.email.email?.$invalid)"
        :note="noteData.email"
      />

      <AfInput
        place="Телефон"
        label="Номер телефона <text>*</text>"
        type="tel"
        id="phone_input"
        v-model="formData.phone_number"
      />

      <AfInput
        place="Ник в telegram"
        label="Ник в telegram"
        type="text"
        id="telegram_input"
        v-model="formData.telegram"
        :showCheckbox="true"
        v-model:checkboxValue="formData.notification_settings.send_telegram"
        :error="v$.telegram.$error && v$.telegram.required?.$invalid"
        :note="noteData.telegram"
      />

      <!-- STATUS -->
      <div class="reg-sailor-status" ref="statusFieldRef">
        <div class="reg-sailor-status__label">Статус моряка</div>

        <div class="reg-sailor-status__select" @click="toggleStatusDropdown">
          <span>{{ formData.tarif ? formData.tarif : "По умолчанию" }}</span>
          <span class="reg-sailor-status__arrow">▾</span>
        </div>

        <div
          v-if="showStatusDropdown"
          class="reg-sailor-status__dropdown"
          @pointerdown.stop
        >
          <label class="custom-checkbox mor-checkbox">
            <input
              class="status-checkbox"
              type="radio"
              name="status_reg"
              value="Ищу работу"
              v-model="formData.tarif"
              @change="onTarifChange"
            />
            <span class="checkmark"></span>
            Ищу работу
          </label>

          <label class="custom-checkbox mor-checkbox">
            <input
              class="status-checkbox"
              type="radio"
              name="status_reg"
              value="Рассмотрю предложение"
              v-model="formData.tarif"
              @change="onTarifChange"
            />
            <span class="checkmark"></span>
            Рассмотрю предложение
          </label>

          <label class="custom-checkbox mor-checkbox">
            <input
              class="status-checkbox"
              type="radio"
              name="status_reg"
              value="Трудоустроен"
              v-model="formData.tarif"
              @change="onTarifChange"
            />
            <span class="checkmark"></span>
            Трудоустроен
          </label>
        </div>
      </div>

      <!-- FIXED: last_name = Фамилия, first_name = Имя -->
      <AfInput
        place="Иванов"
        label="Фамилия <text>*</text>"
        id="family_input"
        v-model="formData.last_name"
        :error="v$.last_name.$error && (v$.last_name.required.$invalid || v$.last_name.minLength?.$invalid)"
      />

      <AfInput
        place="Иван"
        label="Имя <text>*</text>"
        id="name_input"
        v-model="formData.first_name"
        :error="v$.first_name.$error && (v$.first_name.required.$invalid || v$.first_name.minLength?.$invalid)"
      />

      <AfInput
        place="Иванович"
        label="Отчество"
        id="patronymic_input"
        v-model="formData.patronymic"
        :error="v$.patronymic.$error && v$.patronymic.required?.$invalid"
      />

      <AfInput
        place="Россия"
        label="Страна (где находитесь)"
        id="country_input"
        v-model="formData.country"
        :error="v$.country.$error && v$.country.required?.$invalid"
      />

      <!-- REGION (your custom search dropdown kept) -->
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

          <div v-if="filteredRegions.length === 0" class="dropdown-empty">
            Ничего не найдено
          </div>
        </div>
      </div>

      <AfInput
        place=""
        label="Город"
        id="city_input"
        v-model="formData.city"
        :error="v$.city.$error && v$.city.required?.$invalid"
      />
    </div>

    <AfDropDox
      v-model="formData.positions"
      :options-list="getAfJobs"
      title="Должность, которую рассматриваете (выбор из списка)"
    />

    <AfDropDox
      v-model="formData.worked"
      :options-list="getAfShips"
      title="Работал на судах (выбрать типа судов из списка)"
    />

    <div v-if="!isVk.value && !isTg.value" class="reg-sailor-inputs">
      <AfInputPassword
        v-model="formData.password"
        title="Укажите пароль"
        :errormsg="noteData.passno"
        :error="v$.password.$error && (v$.password.required?.$invalid || v$.password.minLength?.$invalid)"
      />

      <AfInputPassword
        v-model="formData.confirm_password"
        title="Подтвердите пароль"
        :errormsg="noteData.passrep"
        :error="!v$.password.$error && formData.password !== formData.confirm_password"
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
    @click="closeAllDropdowns(); closeModal('seilor'); userStore.resetSocialsAuth()"
  ></div>
</template>

<script setup>
import api from "@/api/api";

import AfInput from "@/components/uikit/AfInput";
import AfInputPassword from "@/components/uikit/AfInputPassword";
import AfCheckbox from "@/components/uikit/AfCheckbox";
import AfGroupBtn from "@/components/uikit/AfGroupBtn";
import AfCloseModal from "@/components/uikit/AfCloseModal";
import AfDropDox from "@/components/uikit/AfDropDox";

import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import { useModalStore } from "~/store/modal";
import { useUsersStore } from "~/store/useUserStore";
import watchScrollModal from "~/utils/watchScrollModal";
import { storeToRefs } from "pinia";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

import { useGlobalSettings } from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const { getAfShips, getAfJobs, getAfRegionsRussia } = storeToRefs(globalSettings);

const userStore = useUsersStore();
const { closeModal, openModal, openModalCommon } = useModalStore();

const props = defineProps({
  isOpen: { type: Boolean },
});

const noteData = ref({
  email: "указанную почту",
  phone: "указанный номер",
  telegram: "в мессенджере",
  passno: "Укажите пароль (мин. длина 8 символов)",
  passrep: "Пароли не совпадают",
});

const showStatusDropdown = ref(false);

const showRegionDropdown = ref(false);
const regionSearch = ref("");

const regionFieldRef = ref(null);
const statusFieldRef = ref(null);

const { isTg, isVk, authError } = storeToRefs(userStore);

let tmppsw = "";

const formData = ref({
  email: "",
  password: tmppsw,
  confirm_password: tmppsw,
  phone_number: "",
  first_name: "",
  last_name: "",
  patronymic: "",
  country: "",
  region: "",
  city: "",
  telegram: "",
  positions: [],
  worked: [],
  tarif: "Ищу работу",
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

const isSameAsPassword = (value) => value === formData.value.password;

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
  confirm_password: {
    required,
    minLength: minLength(8),
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
  tarif: {},
};

// Correctly react to social auth flags (refs!)
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

watch(authError, () => {});
watch(() => props.isOpen, watchScrollModal);

// --------------------- STATUS DROPDOWN ---------------------
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
  if (showStatusDropdown.value) showRegionDropdown.value = false;
};

const onTarifChange = () => {
  showStatusDropdown.value = false;
};

// --------------------- REGION LOGIC (kept) ---------------------
const regions = computed(() => {
  const first = getAfRegionsRussia.value?.[0];
  return Array.isArray(first?.option_values) ? first.option_values : [];
});
console.log("Regions loaded:", regions.value);

const regionLabel = (r) =>
  typeof r === "string" ? r : r?.name ?? r?.title ?? r?.label ?? "";

const regionKey = (r) => (typeof r === "string" ? r : r?.id ?? regionLabel(r));

const filteredRegions = computed(() => {
  const q = regionSearch.value.trim().toLowerCase();
  if (!q) return regions.value;
  return regions.value.filter((r) => regionLabel(r).toLowerCase().includes(q));
});

const openRegionDropdown = () => {
  showRegionDropdown.value = true;
  showStatusDropdown.value = false;
};

const selectRegion = (r) => {
  const val = regionLabel(r);
  formData.value.region = val;
  regionSearch.value = val;
  showRegionDropdown.value = false;
};

// --------------------- CLOSE ON OUTSIDE CLICK ---------------------
const closeAllDropdowns = () => {
  showRegionDropdown.value = false;
  showStatusDropdown.value = false;
};

const onOutsidePointerDown = (e) => {
  const regionEl = regionFieldRef.value;
  const statusEl = statusFieldRef.value;

  const clickedInRegion = regionEl?.contains?.(e.target);
  const clickedInStatus = statusEl?.contains?.(e.target);

  if (!clickedInRegion) showRegionDropdown.value = false;
  if (!clickedInStatus) showStatusDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("pointerdown", onOutsidePointerDown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onOutsidePointerDown, true);
});

// --------------------- SUBMIT ---------------------
const prepareDataForSending = () => {
  const region = Array.isArray(formData.value.region)
    ? formData.value.region[0] || ""
    : formData.value.region || "";

  return {
    ...formData.value,
    region,
    positions: formData.value.positions,
    worked: formData.value.worked,
  };
};

const handleRegistration = async () => {
  userStore.setAuthRole("seilor");

  const dataToSubmit = prepareDataForSending();
  v$.value.$touch();

  if (v$.value.$error) {
    console.log("Validation errors:", v$.value.$errors);
    return;
  }

  try {
    dataToSubmit.username = dataToSubmit.email;

    if (isVk.value || isTg.value) {
      const data = await userStore.getSocData();
      dataToSubmit.telegram_id = data.telegram_id?.toString?.() || "";
      dataToSubmit.vk_id = data.vk_id?.toString?.() || "";
      dataToSubmit.is_vk = !!data.is_vk;
      dataToSubmit.is_tg = !!data.is_tg;

      const pwd = "TsQ7@66a_" + dataToSubmit.telegram_id + dataToSubmit.vk_id;
      dataToSubmit.password = pwd;
      dataToSubmit.confirm_password = pwd;
    }

    await userStore.signIn(dataToSubmit, "user");
    if (userStore.authError) {
      openModalCommon(userStore.authError);
      return;
    }

    await userStore.login(dataToSubmit, "user");
    if (userStore.authError) {
      openModalCommon(userStore.authError);
      return;
    }

    closeModal("seilor");
    openModal("modalAuthVerify");

    await api.post("/telegram_message", {
      type: "registration",
      email: dataToSubmit.email,
      fio: `${dataToSubmit.first_name} ${dataToSubmit.last_name} ${dataToSubmit.patronymic || ""}`.trim(),
    });
  } catch (e) {
    console.error("Registration flow error:", e);
    if (userStore.authError) openModalCommon(userStore.authError);
  } finally {
    userStore.clearAuthError?.();
  }
};
</script>

<style lang="scss" scoped>
.reg-sailor-status {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;

  &__label {
    font-size: 14px;
    margin-bottom: 4px;
    color: #807f7f;
  }

  &__select {
    border: 1px solid #d9d9d9;
    background-color: #3b45a9;
    border-radius: 6px;
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  &__arrow {
    font-size: 12px;
    opacity: 0.7;
  }

  &__dropdown {
    margin-top: 4px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background: #fff;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    z-index: 10;
    position: absolute;
  }
}

.region-select {
  display: flex;
  align-items: center;
}

.resume-status__dropdown.region-dropdown {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 6px 0;
  cursor: pointer;
}
</style>
