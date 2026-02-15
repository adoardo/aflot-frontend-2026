<template>
  <div class="image-uploader">
    <input type="file" @change="handleFileChange" ref="fileInput" hidden />
    <a href="#" class="reg-about-link" @click="triggerInput">
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded image" />
      <img v-else src="/assets/img/menu/logo-about.png" alt="Uploaded image" />
    </a>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const fileInput = ref(null);
const imageUrl = ref("");
watch(
  () => props.modelValue,
  (newValue) => {
    imageUrl.value = newValue;
  }
);
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      emit("update:modelValue", e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function triggerInput() {
  fileInput.value.click();
}
</script>

<style scoped lang="scss">
.image-uploader img {
  cursor: pointer;
  min-width: 103px;
  width: 103px;
  height: 103px;
}

.reg-about-link {
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px dashed #e6e6ed;
}
</style>
