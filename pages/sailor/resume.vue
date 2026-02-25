<template>
  <ClientOnly>
    <NuxtLayout name="default-hero">
      <div style="background-color: #fff">
        <AfHeaderColor />
      </div>
      <section id="resume" class="main cabinet">
        <div class="container">
          <div class="tabs">
            <div class="tab-header">
              <a
                  href="#resumes"
                  class="tab-label"
                  @click="activeTab = 'resumes'"
                  :class="{ active: activeTab === 'resumes' }"
              >
                Резюме
              </a>
              <a
                  href="#settings"
                  class="tab-label"
                  @click="activeTab = 'settings'"
                  :class="{ active: activeTab === 'settings' }"
              >
                Настройки профиля
              </a>
            </div>
          </div>
        </div>

        <!-- ===================== TAB: RESUMES ===================== -->
        <div class="tab-body" v-if="activeTab == 'resumes'">
          <div class="container resume-cuntainer" @click="showTarifDropdown = false">
            <h1>Статус</h1>
            <div class="resume-status">
              <!-- current -->
              <div
                  class="resume-status__current"
                  :class="tarifClass"
                  @click.stop="showTarifDropdown = !showTarifDropdown"
              >
                <span>{{ tarifNorm }}</span>
                <span class="resume-status__arrow">▾</span>
              </div>

              <!-- dropdown -->
              <div
                  v-if="showTarifDropdown"
                  class="resume-status__dropdown"
                  @click.stop
              >
                <label class="custom-checkbox mor-checkbox">
                  <input
                      class="status-checkbox"
                      type="radio"
                      name="status_profile"
                      value="Ищу работу"
                      v-model="formData.tarif"
                      @change="onTarifChange"
                  />
                  <span class="checkmark"></span>
                  Ищу работу
                </label>

                <label class="custom-checkbox mor-checkbox">
                  <input
                      class="status-checkbox"
                      type="radio"
                      name="status_profile"
                      value="Рассмотрю предложение"
                      v-model="formData.tarif"
                      @change="onTarifChange"
                  />
                  <span class="checkmark"></span>
                  Рассмотрю предложение
                </label>

                <label class="custom-checkbox mor-checkbox">
                  <input
                      class="status-checkbox"
                      type="radio"
                      name="status_profile"
                      value="Трудоустроен"
                      v-model="formData.tarif"
                      @change="onTarifChange"
                  />
                  <span class="checkmark"></span>
                  Трудоустроен
                </label>
              </div>
            </div>

            <div class="resume-main">
              <div class="resume-avatar">
                <input
                    type="file"
                    name="photo_path"
                    id="photo_path_change"
                    accept="image/png, image/jpeg, image/webp"
                    class="hidden-input"
                    @change="upload($event, 'photo_path')"
                />

                <img
                    class="avatar"
                    v-if="formData.photo_path"
                    style="position: absolute"
                    :src="createObjectURL(formData.photo_path)"
                    alt="Аватар"
                />

                <span v-else>
                  {{ formData.last_name.substring(0, 1).toUpperCase() }}
                  {{ formData.first_name.substring(0, 1).toUpperCase() }}
                </span>

                <button
                    @click="changeAvatar()"
                    class="change-av-button header-menu__button"
                    style="bottom: -18px !important"
                >
                  Выбрать изображение
                </button>

                <button
                    v-if="formData.photo_path"
                    class="delete"
                    @click="deleteAvatar()"
                >
                  Удалить изображение
                </button>
              </div>

              <div class="resume-grid">
                <AfInput
                    label="Фамилия"
                    type="text"
                    v-model="formData.last_name"
                    :error="v$.last_name.$error && v$.last_name.required.$invalid"
                />

                <AfInput
                    label="Имя"
                    type="text"
                    v-model="formData.first_name"
                    :error="v$.first_name.$error && v$.first_name.required.$invalid"
                />

                <div class="input">
                  <label for="">Отчество</label>
                  <input type="text" v-model="formData.patronymic" />
                </div>

                <div class="input">
                  <label for="">Страна (где находитесь)</label>
                  <input type="text" v-model="formData.country" />
                </div>

                <div class="input region-field" @pointerdown.stop>
                  <label>Регион</label>

                  <div class="region-select" @pointerdown.stop="showTarifDropdown=false; openRegionDropdown()">
                    <input
                        type="text"
                        v-model="regionSearch"
                        placeholder="Начните вводить регион"
                        @focus="openRegionDropdown"
                        @input="openRegionDropdown"
                        @pointerdown.stop
                    />
                    <span class="chevron">▾</span>
                  </div>

                  <div v-if="showRegionDropdown" class="resume-status__dropdown region-dropdown" @pointerdown.stop>
                    <div
                        v-for="r in filteredRegions[0].option_values"
                        :key="regionKey(r)"
                        class="dropdown-item"
                        @pointerdown.prevent="selectRegion(r)"
                    >
                      {{ regionLabel(r) }}
                    </div>

                    <div v-if="filteredRegions.length === 0" class="dropdown-empty">
                      Ничего не найдено
                    </div>
                  </div>
                </div>


                <div class="input">
                  <label for="">Город</label>
                  <input type="text" v-model="formData.city" />
                </div>

                <div class="input">
                  <label for="">Дата рождения</label>
                  <VueDatePicker v-model="formData.birth_date" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">
                    <template #input-icon>

                    </template>
                  </VueDatePicker>
                </div>

                <div class="input">
                  <label for="">Контактный телефон</label>
                  <input type="text" v-model="formData.phone_number" />
                </div>
              </div>
            </div>

            <div class="tag-input userSelUnput-wrap" style="margin-top: 30px">
              <AfDropDox
                  v-model="formData.positions"
                  :options-list="getAfJobs"
                  title="Должность, которую рассматриваете (выбор из списка)"
              />
              <AfDropDox
                  v-model="formData.worked"
                  :options-list="getAfShips"
                  title="Работал на судах (выбрать типа судов из списка)"
              />
            </div>

            <h2>Основные документы:</h2>
            <div class="docs-block-table docs-block-table-main">
              <div class="docs">
                <div class="docs__head">Название:</div>
                <div class="docs__head">Данные:</div>

                <div class="docs__label">Заграничный паспорт</div>
                <div class="docs__value_datepicker" :class="{' red-bg':  !passportDateValidate,  'blue-bg': passportDateValidate}">
                  <VueDatePicker @update:modelValue="handleChangePassport" :class="'pass-date'" v-model="formData.main_documents.foreign_passport" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                  </VueDatePicker>

                  <div v-if="!passportDateValidate && formData.main_documents.foreign_passport" class="info">
                    <img src="assets/img/resume/alert.svg" alt="" />
                    <span>Срок действия истек! Заменить можно <a target="_blank" href="#">здесь</a></span>
                  </div>

                  <div v-if="v$.main_documents.foreign_passport.$error && v$.main_documents.foreign_passport.required.$invalid" class="input-error">
                    <span>Пожалуйста, заполните поле</span>
                  </div>

                </div>

                <div class="docs__label">Удостоверение личности моряка</div>
                <div class="docs__value">
                  <AfInput
                      place="Введите данные"
                      type="text"
                      v-model="formData.main_documents.seafarers_ID_card"
                      :error="v$.main_documents.seafarers_ID_card.$error && v$.main_documents.seafarers_ID_card.required.$invalid"
                  />
                </div>



                <div class="docs__label">Диплом/ Свидетельство</div>
                <div class="docs__value_datepicker" :class="{' red-bg':  !diplomaDateValidate,  'blue-bg': diplomaDateValidate}">
                  <VueDatePicker @update:modelValue="handleChangeDiploma" :class="'pass-date'" v-model="formData.main_documents.diploma" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                  </VueDatePicker>

                  <div v-if="v$.main_documents.diploma.$error && v$.main_documents.diploma.required.$invalid" class="input-error">
                    <span>Пожалуйста, заполните поле</span>
                  </div>
                </div>

                <div class="docs__label">Начальная подготовка по безопасности</div>
                <div class="docs__value">
                  <AfInput
                      place="Введите данные"
                      type="text"
                      v-model="formData.main_documents.initial_safety_training"
                      :error="v$.main_documents.initial_safety_training.$error && v$.main_documents.initial_safety_training.required.$invalid"
                  />
                </div>

                <div class="docs__label">Назначенные обязанности по охране</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.designated_safeguarding_responsibilities"
                  />
                </div>

                <div class="docs__label">Специалист по шлюпкам и плотам</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.dinghy_and_raft_specialist"
                  />
                </div>
              </div>

              <div class="docs">
                <div class="docs__head">Название:</div>
                <div class="docs__head">Данные:</div>

                <div class="docs__label">Борьба с пожаром по расширенной программе</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.fighting_fire_with_an_expanded_program"
                  />
                </div>

                <div class="docs__label">Оказание первой медицинской помощи</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.providing_first_aid"
                  />
                </div>

                <div class="docs__label">Предотвращение загрязнения моря</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.prevention_of_marine_pollution"
                  />
                </div>

                <div class="docs__label">Танкерное свидетельство</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.tanker_certificate"
                  />
                </div>

                <div class="docs__label">Охрана труда</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.occupational_health_and_safety"
                  />
                </div>

                <div class="docs__label">Медицинская комиссия</div>
                <div class="docs__value">
                  <input
                      type="text"
                      placeholder="Введите данные"
                      v-model="formData.main_documents.medical_commission"
                  />
                </div>
              </div>
            </div>

            <div class="docs-block-table">
              <div class="docs-block-item">
                <h2>
                  <div class="check">
                    <img src="assets/img/resume/check.svg" alt="check" />
                  </div>
                  Документы судоводителей:
                </h2>

                <div class="docs">
                  <div class="docs__head">Название:</div>
                  <div class="docs__head">Действительно до:</div>

                  <div class="docs__label">ГМССБ</div>
                  <div class="docs__value_datepicker" :class="{' red-bg':  !gmssbDateValidate,  'blue-bg': gmssbDateValidate}">
                    <VueDatePicker @update:modelValue="handleChangeGmssb" :class="'pass-date'" v-model="formData.shipwrights_papers.gmssb" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                    </VueDatePicker>
                    <div v-if="!gmssbDateValidate && formData.shipwrights_papers.gmssb" class="info">
                      <img src="assets/img/resume/alert.svg" alt="" />
                      <span>Срок действия истек! Заменить можно <a target="_blank" href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">ЭКНИС</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.shipwrights_papers.eknis" />
                  </div>

                  <div class="docs__label">РЛТ</div>
                  <div class="docs__value_datepicker" :class="{' red-bg':  !rltDateValidate,  'blue-bg': rltDateValidate}">
                    <VueDatePicker @update:modelValue="handleChangeRlt" :class="'pass-date'" v-model="formData.shipwrights_papers.rlt" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                    </VueDatePicker>
                    <div v-if="!rltDateValidate && formData.shipwrights_papers.rlt" class="info">
                      <img src="assets/img/resume/alert.svg" alt="" />
                      <span>Срок действия истек! Заменить можно <a target="_blank" href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">САРП</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.shipwrights_papers.sarp" />
                  </div>
                </div>
              </div>

              <div class="docs-block-item">
                <h2>
                  <div class="check">
                    <img src="assets/img/resume/check.svg" alt="check" />
                  </div>
                  Дополнительные документы:
                </h2>

                <div class="docs">
                  <div class="docs__head">Название:</div>
                  <div class="docs__head">Действительно до:</div>

                  <div class="docs__label">Изолирующие дыхательные приборы</div>
                  <div class="docs__value_datepicker" :class="{' red-bg':  !isolation_breathing_apparatusDateValidate,  'blue-bg': isolation_breathing_apparatusDateValidate}">
                    <VueDatePicker @update:modelValue="handleChangeIsolationBreathingApparatus" :class="'pass-date'" v-model="formData.additional_documents.isolation_breathing_apparatus" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                    </VueDatePicker>
                    <div v-if="!isolation_breathing_apparatusDateValidate && formData.additional_documents.isolation_breathing_apparatus" class="info">
                      <img src="assets/img/resume/alert.svg" alt="" />
                      <span>Срок действия истек! Заменить можно <a target="_blank" href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">Военно-морская подготовка</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.additional_documents.naval_training" />
                  </div>

                  <div class="docs__label">Транспортная безопасность</div>
                  <div class="docs__value_datepicker" :class="{' red-bg':  !transportation_safetyDateValidate,  'blue-bg': transportation_safetyDateValidate}">
                    <VueDatePicker @update:modelValue="handleChangeTransportationSafety" :class="'pass-date'" v-model="formData.additional_documents.transportation_safety" hide-input-icon auto-apply :time-config="{ enableTimePicker: false }" :formats="{month: 'LLL', year: 'yyyy', day: 'dd', input: 'dd.MM.yyyy', preview: undefined}" :locale="ru">

                    </VueDatePicker>
                    <div v-if="!transportation_safetyDateValidate && formData.additional_documents.transportation_safety" class="info">
                      <img src="assets/img/resume/alert.svg" alt="" />
                      <span>Срок действия истек! Заменить можно <a target="_blank" href="#">здесь</a></span>
                    </div>
                  </div>

                  <div class="docs__label">Танкерное свидетельство</div>
                  <div class="docs__value">
                    <input type="text" placeholder="Введите данные" v-model="formData.additional_documents.tanker_certificate" />
                  </div>
                </div>
              </div>
            </div>

            <h2 class="with-subtitle">Опыт работы:</h2>
            <div class="cabinet-subtitle">
              <img src="assets/img/resume/info.png" alt="info" />
              Система автоматически сортирует вакансии по периоду работы, в порядке убывания,
              от сегоднянешго (последнего) к годам ранее. Заполняйте информацию, в удобном для Вас порядке.
            </div>

            <div class="resume-experience">
              <table>
                <thead>
                <tr>
                  <th>Судовладелец</th>
                  <th>Тип судна</th>
                  <th>Название судна</th>
                  <th>Должность</th>
                  <th>Период работы</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in itemsWork" :key="index">
                  <td data-title="Судовладелец">
                    <input v-model="item.shipowner" type="text" placeholder="Введите данные" />
                  </td>
                  <td data-title="Тип судна">
                    <input v-model="item.type_of_vessel" type="text" placeholder="Введите данные" />
                  </td>
                  <td data-title="Название судна">
                    <input v-model="item.ships_name" type="text" placeholder="Введите данные" />
                  </td>
                  <td data-title="Должность">
                    <input v-model="item.position" type="text" placeholder="Введите данные" />
                  </td>
                  <td data-title="Период работы">
                    <div class="wne-dates">
                        <span>
                          <label>с</label>
                          <input v-model="item.period_of_work_from" type="date" placeholder="с" />
                        </span>
                      <span>
                          <label>по</label>
                          <input v-model="item.period_of_work_to" type="date" placeholder="по" />
                        </span>
                    </div>
                  </td>
                  <td class="resume-experience__delete">
                    <button @click="deleteWorkExpierience(index)">
                      <img src="assets/img/resume/delete.png" alt="delete" />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <button @click="addWorkExpierience" class="resume-experience__add">
                      <span>+</span>
                      Добавить место работы
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <h2 class="with-subtitle">Ваши файлы:</h2>
            <div class="cabinet-subtitle">
              Вы можете прикрепить дополнительную информацию, к примеру файл с резюме,
              эти файлы будут видны работодателю.
            </div>

            <div class="files">
              <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded_file">
                <a :href="createObjectURL(file)" target="_blank" style="color: #3b45a9">
                  <NuxtLink style="font-size: 14px; color: #3b45a9">
                    {{ file.name || getFileName(file) }}
                  </NuxtLink>
                </a>
                <button @click="deleteUploadedFile(index)">
                  <img style="min-width: 26px" src="assets/img/resume/delete.png" alt="delete" />
                </button>
              </div>

              <div v-if="uploadedFiles.length < 10" style="max-height: 26px" class="file upload">
                <input
                    id="media_file"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    class="hidden-input"
                    @change="upload($event, 'media_files')"
                />

                <div class="file__icon">
                  <img src="assets/img/resume/file.png" alt="file" />
                </div>
                <div class="file__label">Загрузить файл</div>
              </div>
            </div>

            <h2 class="with-subtitle">Ваше резюме:</h2>
            <div class="cabinet-subtitle">
              На основе заполненных Вами данных, мы сформировали для Вас резюме,
              которое вы можете скачать в формате PDF.
            </div>

            <div class="files">
              <div class="file af-show-resume-button">
                <div @click="router.push('/sailor/' + userProfileId.resumeID)" class="file__label">
                  Посмотреть свое резюме
                </div>
              </div>
            </div>
          </div>

          <div class="resume-buttons">
            <button @click="saveResume" class="primary">Сохранить</button>
            <button @click="resetResume" class="secondary">Сбросить</button>
          </div>
        </div>

        <!-- ===================== TAB: SETTINGS ===================== -->
        <div class="tab-body" v-if="activeTab === 'settings'">
          <div class="container">
            <h1>Контактные данные и уведомления</h1>

            <div class="resume-grid col2 resume-contact-setting">
              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-phone.png" alt="phone" />
                </div>
                <div class="resume-contact__content completed">
                  {{ userInfo.info.phone_number }}
                  <img src="assets/img/resume/check.svg" alt="done" />
                </div>
              </div>
              <div class="resume-contact__second">
                <!-- <AfCheckbox
                  v-model="formData.notification_settings.send_sms"
                  :descText="'Присылайте мне '"
                  :linkText="'уведомления на телефон'"
                /> -->
              </div>

              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-mail.png" alt="phone" />
                </div>
                <div v-if="!is_verified" class="resume-contact__content">
                  {{ userInfo.info.email }}
                  <a @click="confirmEmail(userInfo.info.email)">Подтвердить</a>
                </div>
                <div v-else class="resume-contact__content completed">
                  {{ userInfo.info.email }}
                  <img src="assets/img/resume/check.svg" alt="done" />
                </div>
              </div>
              <div class="resume-contact__second">
                <AfCheckbox
                    v-model="formData.notification_settings.send_email"
                    :descText="'Присылайте мне '"
                    :linkText="'уведомления на почту'"
                />
              </div>

              <div class="resume-contact">
                <div class="resume-contact__icon">
                  <img src="assets/img/resume/icon-tg.png" alt="phone" />
                </div>

                <TelegramConnect v-if="!is_tg" />

                <div v-if="!is_tg" style="cursor: pointer" class="resume-contact__content empty forTg">
                  Подключить Telegram
                </div>
                <div v-if="is_tg" class="resume-contact__content empty tg-approved" style="cursor: default">
                  Telegram подключен<img src="assets/img/resume/check.svg" alt="done" />
                </div>
              </div>
              <div class="resume-contact__second">
                <AfCheckbox
                    v-model="formData.notification_settings.send_telegram"
                    :descText="'Присылайте мне '"
                    :linkText="'уведомления в Telegram'"
                />
              </div>
            </div>

            <h2 class="with-subtitle">Рассылка</h2>

            <label class="custom-checkbox">
              <input type="checkbox" v-model="formData.notification_settings.mailing_notification" />
              <span class="checkmark"></span>
              Хочу получать <a href="#">рассылку по новым вакансиям</a> для выбранных должностей
            </label>

            <h2>Безопасность</h2>

            <div class="resume-password">
              <button class="resume-action-btn" @click="toggleModal('changephone')" v-if="false">
                <div class="resume-action-left">
                  <img src="assets/img/resume/icon-phone.png" alt="phone" />
                  <span>Изменить номер телефона</span>
                </div>
              </button>

              <button class="resume-action-btn" @click="toggleModal('changeinfo')">
                <div class="resume-action-left">
                  <img src="assets/img/resume/icon-mail.png" alt="email" />
                  <span>Изменить Email</span>
                </div>
              </button>

              <button class="resume-action-btn" @click="openModal('approveTGDisconnect')">
                <div class="resume-action-left">
                  <img src="assets/img/resume/icon-tg.png" alt="telegram" />
                  <span>Отключить Telegram</span>
                </div>
              </button>
            </div>
          </div>

          <div class="resume-buttons">
            <button @click="saveResume" class="primary">Сохранить</button>
            <button @click="resetResume" class="secondary">Сбросить</button>
          </div>
        </div>
      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({ middleware: ["sailor"] });

