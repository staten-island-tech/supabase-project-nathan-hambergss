<template>
  <div>
    <button v-if="user" @click="signOut" :disabled="isLoading">Sign Out</button>
    <p v-if="user">Welcome, {{ user.email }}</p>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { user, signOut, isLoading } = useAuth()
</script>

<style scoped></style>
