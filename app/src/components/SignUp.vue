<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Sign Up</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../useAuth'

const { signUp, error, loading } = useAuth()
const email = ref('')
const password = ref('')


const handleSignup = async () => {
  console.log('Email', email.value)
  console.log('Password', password.value)
  
  await signUp(email.value, password.value)
}
</script>

<style scoped>
</style>
