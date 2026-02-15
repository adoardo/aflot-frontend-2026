import { ref } from "vue"
export const menu = ref([
  { name: 'Новости', link: '/news'},
  // { name: 'Тарифы', link: '/tarif'},
  { name: 'О сервисе', link: '/about'},
  { name: 'Контакты', link: '/contact'},
  // { name: 'Аукцион', link: '/about-page/auction'},
])

export const MenuSea = ref([
  { name: 'Морские вакансии', link: '/vacancies'},
  { name: 'Анкеты моряков', link: '/resumes'},
  { name: 'Морской флот', link: '/navy'},
  { name: 'Морские документы', link: '/flot-dock'},
  { name: 'Начать работу в море', link: '/work-sea'},
])
export const MenuSeaHome = ref([
  { name: 'Морские вакансии', link: '/vacancies'},
  { name: 'Анкеты моряков', link: '/resumes'},
  { name: 'Морской флот', link: '/navy'},
  { name: 'Морские документы', link: '/flot-dock'},
  { name: 'Начать работу в море', link: '/work-sea'},
])

export const MenuCompany = ref([
  { type: 'mainmenu', name: 'Создать новую вакансию', link: '/company/new', icon: 'lk-about-1.svg'},
  { type: 'submenu', name: 'Актуальные вакансии', link: '/company/vacansies?tab=0', icon: 'lk-about-2.svg'},
  { type: 'submenu', name: 'Черновики', link: '/company/vacansies?tab=1', icon: 'lk-about-3.svg'},
  { type: 'submenu', name: 'Неактуальные вакансии', link: '/company/vacansies?tab=2', icon: 'lk-about-4.svg'},

  { type: 'mainmenu', name: 'Рассылка', link: '/company/mailings/create-newsletter', icon: 'lk-about-3.svg'},
  { type: 'submenu', name: 'Создание рассылки', link: '/company/mailings/vacancies', icon: 'lk-about-3.svg'},
  { type: 'submenu', name: 'Общие результаты ', link: '/company/mailings/mailing-results', icon: 'lk-about-3.svg'},
  { type: 'submenu', name: 'Результаты конкретной рассылки ', link: '/company/mailings/specific-newsletter', icon: 'lk-about-3.svg'},

  { name: 'Принятые моряки', link: '/company/accepted-sailors', icon: 'lk-about-13.svg'},
  { type: 'mainmenu', name: 'Входящие отклики', link: '/company/incoming-responses', icon: 'lk-about-13.svg'},
  { type: 'mainmenu', name: 'Исходящие предложения', link: '/company/outgoing-offers', icon: 'lk-about-12.svg'},
  { type: 'mainmenu', name: 'Избранное / Черный список', link: '/company/featured-sailor', icon: 'lk-about-5.svg'},
  { type: 'mainmenu', name: 'Статистика', link: '/company/statistics', icon: 'lk-about-6.svg'},
  //{ name: 'Платные услуги', link: '', icon: 'lk-about-7.svg'},
  // { type: 'mainmenu', name: 'Баланс', link: '/company/balance', icon: 'lk-about-8.svg'},
  // { type: 'mainmenu', name: 'История операций', link: '/company/operation-history', icon: 'lk-about-3.svg'},
  { type: 'mainmenu', name: 'Настройки профиля', link: '/company/profile', icon: 'lk-about-9.svg'},
])