import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import api from "@/api/api";

import AfHeaderColor from "@/components/AfHeaderColor.vue"; // if auto-import exists you can remove
import AfInput from "@/components/uikit/AfInput";
import AfCheckbox from "@/components/uikit/AfCheckbox2";
import AfDropDox from "@/components/uikit/AfDropDox";
import TelegramConnect from "~/components/TelegramConnect.vue";

import { useModalStore } from "~/store/modal";
import { useUsersStore } from "~/store/useUserStore";
import { useGlobalSettings } from "~/store/useGlobalSettings";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";

import { VueDatePicker } from '@vuepic/vue-datepicker';
import ru from "date-fns/locale/ru";
import '@vuepic/vue-datepicker/dist/main.css'

import useVuelidate from "@vuelidate/core";
import {required, email, minLength} from "@vuelidate/validators";

const router = useRouter();
const { $uploadFile, $deleteFile } = useNuxtApp();

const FILE_KEYS = ["photo_path", "media_files"];

const userStore = useUsersStore();
const { userInfo, isTg, isVk, userProfileId } = storeToRefs(userStore);

const { openModal, toggleModal } = useModalStore();

const globalSettings = useGlobalSettings();
const { getAfShips, getAfJobs ,getAfRegionsRussia } = storeToRefs(globalSettings);

