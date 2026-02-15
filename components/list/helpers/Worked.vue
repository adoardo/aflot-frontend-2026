<template>
  <div class="vi-item" v-if="data.worked.length != 0">
    <div class="vi-label">Работал на судах:</div>
    <template v-if="data.worked.length > 3">
            <span
                v-for="(item, index) in data.worked.slice(0, 3)"
                :key="'worked-' + index"
            >{{ item }}<text v-if="(index < 2)">, </text></span>

      <span style="cursor: pointer; padding-left: 3px;" v-if="!showAllWorked" class="res-blue-text" @click="showAllWorked = true"
      >еще {{ data.worked.length - 3 }}</span
      >
      <span v-if="showAllWorked === true">
              <span v-for="(item, index) in data.worked.slice(3)">, {{ item }}</span>
            </span>
    </template>
    <template v-else>
            <span v-for="(item, index) in data.worked" :key="'worked-' + index">{{
                item
              }}<text v-if="(index < (data.worked.length) - 1)">, </text></span>
    </template>
  </div>
  <div v-else class="vi-item">

  </div>
</template>

<script setup>
import {ref} from "vue";

const showAllWorked = ref(false);
const props = defineProps({
  data: {},
});
</script>