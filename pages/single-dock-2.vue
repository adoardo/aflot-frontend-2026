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
                        Медицинская комиссия
                    </h1>
                    <!-- /.post-title -->




                    <div class="post-block doc-block">
                        <img src="assets/img/dock/image-2.jpg" alt="image" class="post-img doc-img">
                        <div class="post-text doc-text">
                            <strong>Инструкция:</strong><br>
                            1.	Введите ваши данные <br>
                            2.	Нажмите кнопку «Сформировать направление со скидкой»<br>
                            3.	На вашу почту прийдет НАПРАВЛЕНИЕ на медицинскую комиссию со скидкой от АФЛОТ и контактные данные клиники<br>
                            4.	Позвоните по указанному телефону, договоритесь о времени визита<br>
                            5.	В офисе клиники покажите НАПРАВЛЕНИЕ администратору с телефона<br>
                            6.	Получите скидку<br>
                            <br>

                            <div class="contact-right">
                                <div class="contact-title">
                                    Ввод данных в направление
                                </div>
                                <!-- /.contact-title -->

                                <form action="" class="contact-form">
                                    <label for="text1" class="contact-label">
                                        <span>Наименование медицинской организации</span>
                                        <input id="text1" type="text" placeholder="Наименование огранизации" value="ООО «МУ «Азбука здоровья» (Медсправка)" class="contact-input contact-input-name">
                                    </label>
                                    <!-- /.contact-label -->
                                    <label for="text2" class="contact-label">
                                        <span>Фактический адрес ее местонахождения</span>
                                        <input id="text2" type="text" placeholder="Фактический адрес" value="г. Владивосток, Ул. Калинина 275, 2 этаж" class="contact-input contact-input-name">
                                    </label>
                                    <!-- /.contact-label -->
                                    <label for="text3" class="contact-label">
                                        <span>Электронная почта, контактный телефон</span>
                                        <input id="text3" type="text" placeholder="Электронная почта, контактный телефон" value="202-8-202" class="contact-input contact-input-name">
                                    </label>
                                    <!-- /.contact-label -->
                                    <div class="contact-form-part">
                                        <label for="text4" class="contact-label">
                                            <span>Фамилия, имя, отчество (при наличии)</span>
                                            <input id="text4" placeholder="ФИО" type="text" class="contact-input">
                                        </label>
                                        <!-- /.contact-label -->
                                        <label for="date5" class="contact-label">
                                            <span>Дата рождения</span>
                                            <input id="date5" placeholder="Дата рождения" type="date" class="contact-input">
                                        </label>
                                        <!-- /.contact-label -->

                                    </div>
                                    <!-- /.contact-form-part -->

                                    <label for="text6" class="contact-label">
                                        <span>Пол работника</span>
                                        <select class="contact-input contact-input-name doc-select">
                                            <option selected="" disabled="">Пол работника</option>
                                            <option>Мужчина</option>
                                            <option>Женщина</option>
                                        </select>
                                        <!-- /# -->
                                    </label>
                                    <!-- /.contact-label -->


                                    <label for="text7" class="contact-label">
                                        <span>Наименование структурного подразделения работодателя (при наличии)</span>
                                        <input id="text7" type="text" class="contact-input">
                                    </label>
                                    <!-- /.contact-label -->
                                    <label for="text8" class="contact-label">
                                        <span>Наименование должности (профессии)</span>
                                        <input id="text8" type="text" class="contact-input">
                                    </label>
                                    <!-- /.contact-label -->
                                    <label for="text9" class="contact-label">
                                        <span>Вредные и (или) опасные производственные факторы, виды работ, в соответствии со списком контингента</span>
                                        <input id="text9" value="Плав состав на море 714Н" type="text" class="contact-input">
                                    </label>
                                    <!-- /.contact-label -->


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
                                        Сформировать направление со скидкой <span>→</span>
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
