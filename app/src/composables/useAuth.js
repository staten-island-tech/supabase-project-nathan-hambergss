import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchUser = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()
    user.value = currentUser
  }

  const signUp = async (email, password) => {
    console.log('Email:', email)
    console.log('Password:', password)

    if (typeof email !== 'string' || typeof password !== 'string') {
      error.value = 'Email and password must be strings'
      return
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      error.value = 'Invalid email format'
      return
    }

    isLoading.value = true

    const { error: signUpError } = await supabase.auth.signUp({ email, password })

    isLoading.value = false

    if (signUpError) {
      error.value = signUpError.message
    } else {
      error.value = null
      alert('Check your email to confirm your account!')
    }
  }

  const signIn = async (email, password) => {
    isLoading.value = true
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    isLoading.value = false
    if (signInError) {
      error.value = signInError.message
    } else {
      error.value = null
    }
  }

  const signOut = async () => {
    isLoading.value = true
    await supabase.auth.signOut()
    user.value = null
    isLoading.value = false
  }

  const listenToAuthStateChanges = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session ? session.user : null
    })
  }

  listenToAuthStateChanges()

  fetchUser()

  return { user, error, isLoading, signUp, signIn, signOut }
}
