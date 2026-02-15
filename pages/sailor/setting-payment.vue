<template>
  <ClientOnly>
    <NuxtLayout class="section-hero section-hero-post section-back-none main" name="custom" v-if="false">
    <section class="section-about">
    <div class="container">
        <div class="about">
         <div class="set-top">
            <a href="" class="set-top-link">
                <span>←</span>
                <div>Назад</div>
            </a>
            <!-- /.set-top-link -->

            <h1 class="set-title about-title title-active">
                Настройки оплаты
            </h1>
            <!-- /.set-title -->
            <div></div>
         </div>
         <!-- /.set-top -->

         <div class="set-block">
            <div class="set-part">
                <div class="set-subtitle">Автоматическое пополнение счета</div>
                <!-- /.set-subtitle -->
                <div class="set-text">Автоматическое пополнение счета - это ежемесячное списание средств с Вашей карты оплаты на счет Вашего аккаунта. Если установлен флаг "Разрешить автоматическое попполнение счета", то при переходе баланса отметки в 199 рублей, мы попытаемся списать деньги с Вашей карты в размере стоимости обслуживания на 30 дней, согласно вашему тарфиному плану. Это удобно для тех, кто хочет, чтобы на его балансе всегда были средства для оперативного продления статуса «Ищу работу».</div>
                <!-- /.set-text -->
                <div class="set-dop">
                    <div class="set-dop-content">
                        <img src="assets/img/dop-page/set-icon-1.svg" alt="image" class="set-dop-img">
                        <div class="set-dop-text">Разрешить Автоматическое пополнение баланса</div>
                        <!-- /.set-dop-text -->
                    </div>
                    <!-- /.set-dop-content -->
                </div>
                <!-- /.set-dop -->
            </div>
            <!-- /.set-part -->
            <div class="set-part">
                <div class="set-subtitle">Автоматическое продление статуса «Ищу работу»</div>
                <!-- /.set-subtitle -->
                <div class="set-text">Автоматическое продление статуса «Ищу работу» - это ежемесячное списание средств с Вашего баланса для продления статуса «Ищу работу». Если установлен флаг "Разрешить автоматическое продления статуса «Ищу работу", то при окончании статуса, мы попытаемся списать деньги с Вашего баланса в размере стоимости тарфиного плана. Это удобно для тех, кто хочет, чтобы его статус не заканчивался.</div>
                <!-- /.set-text -->
                <div class="set-dop">
                    <div class="set-dop-content">
                        <img src="assets/img/dop-page/set-icon-2.svg" alt="image" class="set-dop-img">
                        <div class="set-dop-text">Разрешить автоматическое продление статуса «Ищу работу»</div>
                        <!-- /.set-dop-text -->
                    </div>
                    <!-- /.set-dop-content -->
                </div>
                <!-- /.set-dop -->
            </div>
            <!-- /.set-part -->
         </div>
         <!-- /.set-block -->
            
        </div>
        <!-- /.about -->
    </div>
    <!-- /.container -->
</section>
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