const activeTab = ref("resumes");
const showTarifDropdown = ref(false);
const showRegionDropdown = ref(false);
const regionSearch = ref("");
const is_verified = ref(false);
const is_tg = ref(false);

const resume = ref({});
const deletedFiles = ref([]);
const uploadedFiles = ref([]);
const itemsWork = ref([]);

// -------------------- TARIF FIX (normalize + map) --------------------
const normalizeTarif = (v) => {
  const s = String(v || "").trim();
  // unify possible backend variants:
  if (s === "Рассмотрю предложение") return "Рассмотрю предложение";
  if (!s) return "Ищу работу";
  return s;
};

const TARIF_META = {
  "Ищу работу": { code: "1" },
  "Рассмотрю предложение": { code: "2" },
  "Трудоустроен": { code: "3" },
};



const rules = {
  first_name: {required},
  last_name: {required},
  main_documents: {
    foreign_passport: {required},
    seafarers_ID_card: {required},
    diploma: {required},
    initial_safety_training: {required}
  }
};

const passportDateValidate = ref(true)
const diplomaDateValidate = ref(true)

const gmssbDateValidate = ref(true)
const rltDateValidate = ref(true)
const isolation_breathing_apparatusDateValidate = ref(true)
const transportation_safetyDateValidate = ref(true)


