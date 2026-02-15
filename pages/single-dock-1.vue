<template>
    <NuxtLayout name="default-hero-post">
        <div class="section-hero section-hero-post">
            <AfCustomHeader/>
        </div>
        <section class="section-post">
            <div class="container">
                <div class="post">
                    <!-- ED TODO: remove on backend release -->
                    <a href="/flot-dock" class="post-link">
                        <span class="post-link__icon">←</span>
                        <!-- /.post-link__icon -->
                        <span class="post-link__text">К морским документам</span>
                        <!-- /.post-link__text -->
                    </a>
                    <!-- /.post-link -->

                    <h1 class="post-title">
                        Морские документы
                    </h1>
                    <!-- /.post-title -->




                    <div class="post-block doc-block">
                        <img src="assets/img/dock/image-4.jpg" alt="image" class="post-img doc-img">
                        <p class="post-text doc-text">

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
