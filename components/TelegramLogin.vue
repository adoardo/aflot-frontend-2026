<template>
  <div class="tg-login-button-group">
    <div ref="telegram" id="tgRegButtonReal"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useModalStore } from '@/store/modal'
import { useUsersStore } from '@/store/useUserStore'
import api from '@/api/api'

const { closeModal, toggleModal, openModalCommon } = useModalStore()
const userStore = useUsersStore()

const telegram = ref<HTMLDivElement | null>(null)

// Dummy to prevent runtime errors
const clearInputs = () => {}

// === Props ===
const props = defineProps({
  mode: { type: String, default: 'callback' },
  telegramLogin: { type: String, default: 'aflot_new_bot' },
  redirectUrl: { type: String, default: '' },
  requestAccess: { type: String, default: 'read' },
  size: { type: String, default: 'large' },
  userpic: { type: String, default: 'true' },
  radius: { type: String, default: '' },
})

const emit = defineEmits(['callback'])

// === Handle Telegram user ===
const handleTGuser = async (id: string) => {
  try {
    const response = await api.get(`/tguser?tg_id=${id}`)
    const data = response.data.data

    if (data === 0) {
      toggleModal('msocwhois')
    } else {
      const creds = { username: id, password: 'TsQ7@66a_' + id }
      await userStore.login(creds, 'user')

      if (userStore.authErrorMsg) {
        openModalCommon(userStore.authErrorMsg)
      } else {
        setTimeout(() => {
          if (userStore.user.info.role === 'Компания') {
            userStore.getCompanyData()
          }
        }, 1500)
        closeModal('lk')
        clearInputs()
      }
    }
  } catch (err) {
    console.error('Telegram user fetch error:', err)
  }
}

// === Callback for Telegram login ===
const onTelegramAuth = (user: any) => {
  console.log('Telegram user:', user)
  emit('callback', user)
  userStore.setFormTG(user.id)
  handleTGuser(user.id)
}

// === Force-clear Telegram session cookies ===
// (limited by browser cross-domain rules but helps reset stale sessions)
const clearTelegramCookies = () => {
  try {
    const domains = ['.telegram.org', '.oauth.telegram.org']
    for (const domain of domains) {
      document.cookie = `stel_token=; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      document.cookie = `stel_user=; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  } catch (e) {
    console.warn('Unable to clear Telegram cookies (browser limited):', e)
  }
}

// === Recreate Telegram widget ===
const reloadTelegramWidget = () => {
  const container = telegram.value
  if (!container) return

  container.innerHTML = '' // remove old iframe/script

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://telegram.org/js/telegram-widget.js?3'
  script.setAttribute('data-size', props.size)
  script.setAttribute('data-userpic', props.userpic)
  script.setAttribute('data-telegram-login', props.telegramLogin)
  script.setAttribute('data-request-access', props.requestAccess)
  if (props.radius) script.setAttribute('data-radius', props.radius)

  if (props.mode === 'callback') {
    ;(window as any).onTelegramAuth = onTelegramAuth
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
  } else {
    script.setAttribute('data-auth-url', props.redirectUrl)
  }

  container.appendChild(script)
  clearInputs()
}

// === Mounted logic ===
onMounted(() => {
  // Step 1 — clear any remembered Telegram session
  clearTelegramCookies()

  // Step 2 — initialize widget
  reloadTelegramWidget()

  // Step 3 — auto-recheck in case widget silently fails
  setTimeout(() => {
    const iframe = document.querySelector(
      `#telegram-login-${props.telegramLogin}`
    )
    if (!iframe) {
      console.warn('Telegram widget not detected — reloading...')
      clearTelegramCookies()
      reloadTelegramWidget()
    }
  }, 3000)
})

// === Optional manual click ===
const tgRegButtonRealclick = () => {
  telegram.value?.querySelector('iframe')?.contentWindow?.focus()
}
</script>

<style scoped lang="scss">
.tg-login-button-group {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform:translateX(-50%)scaleX(1.5);
  z-index: 1;
  opacity: 0; 
  display:flex;
  justify-content:center;
  iframe {
    display: block;
    width: 100% !important;
    height: 50px !important; // adjust as needed
    border: none;
  }
}
</style>