const formData = ref({
  photo_path: null,
  avatar: null,
  positions: [],
  worked: [],
  media_files: [],
  first_name: "",
  last_name: "",
  patronymic: "",
  tarif: "Ищу работу",
  birth_date: "",
  phone_number: "",
  country: "",
  region: "",
  city: "",
  main_documents: {
    seafarers_ID_card: ""
  },
  shipwrights_papers: {},
  additional_documents: {},
  working_experience_new: [],
  notification_settings: {
    send_email: false,
    send_sms: false,
    send_telegram: false,
    mailing_notification: false,
  },
});

const v$ = useVuelidate(rules, formData);
function prepareServerDate(date) {
    if (date.toLocaleDateString) {
      let tmp = date.toLocaleDateString('en-Us', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      //YYYY-MM-DD
      let tmp2 = tmp.split('/');
      return tmp2[2] + '-' + tmp2[1] + '-' + tmp2[0];
    } else {
      let tmp2 = date.split('-');
      return tmp2[0] + '-' + tmp2[1] + '-' + tmp2[2];
    }

}

const tarifNorm = computed(() => normalizeTarif(formData.value.tarif));

const tarifClass = computed(() => ({
  "vabout-bwork": tarifNorm.value === "Ищу работу",
  "vabout-bwork-blue": tarifNorm.value === "Рассмотрю предложение",
  "vabout-bwork-grey": tarifNorm.value === "Трудоустроен",
}));

const onTarifChange = async () => {
  formData.value.tarif = normalizeTarif(formData.value.tarif);
  showTarifDropdown.value = false;

  const meta = TARIF_META[formData.value.tarif];
  if (!meta) return;

  try {
    await api.post(`/change-tarif/${meta.code}`);
  } catch (e) {
    console.error("change-tarif failed:", e);
  }
};
// --------------------------------------------------------------------

const confirmEmail = async (email) => {
  openModal("confirmemail");
  try {
    await api.post("/change_password", { email, type: "confirm_email" });
  } catch (error) {
    console.error("Error during verification:", error);
  }
};

function prepareRealDate(date) {
  let tmp = date.split('-');
  return tmp[0] + '-' + tmp[2] + '-' + tmp[1];
}
async function getResume() {
  const { data } = await api.get("/resume");
  resume.value = data;

  if (resume.value.birth_date) {
    resume.value.birth_date = prepareRealDate(resume.value.birth_date);
  }

  formData.value = resume.value || {};
  formData.value.tarif = normalizeTarif(formData.value.tarif);

  if (!Array.isArray(formData.value.working_experience_new)) {
    formData.value.working_experience_new = [];
  }

  uploadedFiles.value = formData.value.media_files || [];
  itemsWork.value = formData.value.working_experience_new || [];
}

const loadVerification = async () => {
  try {
    const { data } = await api.post("/getVerification", {
      email: userInfo?.value?.info?.email,
    });
    is_verified.value = data?.is_verified;
    is_tg.value = data?.is_tg;
  } catch (e) {
    console.error("getVerification failed:", e);
  }
};


const onOutsidePointerDown = () => {
  showRegionDropdown.value = false;
  showTarifDropdown.value = false; // if you want also close tarif
};


onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onOutsidePointerDown, true);
});

