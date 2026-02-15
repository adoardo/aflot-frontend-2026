<template>
  <NuxtLayout class="main section-hero section-hero-post section-back-none" name="custom">
    <section class="section-about" v-if="contacts">
      <div class="container">
        <div class="about">
          <h1 class="about-title">Контакты</h1>

          <div class="contact-block">
            <!-- LEFT SIDE -->
            <div class="contact-info">
              <div class="contact-part">
                <div class="contact-title">Контактная информация:</div>

                <div class="contact-content">
                  <div class="contact-item">
                    <div class="contact-item__title">Email</div>
                    <a :href="`mailto:${contacts.email}`" class="contact-item__text">{{ contacts.email }}</a>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">Телефон</div>
                    <a :href="`tel:${contacts.phone_number}`" class="contact-item__text">
                      {{ contacts.phone_number }}
                    </a>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">WhatsApp</div>
                    <a :href="`tel:${contacts.whatsapp}`" class="contact-item__text">
                      {{ contacts.whatsapp }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="contact-line"></div>

              <div class="contact-part">
                <div class="contact-title">Реквизиты:</div>

                <div class="contact-content">
                  <div class="contact-item">
                    <div class="contact-item__text">{{ contacts.requisites }}</div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">Юридический адрес</div>
                    <div class="contact-item__text">{{ contacts.legal_address }}</div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">ИНН</div>
                    <div class="contact-item__text">{{ contacts.company_inn }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE FORM -->
            <div class="contact-right">
              <div class="contact-title">Обратная связь:</div>

              <form class="contact-form">
                <label class="contact-label">
                  <span>Фамилия</span>
                  <input
                    type="text"
                    placeholder="Имя"
                    class="contact-input contact-input-name"
                    v-model="formData.name"
                    :class="{ error: v$.name.$error }"
                  />
                </label>

                <div class="contact-form-part">
                  <label class="contact-label">
                    <span>Email</span>
                    <input
                      placeholder="Почта"
                      type="email"
                      class="contact-input"
                      v-model="formData.email"
                      :class="{ error: v$.email.$error }"
                    />
                  </label>

                  <label class="contact-label">
                    <span>Номер телефона</span>
                    <input
                      placeholder="Телефон"
                      type="tel"
                      class="contact-input"
                      v-model="formData.phone_number"
                      :class="{ error: v$.phone_number.$error }"
                    />
                  </label>
                </div>

                <textarea
                  placeholder="Ваш вопрос"
                  class="contact-textarea"
                  v-model="formData.request"
                ></textarea>

                <!-- reCAPTCHA -->
                <Recupch @verified="(value) => (formData.recaptcha_verified = value)" />

                <!-- Checkbox -->
                <label class="contact-label contact-label-check">
                  <input id="contact-check" type="checkbox" class="contact-check" v-model="formData.agree" />
                  <span class="contact-check__text">
                    Я даю согласие на обработку
                    <a href="#">персональных данных</a>
                  </span>
                </label>

                <!-- Submit -->
                <button type="button" class="contact-button" @click="onSubmit()">
                  Отправить <span>→</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import api from "@/api/api";
import Recupch from "~/components/Recupch.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, onMounted } from "vue";

const contacts = ref(null);

const formData = ref({
  email: "",
  name: "",
  phone_number: "",
  request: "",
  recaptcha_verified: false,
  agree: false,
});

const rules = {
  email: { required },
  name: { required },
  phone_number: { required },
  recaptcha_verified: { required },
};

const v$ = useVuelidate(rules, formData);

async function fethContacts() {
  const { data } = await api.get("/contacts");
  contacts.value = data;
}

async function fetchFeedback() {
  await api.post("/feedback", formData.value);
  await api.post("/send", formData.value);

  // Reset form
  formData.value = {
    email: "",
    name: "",
    phone_number: "",
    request: "",
    recaptcha_verified: false,
    agree: false,
  };
}


function onSubmit() {
  v$.value.$touch();

  if (!formData.value.recaptcha_verified) {
    return alert("Подтвердите, что вы не робот.");
  }

  if (!formData.value.agree) {
    return alert("Необходимо согласие на обработку персональных данных.");
  }

  if (v$.value.$error) {
    return;
  }

  fetchFeedback();
  alert("Сообщение отправлено!");
}


onMounted(async () => {
  await fethContacts();
});
</script>

<style lang="scss" scoped>


.contact-label-check input#contact-check{
    background: white !important;
    border: 1px solid red;
}
</style>
