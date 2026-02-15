<template>
  <div class="tag-input" style="margin-top: 10px">
    <div class="tag-input__label">{{ title }}</div>

    <div class="tag-input__list">
      <!-- Show selected value -->
      <div v-if="modelValue" class="tag-input__item">
        {{ modelValue }}
        <button class="tag-input__delete" @click="clearSelection">
          <img src="assets/img/resume/close.svg" alt="delete"/>
        </button>
      </div>

      <!-- Show + if nothing selected -->
      <div class="tag-input__add" v-if="!modelValue" @click="toggleDropdown">
        <span> + </span>
      </div>

      <!-- Dropdown -->
      <div v-if="showDropdown" class="dropdown-menu">
        <div class="dm-search" placeholder="Поиск...">
          <input v-model="searchInput" placeholder="Поиск..." />
        </div>
        <div class="closing_modal" @click="closeDropdown">
          ✕
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
          <button
            v-if="!addInputIsOpen && props.isOtherButtonVisible"
            class="dropdown-button"
            @click="openAddInputIsOpen"
          >
            Другое
          </button>

          <div
            v-if="addInputIsOpen"
            class="another_value_wrapper"
            style="display: flex; align-items: center;"
          >
            <div class="input" style="max-width: 300px; margin: 8px;">
              <label>Введите значение</label>
              <input id="input" type="text" v-model="inputValue" />
            </div>
            <button
              @click="inputValue.length ? handleSubmit(inputValue) : null"
              class="dropdown-button"
              style="margin-top: 23px;"
            >
              Добавить
            </button>
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
import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  optionsList: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Выберите значение",
  },
  error: {
    type: Boolean,
    default: false,
  },
  isOtherButtonVisible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const inputValue = ref("");
const addInputIsOpen = ref(false);
const searchInput = ref("");

// === Dropdown control ===
const openAddInputIsOpen = () => {
  addInputIsOpen.value = true;
  setTimeout(() => {
    const inputEl = document.getElementById("input");
    if (inputEl) inputEl.focus();
  }, 100);
};

// === Filtering options ===
const availableOptions = computed(() => {
  if (!props.optionsList?.length) return [];
  return props.optionsList.filter((x) =>
    x.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase())
  );
});

// === Actions ===
function handleSubmit(option) {
  emit("update:modelValue", option);
  closeDropdown();
}

function selectOption(option) {
  emit("update:modelValue", option);
  closeDropdown();
}

function clearSelection() {
  emit("update:modelValue", "");
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  addInputIsOpen.value = false;
}

function closeDropdown() {
  showDropdown.value = false;
  addInputIsOpen.value = false;
  inputValue.value = "";
}
</script>

<style scoped lang="scss">
.tag-input__list {
  position: relative;
}

.tag-input__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #4d4df8ff;
  padding: 6px 10px;
  border-radius: 4px;
  margin-bottom: 5px;
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
  padding: 10px 20px;
  font-size: 15px;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3b45a9;
  color: white;
  font-family: "Myriad Pro", sans-serif;
  margin-bottom: 30px;
  position: relative;
}

.input input {
  height: 10px;
}

.input-error {
  background: #ffdbdb;
  text-align: center;
  padding: 10px;
  font-size: 14px;
}
.closing_modal {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
}
</style>