const regions = computed(() => getAfRegionsRussia?.value || []);

// supports string[] or object[]
const regionLabel = (r) =>
    typeof r === "string" ? r : (r?.name ?? r?.title ?? r?.label ?? "");

const regionKey = (r) =>
    typeof r === "string" ? r : (r?.id ?? regionLabel(r));

const filteredRegions = computed(() => {
  const q = regionSearch.value.trim().toLowerCase();
  console.log(regions , "aadasdasdasdasd")
  if (!q) return regions.value;

  return regions.value.filter((r) =>
      regionLabel(r).toLowerCase().includes(q)
  );
});

const selectRegion = (r) => {
  const val = regionLabel(r);
  formData.value.region = val;
  regionSearch.value = val;
  showRegionDropdown.value = false;
};
const openRegionDropdown = () => {
  showRegionDropdown.value = true;
};
onMounted(async () => {
  document.body.classList.add("bg-white");
  document.addEventListener("pointerdown", onOutsidePointerDown, true);

  const url = useRequestURL();
  activeTab.value = url.href.includes("settings") ? "settings" : "resumes";

  await loadVerification();
  await getResume();

  regionSearch.value = formData.value.region || "";
});


const changeAvatar = () => {
  document.getElementById("photo_path_change")?.click();
};

const prepareDataForSending = () => {
  return {
    ...formData.value,
    tarif: normalizeTarif(formData.value.tarif),
    positions: formData.value.positions,
    worked: formData.value.worked,
    working_experience_new: itemsWork.value,
    media_files: [...uploadedFiles.value],
  };
};

