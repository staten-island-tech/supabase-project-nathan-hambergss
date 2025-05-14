<template>
  <form @submit.prevent="handleSignUp">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Registering...' : 'Sign Up' }}
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

const handleSignUp = async () => {
  isLoading.value = true
  error.value = null

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  isLoading.value = false

  if (signUpError) {
    error.value = signUpError.message
    return
  }
  router.push('/anime')
}
</script>
