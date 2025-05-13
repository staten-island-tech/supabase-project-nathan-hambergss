import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { supabase } from './supabaseClient'
import { useUserStore } from './stores/user'
import App from './App.vue'
import router from './router'

supabase.auth.onAuthStateChange((_event, session) => {
  const userStore = useUserStore()
  if (session?.user) {
    userStore.login(session.user)
  } else {
    userStore.logout()
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
