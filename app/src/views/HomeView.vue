<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 space-y-6">
    <h1 class="text-4xl font-bold text-primary">Welcome Please Sign Up/In to Access the Animes</h1>
    <div class="flex space-x-4">
      <button class="btn btn-primary" @click="$router.push('/signup')">Go to Sign Up</button>
      <button class="btn btn-outline btn-secondary" @click="$router.push('/login')">
        Go to Sign In
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
