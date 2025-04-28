<template>
  <form @submit.prevent="signIn">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Sign In' }}</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { signIn, error, isLoading } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleSignIn = async () => {
  await signIn(email.value, password.value)
  if (!error) {
    router.push('/home')  
  }
}
</script>
<style scoped></style>
