<template>
  <div class="input" :class="{ error: error }">
    <label v-if="label" :for="id" v-html="label"></label>
    <input
        :id="id"
        :type="type"
        :placeholder="place"
        v-model="localValue"
        :class="classInput"
    />
    <div class="resume-contact__second" v-if="showCheckbox">
      <label class="custom-checkbox">
        <input type="checkbox" v-model="localCheckboxValue"/>
        <span class="checkmark"></span>
        Получать <a href="#">уведомления</a> <br/>
        на {{ note }}
      </label>
    </div>
    <div class="input-error" v-if="error">
      <span>Пожалуйста, заполните поле</span>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, defineEmits} from "vue";

const props = defineProps({
  modelValue: String,
  checkboxValue: Boolean,
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
    default: "на указанную почту",
  },
  id: {
    type: String,
    default: "default-id",
  },
  label: {
    type: String,
    default: "",
  },
  place: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  classInput: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:checkboxValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const localCheckboxValue = computed({
  get: () => props.checkboxValue,
  set: (newValue) => emit("update:checkboxValue", newValue),
});
</script>

<style lang="scss" scoped>
.input {
  position: relative;

  .input-error {
    position: absolute;
    left: 0px;
    background: #ffdbdb;
    top: 61px;
    width: calc(100% - 20px);
    text-align: center;
    padding: 10px;
    font-size: 14px;
    z-index: 1;
  }

  label {
    text {
      color: rgb(221, 32, 32);
    }
  }
}

.input.error {
  input {
    border-color: rgb(221, 32, 32);
  }
}
</style>
