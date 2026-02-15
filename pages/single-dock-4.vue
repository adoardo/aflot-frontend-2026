<template>
    <NuxtLayout name="default-hero-post">
        <div class="section-hero section-hero-post">
            <AfCustomHeader/>
        </div>
        <section class="section-post">
            <div class="container">
                <div class="post">
                    <a href="/flot-dock" class="post-link">
                        <span class="post-link__icon">←</span>
                        <!-- /.post-link__icon -->
                        <span class="post-link__text">К морским документам</span>
                        <!-- /.post-link__text -->
                    </a>
                    <!-- /.post-link -->

                    <h1 class="post-title">
                        Охрана труда
                    </h1>
                    <!-- /.post-title -->




                    <div class="post-block doc-block">
                        <img src="assets/img/dock/image-3.png" alt="image" class="post-img doc-img">
                        <p class="post-text doc-text">
                            Инструкция:<br>
                            1.	Перейдите по ссылке на сайт учебного центра «Специалист ДВ» (<a href="https://specialistdv.ru/">https://specialistdv.ru/</a>) <br>
                            2.	Нажмите красную кнопку «Оставить заявку»<br>
                            3.	Введите: Ваше имя, номер телефона, в комментарии напишите «Скидка от АФЛОТ» <br>
                            4.	Отправьте заявку<br>
                            5.	В ближайшее время с ваши свяжется менеджер учебного центра<br>
                            6.	Получите новую охрану труда со скидкой от АФЛОТ
                            <br><br>
                            <img src="assets/img/dock/image-5.png" alt="image">
                        </p>
                        <!-- /.post-text -->

                    </div>
                    <!-- /.post-block -->


                </div>
                <!-- /.post -->
            </div>
            <!-- /.container -->
        </section>
        <AfCustomFooter/>
    </NuxtLayout>
</template>

<script setup>
    import AfCustomHeader from "../components/AfCustomHeader.vue";
    import AfCustomFooter from "../components/AfCustomFooter.vue";

</script>

<style lang="scss" scoped></style>
