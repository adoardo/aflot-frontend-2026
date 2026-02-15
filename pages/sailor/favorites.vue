 <template>
    <ClientOnly>
      <NuxtLayout name="default-hero" class="main cabinet" style="background-color: #fff">
          <div>
              <AfHeaderColor/>
          </div>
          <section id="favorites">
              <div class="container">
                  <h1 class="title-none">Избранное</h1>

                  <div class="tabs">
                      <div class="tab-header">
                          <div
                                  class="tab-label"
                                  :class="{ active: activeTab === 'vacancies' }"
                                  @click="setActiveTab('vacancies')"
                          >
                              Вакансии
                          </div>
                          <div
                                  class="tab-label"
                                  :class="{ active: activeTab === 'companies' }"
                                  @click="setActiveTab('companies')"
                          >
                              Компании
                          </div>
                      </div>

                      <div class="tab-body" v-show="activeTab === 'vacancies'">
                          <div class="vacancy-list vacancy-list-three">
                              <VacancyFavoriteItem
                                  v-for="(item, i) in vacancies"
                                  :data="item"
                                  :key="'vacancies-item-' + i"
                              />
                          </div>
                      </div>

                      <div class="tab-body" v-show="activeTab === 'companies'">
                          <div class="company-list">
                          <CompanyFavoriteItem
                              v-for="(item, i) in companies"
                              :data="item"
                              :key="'company-item-' + i"
                          />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'"/>
      </NuxtLayout>
    </ClientOnly>
</template>

<script setup>
    definePageMeta({
      middleware: ["sailor"],
    })
    import api from "@/api/api";
    import VacancyFavoriteItem from "~/components/list/VacancyFavoriteItem.vue";
    import CompanyFavoriteItem from "~/components/list/CompanyFavoriteItem.vue";

    const activeTab = ref("vacancies");
    const fetchedData = ref({})
    const vacancies = ref({})
    const companies = ref({})

    function setActiveTab(tab) {
        activeTab.value = tab;
    }

    const fetchFavorites = async() => {

      const mon = [
        'января',
        'февраля',
        'мая',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ]

      const {data} = await api.get("/all-sailor-favorites");
      fetchedData.value = data
      vacancies.value = data.vacancies;
      companies.value = data.fav_companies

      for (let i = 0; i < vacancies.value.length; i++) {
        vacancies.value[i].company_id = data.companies[i].id
        vacancies.value[i].company_name = data.companies[i].company_name
        for (let j = 0; j < data.vessels.length; j++) {
          if (vacancies.value[i].vessel === data.vessels[j].id) {
            vacancies.value[i].vessel_data = data.vessels[j]
            break;
          }
        }
        let tmpFrom = vacancies.value[i].date_of_departure_from.split('-');
        let tmpTo = vacancies.value[i].date_of_departure_to.split('-');
        vacancies.value[i].departureDateDisplay = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

        let tdate = vacancies.value[i].created_at.split('T')[0];
        tdate = tdate.split('-');
        vacancies.value[i].vacancyDate = parseInt(tdate[2]) + ' ' + mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]
      }

      for (let i = 0; i < companies.value.length; i++) {
        companies.value[i].vacs_count = data.fav_companies_vacs[i]
      }

    }
    fetchFavorites();

    onMounted(() => {
        document.body.classList.add('bg-white');
    });
</script>

<style lang="scss" scoped>
    body {
        background-color: #fff;
    }
</style>
