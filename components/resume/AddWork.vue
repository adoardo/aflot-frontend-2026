<template>
  <div class="resume-experience">
    <table>
      <thead>
        <tr>
          <th>Судовладелец</th>
          <th>Тип судна</th>
          <th>Название судна</th>
          <th>Должность</th>
          <th>Период работы</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(experience, index) in localExperience" :key="index">
          <td data-title="Судовладелец">
            <input
              v-model="experience.owner"
              type="text"
              placeholder="Введите данные"
              @input="updateExperience(index, 'owner', experience.owner)"
            />
          </td>
          <td data-title="Тип судна">
            <input
              v-model="experience.type"
              type="text"
              placeholder="Введите данные"
              @input="updateExperience(index, 'type', experience.type)"
            />
          </td>
          <td data-title="Название судна">
            <input
              v-model="experience.name"
              type="text"
              placeholder="Введите данные"
              @input="updateExperience(index, 'name', experience.name)"
            />
          </td>
          <td data-title="Должность">
            <input
              v-model="experience.position"
              type="text"
              placeholder="Введите данные"
              @input="updateExperience(index, 'position', experience.position)"
            />
          </td>
          <td data-title="Период работы">
            <input
              v-model="experience.period"
              type="text"
              placeholder="Введите данные"
              @input="updateExperience(index, 'period', experience.period)"
            />
          </td>
          <td class="resume-experience__delete">
            <button @click="removeExperience(index)">
              <img src="assets/img/resume/delete.png" alt="delete" />
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <button class="resume-experience__add" @click="addExperience">
              <span>+</span>
              Добавить место работы
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  form: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:form"]);

const localExperience = ref([...props.form]);

watch(props.form, (newVal) => {
  localExperience.value = [...newVal];
});

const addExperience = () => {
  const newExperience = { owner: "", type: "", name: "", position: "", period: "" };
  localExperience.value.push(newExperience);
  emit("update:form", localExperience.value);
};

const removeExperience = (index) => {
  localExperience.value.splice(index, 1);
  emit("update:form", localExperience.value);
};

const updateExperience = (index, field, value) => {
  localExperience.value[index][field] = value;
  emit("update:form", localExperience.value);
};
</script>
