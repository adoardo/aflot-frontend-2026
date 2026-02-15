<template>
  <ClientOnly>
    <NuxtLayout name="admin">
      <main class="main cabinet vak-edit">
        <div class="container">
          <div
            style="
              color: #3b45a9;
              font-size: 15px;
              text-transform: uppercase;
              letter-spacing: 5.4px;
            "
          >
            Редактирование вакансии
          </div>
          <div class="flex-title" style="margin-top: 0">
            <h1>Старший помощник капитана</h1>
            <div>от 23 декабря 2023</div>
          </div>
          <div class="vak-edit-block">
            <div class="vak-edit-left">
              <h2>Основные данные:</h2>
              <div class="resume-grid col2">
                <div class="tag-input tag-input-all">
                  <div class="tag-input__label">Должность</div>

                  <div class="tag-input-title">Старший помощник капитана</div>
                  <!-- /.tag-input-title -->
                </div>

                <div class="input">
                  <label for="">Зарплата</label>
                  <div class="input-block-zp">
                    <input type="number" value="" placeholder="От" />
                    <input type="number" value="" placeholder="До" />
                  </div>
                </div>

                <div class="input">
                  <label for="">Дата посадки:</label>
                  <input type="date" value="" />
                </div>
                <div class="input input-date-contract">
                  <label for="">Период посадки:</label>
                  <select name="" id="">
                    <option value="">1 месяц</option>
                    <option value="">1-2 месяца</option>
                    <option value="">2-3 месяца</option>
                    <option value="">3-4 месяца</option>
                    <option value="">4-5 месяцев</option>
                    <option value="">5-6 месяцев</option>
                    <option value="">6 месяцев и более</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- /.vak-edit-left -->
            <div class="vak-sudno-list">
              <h2 class="with-subtitle">
                Судно:
                <div class="tag-input__item">
                  EVER GIVEN IMO 9811000
                  <button class="tag-input__delete">
                    <img src="assets/img/resume/close.svg" alt="delete" />
                  </button>
                </div>
              </h2>
              <p>
                Для добавления судна, введите IMO или название судна в строку поиска, а
                далее, выберите подходящий из списка.
              </p>
            </div>
          </div>

          <div class="vabout-info vabout-info-vak">
            <div class="vabout-item">
              <div class="vabout-subtitle">Название судна:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">EVER GIVEN</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->
            <div class="vabout-item">
              <div class="vabout-subtitle">Тип судна:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">Контейнеровоз</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->
            <div class="vabout-item">
              <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">199 489</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->
            <div class="vabout-item">
              <div class="vabout-subtitle">Длина</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">399 m / 1309 ft</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->
            <div class="vabout-item">
              <div class="vabout-subtitle">IMO:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">9811000</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->

            <div class="vabout-item">
              <div class="vabout-subtitle">Год постройки:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">2018</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->

            <div class="vabout-item">
              <div class="vabout-subtitle">kW - двигательная установка:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">-</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->

            <div class="vabout-item">
              <div class="vabout-subtitle">Ширина:</div>
              <!-- /.vabout-subtitle -->
              <div class="vabout-subtext">59 m / 194 ft</div>
              <!-- /.vabout-subtext -->
            </div>
            <!-- /.vabout-item -->
          </div>

          <h2 class="with-subtitle">Контактная информация вакансий:</h2>
          <div class="resume-grid col2 vak-edit-contact">
            <div class="input">
              <label for="">ФИО контактного лица</label>
              <input type="text" value="Иванов Иван Иванович" placeholder="" />
            </div>
            <div class="input">
              <label for="">E-mail</label>
              <input type="text" value="ivanov@company.ru" placeholder="" />
            </div>
            <div class="input">
              <label for="">Телефон №1</label>
              <input type="text" value="+7 912 863 89 41" placeholder="+7 812 777 77 77" />
            </div>
            <div class="input">
              <label for="">Телефон №2</label>
              <input type="text" value="" placeholder="+7 812 777 77 77" />
            </div>
          </div>
        </div>
      </main>

      <div class="resume-buttons">
        <button class="primary">Сохранить</button>
        <button class="secondary">Сбросить</button>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["company"],
})
</script>

<style lang="scss" scoped></style>
