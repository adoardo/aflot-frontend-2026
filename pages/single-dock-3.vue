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
                        УЛМ и Мореходная книжка
                    </h1>
                    <!-- /.post-title -->




                    <div class="post-block doc-block">
                        <img src="assets/img/dock/image-1.jpg" alt="image" class="post-img doc-img">
                        <div class="post-text doc-text">
                            <strong>Инструкция:</strong><br>
                            1.	Введите ваши данные <br>
                            2.	Нажмите кнопку «Получить скидку»<br>
                            3.	На вашу почту прийдет ПРОМОКОД и контактные данные офиса по оформлению УЛМ и МК во Владивостоке<br>
                            4.	Позвоните по указанному телефону, договоритесь о времени встречи в офисе<br>
                            5.	В офисе назовите ПРОМОКОД исполнителю<br>
                            6.	Получите скидку<br>

                            <br>
                            <div class="contact-right">
                                <div class="contact-title">
                                    Введите ваши данные
                                </div>
                                <!-- /.contact-title -->

                                <form action="" class="contact-form">
                                    <div class="contact-form-part">
                                        <label for="text1" class="contact-label">
                                            <span>Услуга:</span>
                                            <select required="" class="contact-input contact-input-name doc-select">
                                                <option selected="" disabled="">Выберите услугу</option>
                                                <option>УЛМ и МК первично</option>
                                                <option>Обновить УЛМ</option>
                                            </select>
                                            <!-- /# -->
                                        </label>
                                        <!-- /.contact-label -->

                                        <label for="text2" class="contact-label">
                                            <span>Фамилия, имя, отчество</span>
                                            <input required="" id="text2" placeholder="ФИО" type="text" class="contact-input">
                                        </label>
                                        <!-- /.contact-label -->
                                    </div>
                                    <!-- /.contact-form-part -->
                                    <div class="contact-form-part">
                                        <label for="email3" class="contact-label">
                                            <span>Почта</span>
                                            <input required="" id="email3" placeholder="Почта" type="email" class="contact-input">
                                        </label>
                                        <!-- /.contact-label -->
                                        <label for="tel4" class="contact-label">
                                            <span>Телефон</span>
                                            <input required="" id="tel4" placeholder="Телефон" type="tel" class="contact-input">
                                        </label>
                                        <!-- /.contact-label -->

                                    </div>
                                    <!-- /.contact-form-part -->






                                    <img src="assets/img/contact/image.png" alt="" class="contact-rep">
                                    <label for="check" class="contact-label contact-label-check">
                                        <input id="check" type="checkbox" class="contact-check">
                                        <span class="contact-check__text">
       Я даю согласие на обработку
       <a href="#">персональных данных</a>
   </span>
                                        <!-- /.contact-check__text -->
                                    </label>
                                    <!-- /.contact-label -->

                                    <button type="submit" class="contact-button doc-button">
                                        Получить скидку  <span>→</span>
                                    </button>
                                    <!-- /.contact-button -->
                                </form>
                                <!-- /.contact-form -->

                            </div>
                            <!-- /.contact-right -->

                        </div>
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
