<template>

    <button class="reg-button">
        <img src="assets/img/menu/telegram.svg" alt="image" class="reg-button-img" />
        <span class="reg-button-text">Войти под аккаунтом Telegram</span>
    </button>

    <MainButton text="Open alert" @click="() => showAlert('Hello!')" />

</template>

<script lang="ts" setup>
    import { MainButton, useWebAppPopup } from 'vue-tg'

    const { showAlert } = useWebAppPopup()
</script>