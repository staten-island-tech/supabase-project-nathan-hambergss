<template>
  <div>
    <h2>Your Profile</h2>
    <p v-if="!user">Please sign in to view your profile</p>
    <p v-else><strong>Email:</strong> {{ user.email }}</p>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
const { user } = useAuth()
</script>

<style scoped></style>
