<template>
  <NuxtLayout class="main section-hero section-hero-post section-back-none" name="custom">
    <section class="section-about" v-if="contacts">
      <div class="container">
        <div class="about">
          <h1 class="about-title">Контакты</h1>

          <div class="contact-block">
            <div class="contact-info">
              <div class="contact-part">
                <div class="contact-title">Контактная информация:</div>

                <div class="contact-content">
                  <div class="contact-item">
                    <div class="contact-item__title">Email</div>

                    <a :href="`mailto: ${contacts.email}`" class="contact-item__text">{{
                      contacts.email
                    }}</a>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">Телефон</div>

                    <a :href="`tel:${contacts.phone_number}`" class="contact-item__text">
                      {{ contacts.phone_number }}</a
                    >
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">WhatsApp</div>

                    <a :href="`tel:${contacts.whatsapp}`" class="contact-item__text">
                      {{ contacts.whatsapp }}</a
                    >
                  </div>
                </div>
              </div>

              <div class="contact-line"></div>

              <div class="contact-part">
                <div class="contact-title">Реквизиты:</div>

                <div class="contact-content">
                  <div class="contact-item">
                    <div class="contact-item__text">
                      {{ contacts.requisites }}
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">Юридический адрес</div>

                    <div class="contact-item__text">
                      {{ contacts.legal_address }}
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-item__title">ИНН</div>

                    <div class="contact-item__text">{{ contacts.company_inn }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-right">
              <div class="contact-title">Обратная связь:</div>

              <form class="contact-form">
                <label for="name" class="contact-label">
                  <span>Фамилия</span>
                  <input
                    id="name"
                    type="text"
                    placeholder="Имя"
                    class="contact-input contact-input-name"
                    v-model="formData.name"
                    :class="{
                      error: v$.name.$error && v$.name.required.$invalid,
                    }"
                  />
                </label>

                <div class="contact-form-part">
                  <label for="email" class="contact-label">
                    <span>Email</span>
                    <input
                      id="email"
                      placeholder="Почта"
                      type="email"
                      class="contact-input"
                      v-model="formData.email"
                      :class="{
                        error: v$.email.$error && v$.email.required.$invalid,
                      }"
                    />
                  </label>

                  <label for="phone" class="contact-label">
                    <span>Номер телефона</span>
                    <input
                      id="phone"
                      placeholder="Телефон"
                      type="tel"
                      class="contact-input"
                      v-model="formData.phone_number"
                      :class="{
                        error:
                          v$.phone_number.$error && v$.phone_number.required.$invalid,
                      }"
                    />
                  </label>
                </div>


                <!-- <img src="assets/img/contact/image.png" alt="" class="contact-rep" /> -->
                <label for="check" class="contact-label contact-label-check">
                  <input id="check" type="checkbox" class="contact-check" />
                  <span class="contact-check__text">
                    Я даю согласие на обработку
                    <a href="#">персональных данных</a>
                  </span>
                </label>

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
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

const contacts = ref(null);
const formData = ref({
  email: "",
  name: "",
  phone_number: ""
});

const rules = {
  email: { required },
  name: { required },
  phone_number: { required },
};

const v$ = useVuelidate(rules, formData);

async function fethContacts() {
  try {
    const { data } = await api.get("contacts");
    contacts.value = data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchFeedback(formData) {
  try {
    await api.post("/feedback", formData);
  } catch (error) {
    console.log(error);
  }
}

function onSubmit() {
  v$.value.$touch();
  if (!v$.value.$error) {
    fetchFeedback(formData.value);
  } else {
    console.log("Validation errors:", v$.value.$errors);
  }
}
onMounted(async () => {
  await fethContacts();
});
</script>

<style lang="scss" scoped>
input {
  &.error {
    border-color: #9b2719;
  }
}
</style>
