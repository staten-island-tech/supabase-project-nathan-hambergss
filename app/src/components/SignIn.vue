<template>
  <form @submit.prevent="handleSignIn">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Logging in...' : 'Sign In' }}
    </button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref(null)

const router = useRouter()

const handleSignIn = async () => {
  isLoading.value = true
  error.value = null

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  isLoading.value = false

  if (signInError) {
    error.value = signInError.message
    return
  }

  router.push('/anime')
}
</script>
