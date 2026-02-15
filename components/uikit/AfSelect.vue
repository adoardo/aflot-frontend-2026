<template>
  <div>
    <label v-html="label"></label>
    <select v-model="localValue">
      <option v-if="false" value="" disabled selected>{{ place }}</option>
      <option v-for="option in optionsList" :key="option" :value="option">{{ option }}</option>
    </select>
    <div class="input-error" v-if="error">
      <span>Пожалуйста, заполните поле</span>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, defineEmits} from "vue";

const props = defineProps({
  modelValue: String,
  optionsList: Array,
  label: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  place: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
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
