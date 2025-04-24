<template>
  <form @submit.prevent="signIn">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="isLoading">Sign In</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { signIn, error, isLoading } = useAuth()

const email = ref('')
const password = ref('')
</script>
<style scoped></style>
