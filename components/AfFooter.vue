<template>
  <div class="section section-content-5">
    <div class="main-content main-content-two">
      <div class="main-block-two">
        <div class="content-menu content-menu-2 footer-menu-end">
          <a href="/vacancies">Морские<br> вакансии</a>
          <a href="/resumes">Анкеты<br> моряков</a>
          <a href="/navy">морской<br> флот</a>
          <a href="/flot-dock">морские<br> документы</a>
          <a href="/work-sea">начать работу<br> в море</a>
        </div>
        <!-- /.content-menu -->

        <div class="vak">
          <div class="footer-block-main">
            <div class="footer-item footer-item-cont">
              <h2 class="footer-title">
                Доступные способы оплаты:
              </h2>
              <!-- /.footer-title -->


              <div class="footer-item-block">
                <img src="assets/img/dop-page/bal-4.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-5.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-11.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-12.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-13.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-14.svg" alt="image" class="bal-social-img">
                <img src="assets/img/dop-page/bal-16.svg" alt="image" class="bal-social-img">
              </div>
              <!-- /.footer-item__block -->
            </div>
            <!-- /.footer-item -->

            <div class="footer-item footer-item-end">
              <div class="footer-copy">
                {{currentDate.getFullYear()}}, «Афлот» - Все права защищены
              </div>
              <div class="footer-end-block">
                <a href="/tarif" class="footer-link">Тарифы</a>
                <a href="/about" class="footer-link">О сервисе</a>
                <a href="/_nuxt/assets/docs/Правила пользования сайтом.docx" class="footer-link" target="_blank">Правила сайта</a>
                <a href="/_nuxt/assets/docs/Политика конфиденциальности.docx" class="footer-link" target="_blank">Политика конфиденциальности</a>
                <a href="/_nuxt/assets/docs/Реквизиты.pdf" class="footer-link" target="_blank">Наши реквизиты</a>
                <a href="/contact" class="footer-link">Контакты</a>
                <a href="/_nuxt/assets/docs/Договор_оферты.docx" class="footer-link" target="_blank">Договор оферты</a>
              </div>
              <!-- /.footer-end-block -->
            </div>
            <!-- /.footer-item -->
          </div>
          <!-- /.footer-block -->
        </div>
        <!-- /.vak -->

      </div>
      <!-- /.main-block-two -->

    </div>
    <!-- /.main-content main-content-two -->

  </div>
</template>

<script setup>
  const currentDate = new Date
</script>

<style lang="scss" scoped>

</style>