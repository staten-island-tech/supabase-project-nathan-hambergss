<template>
  <form @submit.prevent="handleSignUp">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="isLoading">{{ isLoading ? 'Registering...' : 'Sign Up' }}</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { signUp, error, isLoading } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  await signUp(email.value, password.value)
  if (!error) {
    router.push('/login')  //redirect
  }
}
</script>

<style scoped></style>
