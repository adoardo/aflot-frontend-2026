<template>
  <footer :class="fstyle">
    <div class="container container-footer">
      <div :class="flinkstyle">
        <a href="/vacancies" class="footer-a"  :class="{ active: isActive('vacancies') }" @click="setActiveTab('vacancies')"> Морские вакансии</a>
        <a href="/resumes" class="footer-a" :class="{ active: isActive('resumes') }"@click="setActiveTab('resumes')">Анкеты моряков</a>
        <a href="/navy" class="footer-a" :class="{ active: isActive('navy') }"@click="setActiveTab('navy')">Морской флот</a>
        <a href="/flot-dock" class="footer-a" :class="{ active: isActive('flot-dock') }"@click="setActiveTab('flot-dock')">Морские документы</a>
        <a href="/work-sea" class="footer-a" :class="{ active: isActive('work-sea') }"@click="setActiveTab('work-sea')">Начать работу в море</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    lnkStyle: {
      type: String,
      default: 'footer-block footer-block-white'
    },
    footerStyle: {
      type: String,
      default: 'footer'
    },
    activeTab: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flinkstyle: this.lnkStyle,
      fstyle: this.footerStyle,
      active_tab: this.activeTab
    }
  },

  mounted() {
    this.setActiveTabFromURL();
  },

  methods: {
    isActive(path) {
      if(window)
      return this.active_tab === path;
    },
    setActiveTab(tab) {
      this.active_tab = tab;
    },
    setActiveTabFromURL() {
      const path = window.location.pathname.replace('/', '')
      if (['vacancies', 'resumes', 'navy', 'flot-dock', 'work-sea'].includes(path)) {
        this.active_tab = path;
      } else {
        this.active_tab = ''
      }
    }
  },

}
</script>

<style scoped>
.active {
  color: white;
  background-color: #9b2719 !important;
}
</style>