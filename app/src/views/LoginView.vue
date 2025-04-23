<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="auth.loading">Login</button>
    </form>
    <p v-if="auth.error" class="error">{{ auth.error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../useAuth'

const auth = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await auth.login(email.value, password.value)
}
</script>
