import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const signUp = async (email, password) => {
    loading.value = true
    error.value = null

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      error.value = signUpError.message
      loading.value = false
      return
    }

    const newUser = data?.user
    if (!newUser) {
      error.value = 'User is undefined after sign up.'
      loading.value = false
      return
    }

    user.value = newUser

    await supabase.from('users').insert([
      {
        id: newUser.id,
        email: newUser.email,
        created_at: new Date().toISOString(),
      },
    ])

    loading.value = false
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      error.value = loginError.message
      loading.value = false
      return
    }

    user.value = data.user
    loading.value = false
  }

  const logout = async () => {
    loading.value = true
    error.value = null

    const { error: logoutError } = await supabase.auth.signOut()

    if (logoutError) {
      error.value = logoutError.message
    } else {
      user.value = null
    }

    loading.value = false
  }

  const getSession = async () => {
    const { data, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      error.value = sessionError.message
      return
    }

    user.value = data?.session?.user || null
  }
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })

  return {
    user,
    loading,
    error,
    signUp,
    login,
    logout,
    getSession,
  }
})