const handleChangePassport = async() => {

  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.main_documents.foreign_passport).getTime();
    if (tmp > today) {
      passportDateValidate.value = true;
    } else {
      passportDateValidate.value = false;
    }
  }, 100)
}
handleChangePassport();
const handleChangeDiploma = async() => {
  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.main_documents.diploma).getTime();
    if (tmp > today) {
      diplomaDateValidate.value = true;
    } else {
      diplomaDateValidate.value = false;
    }
  }, 100)
}
handleChangeDiploma();



const handleChangeGmssb = async() => {

  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.shipwrights_papers.gmssb).getTime();
    if (tmp > today) {
      gmssbDateValidate.value = true;
    } else {
      gmssbDateValidate.value = false;
    }
  }, 100)
}
handleChangeGmssb();
const handleChangeRlt = async() => {

  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.shipwrights_papers.rlt).getTime();
    if (tmp > today) {
      rltDateValidate.value = true;
    } else {
      rltDateValidate.value = false;
    }
  }, 100)
}
handleChangeRlt();
const handleChangeIsolationBreathingApparatus = async() => {

  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.additional_documents.isolation_breathing_apparatus).getTime();
    if (tmp > today) {
      isolation_breathing_apparatusDateValidate.value = true;
    } else {
      isolation_breathing_apparatusDateValidate.value = false;
    }
  }, 100)
}
handleChangeIsolationBreathingApparatus();
const handleChangeTransportationSafety = async() => {

  setTimeout(() => {
    let tmpMoscow = new Date();
    tmpMoscow = tmpMoscow.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    let today = new Date(tmpMoscow);

    let tmp = new Date(formData.value.additional_documents.transportation_safety).getTime();
    if (tmp > today) {
      transportation_safetyDateValidate.value = true;
    } else {
      transportation_safetyDateValidate.value = false;
    }
  }, 100)
}
handleChangeTransportationSafety();





