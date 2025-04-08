<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Enter your email" required />
      <input v-model="password" type="password" placeholder="Enter your password" required />
      <button type="submite" :disabled="loading">Sign Up</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const handleSignup = async () => {
  try {
    loading.value = true
    error.value = null

    const { user, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (signUpError) throw signUpError

    const { data, error: insertError } = await supabase.from('users').insert([
      {
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) throw insertError

    console.log('User has successfully signed up:', data)
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
