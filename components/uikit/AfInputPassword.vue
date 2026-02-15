<template>
  <label class="menu-reg-label">
    {{ title }}
    <div class="password" :class="{ error: error }">
      <input
        ref="passFilter"
        id="reg-pass"
        :type="inputType"
        class="menu-reg-input"
        v-model="localValue"
      />
      <a
        href="#"
        class="password-control"
        :class="{ view: inputType === 'text' }"
        @click.prevent="togglePasswordVisibility"
      ></a>
      <div class="input-error" v-if="error">
        <span>{{errormsg}}</span>
      </div>
    </div>
  </label>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  title: String,
  error: {
    type: Boolean,
    default: false,
  },
  errormsg: String
});

const emit = defineEmits(["update:modelValue"]);
const inputType = ref("password");
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit("update:modelValue", newValue);
  },
});


// Переключение между видимостью и скрытием пароля
function togglePasswordVisibility() {
  inputType.value = inputType.value === "password" ? "text" : "password";
}
</script>

<style lang="scss" scoped>
  .password {
    position: relative;
    .input-error {
      position: absolute;
      left: 0px;
      background: #ffdbdb;
      top: 28px;
      width: calc(100% - 20px);
      text-align: center;
      padding: 10px;
      font-size: 14px;
      z-index: 1;
    }
  }
</style>