const saveResume = async () => {
  const dataToSubmit = prepareDataForSending();

  await Promise.all(
      FILE_KEYS.map(async (fileKey) => {
        if (dataToSubmit[fileKey] instanceof File) {
          const fileUrl = await $uploadFile(dataToSubmit[fileKey]).then((res) => res);
          dataToSubmit[fileKey] = fileUrl;
        }

        if (fileKey === "media_files") {
          await Promise.all(
              dataToSubmit.media_files.map(async (file, i) => {
                if (file instanceof File) {
                  const fileUrl = await $uploadFile(file).then((res) => res);
                  dataToSubmit.media_files[i] = fileUrl;
                }
              })
          );
        }
      })
  );

  if (dataToSubmit.birth_date) {
    dataToSubmit.birth_date = prepareServerDate(dataToSubmit.birth_date);
  } else {
    dataToSubmit.birth_date = null;
  }

  if (dataToSubmit.main_documents.foreign_passport) {
    dataToSubmit.main_documents.foreign_passport = prepareServerDate(dataToSubmit.main_documents.foreign_passport);
  } else {
    dataToSubmit.main_documents.foreign_passport = null;
  }

  if (dataToSubmit.main_documents.diploma) {
    dataToSubmit.main_documents.diploma = prepareServerDate(dataToSubmit.main_documents.diploma);
  } else {
    dataToSubmit.main_documents.diploma = null;
  }

  if (dataToSubmit.shipwrights_papers.gmssb) {
    dataToSubmit.shipwrights_papers.gmssb = prepareServerDate(dataToSubmit.shipwrights_papers.gmssb);
  } else {
    dataToSubmit.shipwrights_papers.gmssb = null;
  }

  if (dataToSubmit.shipwrights_papers.rlt) {
    dataToSubmit.shipwrights_papers.rlt = prepareServerDate(dataToSubmit.shipwrights_papers.rlt);
  } else {
    dataToSubmit.shipwrights_papers.rlt = null;
  }

  if (dataToSubmit.additional_documents.isolation_breathing_apparatus) {
    dataToSubmit.additional_documents.isolation_breathing_apparatus = prepareServerDate(dataToSubmit.additional_documents.isolation_breathing_apparatus);
  } else {
    dataToSubmit.additional_documents.isolation_breathing_apparatus = null;
  }

  if (dataToSubmit.additional_documents.transportation_safety) {
    dataToSubmit.additional_documents.transportation_safety = prepareServerDate(dataToSubmit.additional_documents.transportation_safety);
  } else {
    dataToSubmit.additional_documents.transportation_safety = null;
  }


  //alert(dataToSubmit.birth_date);

  v$.value.$touch();

  if (!v$.value.$error) {
    await api.put("/resume", dataToSubmit).then(() => {
      deletedFiles.value.forEach(async (file) => {
        await $deleteFile(file);
      });
      deletedFiles.value = [];
      window.location.reload();
    });
  } else {
    if (v$.value.main_documents.$error) {
      $('html, body').animate({
        scrollTop: $(".docs-block-table-main").offset().top
      }, 300);
    } else {
      $('html, body').animate({
        scrollTop: $(".tab-body").offset().top
      }, 300);
    }
  }

};

