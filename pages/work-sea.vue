<template>
    <NuxtLayout name="custom">
        <section class="section-about section-work">
            <div class="container">
                <div class="about">
                    <div class="work-subtext work-subtextst">
                        <strong class="work-subtitle">Реальные истории моряков.</strong><br/><br/>

                        <template v-for="(item, i) in history" :key="'history-item-' + i">
                            <strong>{{ item.title }}</strong>
                            <br/><br/>
                            <div v-html="item.content"></div>
                            <br/><br/>
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
    import api from "@/api/api";

    const history = ref(null);

    async function getHistory() {
        const {data} = await api.get("/real-history");
        history.value = data;
    }

    onMounted(async () => {
        await getHistory();
    });
</script>

<style lang="scss" scoped></style>
