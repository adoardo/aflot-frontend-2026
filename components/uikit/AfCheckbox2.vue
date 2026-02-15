<template>
    <label class="custom-checkbox">
        <input type="checkbox" v-model="checkedValue" />
        <span class="checkmark"></span>
        {{ descText }}
        <a :href="linkUrl" v-html="linkText"></a>
    </label>
</template>

<script setup>
    import { computed, defineProps, defineEmits } from "vue";

    const props = defineProps({
        modelValue: Boolean,
        descText: {
          type: String,
          default: "",
        },
        linkText: {
            type: String,
            default: "уведомления",
        },
        linkUrl: {
            type: String,
            default: "#",
        },
    });

    const emit = defineEmits(["update:modelValue"]);

    const checkedValue = computed({
        get: () => props.modelValue,
        set: (newValue) => emit("update:modelValue", newValue),
    });
</script>