const deleteAvatar = async () => {
  try {
    const input = document.getElementById("photo_path_change");
    if (input) input.value = "";
    deletedFiles.value.push(formData.value.photo_path);
    formData.value.photo_path = "";
  } catch (error) {
    console.error("Error deleting avatar:", error);
  }
};

const resetResume = async () => {
  window.location.reload();
};

const upload = async (e, key) => {
  const files = e?.target?.files;
  if (key === "media_files" && files && files.length) {
    Array.from(files).forEach((file) => uploadedFiles.value.push(file));
  } else {
    const file = files?.[0];
    formData.value[key] = file;
  }
  const mediaInput = document.getElementById("media_file");
  if (mediaInput) mediaInput.value = "";
};

const createObjectURL = (file) => {
  return file && file instanceof File ? URL.createObjectURL(file) : file;
};

const getFileName = (url) => {
  return url
      ? decodeURIComponent(new URL(url).pathname.split("/").pop()).split("-").slice(1).join("-")
      : "";
};

const addWorkExpierience = async () => {
  if (!Array.isArray(itemsWork.value)) itemsWork.value = [];
  itemsWork.value.push({
    shipowner: "",
    type_of_vessel: "",
    ships_name: "",
    position: "",
    period_of_work_from: "1990-01-01",
    period_of_work_to: "2000-01-01",
  });
};

const deleteWorkExpierience = async (index) => {
  itemsWork.value.splice(index, 1);
};

const deleteUploadedFile = async (index) => {
  const file = uploadedFiles.value.splice(index, 1)[0];
  deletedFiles.value.push(file);
};
</script>

<style lang="scss" scoped>
.tab-label.tactive {
  border-bottom: 4px solid #3b45a9;
  color: #3b45a9;
}
.tab-body {
  display: block;
}
.resume-contact {
  position: relative;
}
.resume-contact__content.tg-approved {
  background-color: #3b45a9;
  color: #fff;
}

.hidden-input {
  width: 250px;
  max-height: 204px;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.upload {
  position: relative;
}

.avatar {
  height: 202px;
  width: 202px;
  border-radius: 50%;
  object-fit: cover;
}

.resume-avatar {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 302px;
}

.resume-avatar > span {
  height: 202px;
  width: 202px;
}

.delete {
  position: absolute;
  bottom: -82px;
  left: 0px;
  width: 182px;
  height: 17px;
  font-size: 14px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 13px;
  background-color: #9b2719;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #ffffff;
  transition: 0.3s all;
}
.delete:hover {
  background-color: #3b45a9;
}

.uploaded_file {
  display: flex;
  border: solid 1px #d5d7ef;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  text-decoration: underline;
  padding: 20px 30px;
}

.region-select{
  display: flex;
  align-items: center;
}

.resume-status__dropdown.region-dropdown{
  max-height: 200px;
  overflow-y: auto;
}
.dropdown-item{
  padding: 6px 0;
  cursor: pointer;
}

.af-show-resume-button {
  background-color: #3b45a9;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  color: #fff;
}
.af-show-resume-button > div {
  font-size: 22px;
  color: #fff;
}

.forTg {
  position: relative;
}
.resume-password {
  display: flex;
  flex-direction: column;
}
.resume-action-btn {
  width: 100%;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.2s, border-color 0.2s;
  max-width: 400px;
}

.resume-action-btn:hover {
  background: #f9f9f9;
  border-color: #d3d3d3;
}

.resume-action-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.container {
  position: relative;
}

.resume-action-left img {
  width: 22px;
  height: 22px;
}

.resume-cuntainer .vabout-bwork,
.resume-cuntainer .vabout-bwork-blue,
.resume-cuntainer .vabout-bwork-grey {
  display: inline-block;
  width: auto !important;
  margin-top: 30px;
}

.resume-status {
  margin-bottom: 16px;

  &__current {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
  }

  &__arrow {
    font-size: 14px;
    opacity: 0.7;
  }

  &__dropdown {
    margin-top: 6px;
    padding: 8px 12px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    border: 1px solid rgb(201, 201, 201);
    z-index: 50;
  }
}

@media (max-width: 500px) {
  .resume-cuntainer .vabout-bwork,
  .resume-cuntainer .vabout-bwork-blue,
  .resume-cuntainer .vabout-bwork-grey {
    padding: 10px;
    font-size: 14px;
  }
}

.docs__value_datepicker {
  padding: 14px 10px;
  border: solid 1px #d5d7ef;
  border-bottom: none;
}

.docs__value_datepicker.red-bg {
  background: #ffcbcb;
}
.docs__value_datepicker.blue-bg {
  background: #aedcff;
}

.docs__value_datepicker .info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
}
.docs__value_datepicker .info span{
  margin-left: 8px;
}
.docs__value_datepicker .info span a {
  color: blue;
  text-decoration: underline;
}

</style>
