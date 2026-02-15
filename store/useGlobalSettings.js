import { defineStore } from 'pinia';
import api from '@/api/api'
import { useUsersStore } from "~/store/useUserStore";

export const useGlobalSettings = defineStore('settings', {
    state: () => ({
        settings: {
            jobs: [],
            ships: [],
            regions_russia: [],
            contract_duration: [],
            sailorTariffs: [],
            companyTariffs: [],
        },
        afNotification: {
            title: '',
            desc: '',
            show: false
        },
        currentVacancy: '',
        currentShip: {
            dwt: "-",
            imo: "-",
            kw: "-",
            length: "-",
            ship_type: "-",
            vessel_name: "-",
            width: "-",
            year_built: "-",
            _id: ""
        }
    }),
    actions: {
        async getJobs() {
            try {
              const response = await api.get('/available-jobs')
              this.settings.jobs = response.data.data[0].option_values;
              return response.data
            } catch (error) {
                console.log(error)
            }
        },
        async getShipTypes() {
            const response = await api.get('/ship-types')
            this.settings.ships = response.data.data[0].option_values;
        },
        async getContractDuration() {
            const response = await api.get('/contract-duration')
            this.settings.contract_duration = response.data.data[0].option_values;
        },
        async getSailorTariffs() {
            const response = await api.get('/tariffs/sailor')
            this.settings.sailorTariffs = response.data.data;
        },
        async getCompanyTariffs() {
            const response = await api.get('/tariffs/company')
            this.settings.companyTariffs = response.data.data;
        },
        async getRegionsRussia() {
            const response = await api.get("/regions");
            console.log(response.data.data, "regionsrussia");
            this.settings.regions_russia = response.data.data;
        },

        async setCurrentShip(data) {
            this.currentShip = data
        },
        async setCurrentVacancy(id) {
            this.currentVacancy = id
        },
        async setAfNotification(title, desc, show) {
            this.afNotification = {
                title: title,
                desc: desc,
                show: show
            }
        }
    },
    getters: {
        getCurrentShip: (state) => state.currentShip,
        getAfShips: (state) => state.settings.ships,
        getAfJobs: (state) => state.settings.jobs,
        getAfContractDuration: (state) => state.settings.contract_duration,
        getAfSailorTariffs: (state) => state.settings.sailorTariffs,
        getAfCompanyTariffs: (state) => state.settings.companyTariffs,
        getAfNotification: (state) => state.settings.afNotification,
        getAfRegionsRussia: (state) => state.settings.regions_russia,
    }


});

export const useGlobalSettingsRefs = () => storeToRefs(useGlobalSettings());
