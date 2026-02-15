<template>
    <NuxtLayout name="default-hero">
        <div class="section-hero section-hero-dock">
            <AfCustomHeader/>
            <div class="hero hero-dock">
                <div class="container">
                    <div class="hero-block hero-block-dock">
                        <h1 class="hero-title hero-title-dock">
                            Морские документы
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <section class="section-dock">
            <div class="container">
                <div class="dock">
                    <!-- ED TODO: remove on backend release -->
                    <a href="/single-dock-1" class="dock-item">
                        <img src="assets/img/dock/image-4.jpg" alt="image" class="dock-img">
                        <div class="dock-content">
                            <div class="dock-part">
                                <div class="dock-info">
                                    <div class="dock-subtitle">Морские документы</div>
                                    <!-- /.dock-subtitle -->

                                </div>
                                <!-- /.dock-info -->

                            </div>
                            <!-- /.dock-part -->
                        </div>
                        <!-- /.dock-content -->
                    </a>
                    <!-- /.dock-item -->
                    <a href="/single-dock-2" class="dock-item">
                        <img src="assets/img/dock/image-2.jpg" alt="image" class="dock-img">
                        <div class="dock-content">
                            <div class="dock-part">
                                <div class="dock-info">
                                    <div class="dock-subtitle">Медицинская комиссия</div>
                                    <!-- /.dock-subtitle -->

                                </div>
                                <!-- /.dock-info -->

                            </div>
                            <!-- /.dock-part -->
                        </div>
                        <!-- /.dock-content -->
                    </a>
                    <!-- /.dock-item -->
                    <a href="/single-dock-3" class="dock-item">
                        <img src="assets/img/dock/image-1.jpg" alt="image" class="dock-img">
                        <div class="dock-content">
                            <div class="dock-part">
                                <div class="dock-info">
                                    <div class="dock-subtitle">УЛМ и Мореходная книжка
                                    </div>
                                    <!-- /.dock-subtitle -->

                                </div>
                                <!-- /.dock-info -->

                            </div>
                            <!-- /.dock-part -->
                        </div>
                        <!-- /.dock-content -->
                    </a>
                    <!-- /.dock-item -->
                    <a href="/single-dock-4" class="dock-item">
                        <img src="assets/img/dock/image-3.png" alt="image" class="dock-img">
                        <div class="dock-content">
                            <div class="dock-part">
                                <div class="dock-info">
                                    <div class="dock-subtitle">Охрана труда</div>
                                    <!-- /.dock-subtitle -->

                                </div>
                                <!-- /.dock-info -->

                            </div>
                            <!-- /.dock-part -->
                        </div>
                        <!-- /.dock-content -->
                    </a>
                    <!-- /.dock-item -->
                </div>
                <!-- /.dock -->
            </div>
            <!-- /.container -->
        </section>
        <AfCustomFooter/>
    </NuxtLayout>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>