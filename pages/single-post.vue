<template>
    <NuxtLayout name="default-hero">
        <div class="section-hero section-hero-post">
            <AfCustomHeader/>
        </div>

        <section class="section-post">
            <div class="container">
                <div class="post">
                    <!-- ED TODO: remove on backend release -->
                    <a href="/news" class="post-link">
                        <span class="post-link__icon">←</span>
                        <!-- /.post-link__icon -->
                        <span class="post-link__text">К морским новостям</span>
                        <!-- /.post-link__text -->
                    </a>
                    <!-- /.post-link -->

                    <h1 class="post-title">
                        Суд в Египте отклонил апелляцию владельца Ever Given
                        на арест судна
                    </h1>
                    <!-- /.post-title -->

                    <div class="news-info">
                        <div class="news-date">13 декабря 2023</div>
                        <!-- /.news-date -->
                        <div class="news-view"><img src="assets/img/news/icon.svg" alt="image"><span>894</span></div>
                        <!-- /.news-view -->
                    </div>
                    <!-- /.post-info -->


                    <div class="post-block">
                        <img src="assets/img/post/image.png" alt="image" class="post-img">
                        <p class="post-text">
                            КАИР, 4 мая - РИА Новости. Суд по экономическим делам города Исмаилия в Египте отклонил апелляцию владельца контейнеровоза Ever Given на решение арестовать судно и его груз, сообщила египетская газета Al-Ahram.
                            Суд во вторник "вынес решение отклонить жалобу, поданную компанией-владельцем блокировавшего Суэцкий канал судна Ever Given, и поддержать решение о его задержании", пишет издание.
                            Страховая компания UK Club сообщила 23 апреля, что владельцы контейнеровоза подали апелляцию в суд Исмаилии на решение арестовать судно и его груз. В качестве основания для апелляции компания назвала несколько причин, включая сомнения в "легитимности ареста груза" и "отсутствие подтверждающих обоснований для весьма значительных требований администрации Суэцкого канала" по выплате компенсаций.
                        </p>
                        <!-- /.post-text -->

                    </div>
                    <!-- /.post-block -->

                    <div class="post-end">
                        <a href="#" class="post-end__link">
                            <span class="post-icon">←</span>
                            К предыдущей новости
                        </a>
                        <!-- /.post-end__link -->
                        <div class="post-line"></div>
                        <!-- /.post-line -->
                        <a href="#" class="post-end__link post-end__red">
                            К следующей новости
                            <span class="post-icon">→</span>
                        </a>
                        <!-- /.post-end__link -->
                    </div>
                    <!-- /.post-end -->
                </div>
                <!-- /.post -->
            </div>
            <!-- /.container -->
        </section>
        <AfCustomFooter/>
    </NuxtLayout>
</template>

