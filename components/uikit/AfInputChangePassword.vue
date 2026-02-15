<template>
    <label class="menu-reg-label">
      {{ title }}
      <div class="password" :class="{ error: error }">
        <input
          ref="passFilter"
          id="reg-pass-chng"
          :type="inputType"
          class="menu-reg-input"
          v-model="localValue"
          @input="clearError"
        />
        <a
          href="#"
          class="password-control"
          :class="{ view: inputType === 'text' }"
          @click.prevent="togglePasswordVisibility"
        ></a>
        <div class="input-error" v-if="error">
          <span>{{ errormsg }}</span>
        </div>
      </div>
    </label>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits, ref } from "vue";
  
  const props = defineProps({
    modelValue: String,
    title: String,
    error: {
      type: Boolean,
      default: false,
    },
    errormsg: String,
  });
  
  const emit = defineEmits(["update:modelValue", "clear-error"]);
  
  const inputType = ref("password");
  const localValue = computed({
    get: () => props.modelValue,
    set: (newValue) => {
      emit("update:modelValue", newValue);
    },
  });
  
  // toggle password visibility
  function togglePasswordVisibility() {
    inputType.value = inputType.value === "password" ? "text" : "password";
  }
  
  // clear error when user types
  function clearError() {
    emit("clear-error"); // parent will reset error
  }
  </script>
  
  <style lang="scss" scoped>
  .menu-reg-label {
    font-size: 18px;
  }
  .password {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
  
    .password-control {
      position: relative;
      transform: translateX(-110%);
    }
    #reg-pass-chng{
        border-bottom: 1px solid rgba(128, 128, 128, 0.637);
        &:focus{
        border-bottom: 1px solid #3b45a9;
        }
    }
  
    input {
      height: 100%;
      font-size: 20px;
    }
  
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
  