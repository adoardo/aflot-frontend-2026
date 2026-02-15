<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" v-if="false">
      <div>
        <AfHeaderColor/>
      </div>
      <section class="section-about">
        <div class="container">
          <div class="about">
            <div class="set-top">


              <h1 class="set-title about-title">
                Баланс и история операций
              </h1>
              <!-- /.set-title -->
              <div></div>
            </div>
            <!-- /.set-top -->

            <div class="bal-block">
              <div class="bal-top">
                <div class="bal-top-item">
                  <img src="assets/img/dop-page/icon-bal.svg" alt="image" class="bal-top-img">
                  <div class="bal-top-content">
                    <div class="bal-top-blue">Текущий баланс:</div>
                    <!-- /.bal-top-blue -->
                    <div class="bal-top-price">
                      600 <span>рублей</span></div>
                    <!-- /.bal-top-price -->
                  </div>
                  <!-- /.bal-top-content -->


                </div>
                <!-- /.bal-top-item -->

                <div class="bal-top-line"></div>
                <!-- /.bal-top-line -->

                <div class="bal-top-info">
                  <div class="bal-top-ired">
                    <span>История операций</span>
                    <span class="bal-top-icon">→</span>
                  </div>
                  <!-- /.bal-top-ired -->
                  <div class="bal-top-iblue">
                    Всего:
                    <span>12 операций</span>
                  </div>
                  <!-- /.bal-top-iblue -->
                </div>
                <!-- /.bal-top-info -->

                <div class="bal-top-line"></div>
                <!-- /.bal-top-line -->


                <div class="bal-top-info">
                  <div class="bal-top-ired">
                    <span>Настройки оплаты</span>
                    <span class="bal-top-icon">→</span>
                  </div>
                  <!-- /.bal-top-ired -->
                  <div class="bal-top-iblue">
                    Автопополнение:
                    <span>включено</span>
                  </div>
                  <!-- /.bal-top-iblue -->
                </div>
                <!-- /.bal-top-info -->
              </div>
              <!-- /.bal-top -->

              <div class="bal-item">
                <div class="bal-item-dop">
                  <div class="bal-item-plus">
                    +
                  </div>
                  <!-- /.bal-item-plus -->
                  <div class="bal-item-content">
                    <div class="bal-item-blue">
                      Добавить
                      <span>199 <span>рублей</span></span>
                    </div>
                    <!-- /.bal-item-blue -->

                    <div class="bal-item-gray">
                      Минимальная сумма
                    </div>
                    <!-- /.bal-item-gray -->
                  </div>
                  <!-- /.bal-item-content -->
                </div>
                <!-- /.bal-item-dop -->

                <div class="bal-item-button">
                  Пополнить баланс
                </div>
                <!-- /.bal-item-button -->
              </div>
              <!-- /.bal-item -->


              <div class="bal-item">
                <div class="bal-item-dop">
                  <div class="bal-item-blue">
                    Другая сумма:
                    <div class="bal-item-gprice">1000 <span>pублей</span></div>
                    <!-- /.bal-item-gprice -->
                  </div>
                  <!-- /.bal-item-blue -->
                </div>
                <!-- /.bal-item-dop -->

                <div class="bal-item-button">
                  Пополнить баланс
                </div>
                <!-- /.bal-item-button -->
              </div>
              <!-- /.bal-item -->
            </div>
            <!-- /.bal-block -->


            <div class="bal-end">
              <h2 class="set-title about-title">
                Доступные способы оплаты:
              </h2>


              <div class="bal-part">
                <div class="bal-part-item">
                  <div class="bal-part-top">
                    <img src="assets/img/dop-page/bal-1.svg" alt="image" class="bal-part-icon">
                    <div class="bal-part-title">Банковские карты:</div>
                    <!-- /.bal-part-title -->
                  </div>
                  <!-- /.bal-part-top -->
                  <div class="bal-social">
                    <img src="assets/img/dop-page/bal-4.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-5.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-6.svg" alt="image" class="bal-social-img">
                  </div>
                  <!-- /.bal-social -->
                </div>
                <!-- /.bal-part-item -->
                <div class="bal-part-item">
                  <div class="bal-part-top">
                    <img src="assets/img/dop-page/bal-2.svg" alt="image" class="bal-part-icon">
                    <div class="bal-part-title">Мобильный платеж:</div>
                    <!-- /.bal-part-title -->
                  </div>
                  <!-- /.bal-part-top -->

                  <div class="bal-social">
                    <img src="assets/img/dop-page/bal-7.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-8.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-9.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-10.svg" alt="image" class="bal-social-img">
                  </div>
                  <!-- /.bal-social -->
                </div>
                <!-- /.bal-part-item -->
                <div class="bal-part-item">
                  <div class="bal-part-top">
                    <img src="assets/img/dop-page/bal-3.svg" alt="image" class="bal-part-icon">
                    <div class="bal-part-title">Другие способы:</div>
                    <!-- /.bal-part-title -->
                  </div>
                  <!-- /.bal-part-top -->

                  <div class="bal-social">
                    <img src="assets/img/dop-page/bal-11.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-12.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-13.svg" alt="image" class="bal-social-img">
                    <img src="assets/img/dop-page/bal-14.svg" alt="image" class="bal-social-img">
                  </div>
                  <!-- /.bal-social -->
                </div>
                <!-- /.bal-part-item -->
              </div>
              <!-- /.bal-part -->

            </div>
            <!-- /.bal-end -->
          </div>
          <!-- /.about -->
        </div>
        <!-- /.container -->
      </section>
      <AfCustomFooter/>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
  definePageMeta({
    middleware: ["sailor"],
  })

</script>

<style lang="scss" scoped>

</style>