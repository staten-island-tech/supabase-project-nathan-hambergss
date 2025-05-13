import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  const login = (userData) => {
    user.value = userData
    isLoggedIn.value = true
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
  }

  const checkLoggedInStatus = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user) {
      user.value = session.user
      isLoggedIn.value = true
    } else {
      user.value = null
      isLoggedIn.value = false
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    checkLoggedInStatus,
  }
})
