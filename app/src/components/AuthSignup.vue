<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Enter your email" required />
      <input v-model="password" type="password" placeholder="Enter your password" required />
      <button type="submit" :disabled="auth.loading">Sign Up</button>
    </form>
    <p v-if="auth.error" class="error">{{ auth.error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const auth = useAuthStore()

const handleSignup = async () => {
  await auth.signUp(email.value, password.value)
}
</script>

<style scoped>
</style>
