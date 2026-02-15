<template>
  <div class="tag-input" style="margin-top: 10px">
    <div class="tag-input__label">{{ title }}</div>
    <div class="tag-input__list">
      <div class="tag-input__item" v-for="(tag, index) in modelValue" :key="index">
        {{ tag }}
        <button class="tag-input__delete" @click="removeTag(index)">
          <img src="assets/img/resume/close.svg" alt="delete"/>
        </button>
      </div>
      <div class="tag-input__add" @click="toggleDropdown" v-if="canAddMoreTags">
        <span> + </span>
      </div>
      <div v-if="showDropdown" class="dropdown-menu">
          <button class="tag-input__delete close_modal" @click="toggleDropdown">
            <img src="assets/img/resume/close.svg" alt="delete"/>
        </button>
        <div class="dm-search" placeholder="Поиск...">
          <input v-model="searchInput" @keyup="getLength"/>
        </div>
        <div
            class="dropdown-item"
            v-for="option in availableOptions"
            :key="option"
            @click="selectOption(option)"
        >
          {{ option }}
        </div>
        <div style="display: flex">
          <button v-if="!addInputIsOpen && props.isOtherButtonVisible"
              class="dropdown-button"
              @click="openAddInputIsOpen"
          >
            Другое
          </button>
          <div v-if="addInputIsOpen" class="another_value_wrapper" style=" display: flex; align-items: center;">

            <div class="input" style="max-width: 300px; margin: 8px;">
              <label>Введите значение</label>
              <input id="input" v-on:focus="addInputIsOpen" type="text" v-model="inputValue">
            </div>
              <button @click="inputValue.length ? handleSubmit(inputValue) : null" class="dropdown-button" style="margin-top: 23px;">Добавить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="input-error" v-if="error">
      <span>Пожалуйста, заполните поле</span>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, ref, computed} from "vue";


const props = defineProps({
  myInput: '',
  modelValue: Array,
  optionsList: Array,
  optionsListIds: Array,
  title: {
    type: String,
    default: "Должность, которую рассматриваете (выбор из списка)",
  },
  single: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  isOtherButtonVisible: {
    type: Boolean,
    default: true
  }
});

const openAddInputIsOpen = () => {
  addInputIsOpen.value = true
  setTimeout(() => {
    document.getElementById("input").focus()
  }, 100)

}

const emit = defineEmits(["update:modelValue"]);
const showDropdown = ref(false);

const inputValue = ref('')
const addInputIsOpen = ref(false)

function handleSubmit(option) {
  
  addInputIsOpen.value = false

  const tagValue = props.single
  ? [option]
  : Array.isArray(props.modelValue) 
    ? [...props.modelValue, option] 
    : [option];
  
    emit("update:modelValue", tagValue);
  inputValue.value = ''

  toggleDropdown()
}

const availableOptions = computed(() => {
  if (!props.optionsList?.length) return []; // no list
  return props.optionsList.filter((x) => {
    const notSelected = props.modelValue ? !props.modelValue.includes(x) : true;
    const matchesSearch = x
      .trim()
      .toLowerCase()
      .includes(searchInput.value.trim().toLowerCase());
    return notSelected && matchesSearch;
  });
});
const canAddMoreTags = computed(() => {
  return props.single ? props.modelValue.length === 0 : true;
});

function removeTag(index) {
  const updatedTags = [...props.modelValue];
  updatedTags.splice(index, 1);
  emit("update:modelValue", updatedTags);
}

function toggleDropdown() {
  if (canAddMoreTags.value) {
    showDropdown.value = !showDropdown.value;
    addInputIsOpen.value = false
  }
}

function selectOption(option) {
  const currentModelValue = Array.isArray(props.modelValue) ? props.modelValue : [];
  const newModelValue = props.single ? [option] : [...currentModelValue, option];
  emit("update:modelValue", newModelValue);
  showDropdown.value = false;
}

const searchInput = ref('');

function getLength() {
  console.log(searchInput.value);
  //props.optionsList.filter((x) => props.modelValue.includes(searchInput.value)})
}


// $(function(){
//
// });

</script>

<style scoped lang="scss">
.tag-input__list {
  position: relative;
}

.tag-input__delete {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.dropdown-menu {
  top: calc(100% + 10px);
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  z-index: 25;
  max-height: 325px;
  overflow: auto;
}

.dropdown-item {
  padding: 8px 10px;
  cursor: pointer;

  &:hover {
    background-color: #3b45a9;
    color: white;
  }
}

.dropdown-button {
  max-height: 35px;
  display: inline-block;
  box-shadow: 0px 0px 1px 1px #d5d7ef;
  margin: 10px;
  padding: 0 10px 0 10px;
  font-size: 15px;
  text-align: center;
  line-height: 1.6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3b45a9;
  color: white;
  font-family: "Myriad Pro", sans-serif;
}

.custom-tag {
  width: 100%;
  max-width: 300px;

  .tag-input__list {
    font-weight: 400;
    border: none;
    padding: 0;
    font-size: 16px;
    font-family: "Myriad Pro", sans-serif;
  }
}

.modal-input:focus {
  border-color: #3b45a9;
}
.input input {
  height: 10px;
}
.tag-input {
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
.close_modal{
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    img{
      filter: brightness(0);
    }
}

.close {
  position: absolute;
  top: 1px;
  right: 1px;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

</style>
