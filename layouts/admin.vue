<template>
    <div>
        <AfHeaderColor />
        <slot />

    </div>
    <ScrollTop/>
</template>

<script setup >
import AfHeaderColor from '~/components/AfHeaderColor.vue';

import ScrollTop from '~/components/ScrollTop.vue';

</script>

<style lang="scss">

body {
    background-color: #fff;
}
</style>