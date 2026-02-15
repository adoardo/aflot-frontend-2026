<template>
  <div class="files">
    <div v-for="(file, index) in localFiles" :key="index" class="file">
      <div class="file__icon">
        <img src="assets/img/resume/doc.png" alt="doc" />
      </div>
      <div class="file__label">{{ file.name }}</div>
      <div class="file__action" @click="removeFile(index)">
        <img src="assets/img/resume/delete.png" alt="delete" />
      </div>
    </div>
    <div class="file upload" @click="uploadFile">
      <div class="file__icon">
        <img src="assets/img/resume/file.png" alt="file" />
      </div>
      <div class="file__label">Загрузить файл</div>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:files"]);

const localFiles = ref([...props.files]);

const fileInput = ref(null);

watch(props.files, (newVal) => {
  localFiles.value = [...newVal];
});

const uploadFile = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    localFiles.value.push(files[i]);
  }
  emit("update:files", localFiles.value);
};

const removeFile = (index) => {
  localFiles.value.splice(index, 1);
  emit("update:files", localFiles.value);
};
</script>
