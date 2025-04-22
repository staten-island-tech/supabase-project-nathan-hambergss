<template>
  <div>
    <button v-if="auth.user" @click="auth.logout">Logout</button>
    <p v-else>You are not logged in.</p>
    <AuthSignup />
    <AuthLogin />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import AuthSignup from '@/components/AuthSignup.vue'
import AuthLogin from '@/components/AuthLogin.vue'

const auth = useAuthStore()

onMounted(() => {
  auth.getSession() // fetch session on load
})
</script>
