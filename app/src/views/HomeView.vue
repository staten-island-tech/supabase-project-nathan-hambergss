<template>
  <div class="relative min-h-screen bg-[#f4fbfa] p-6">
    <div
      class="absolute top-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 border border-gray-200"
    >
      <p class="text-5xl font-bold text-primary">Welcome to the Anime Recommendation App</p>
    </div>

    <div class="flex flex-col items-center justify-center min-h-screen space-y-10">
      <h1 class="text-4xl font-bold text-secondary">Sign Up/In to Access the Animes</h1>
      <div class="flex space-x-4">
        <button class="btn btn-outline btn-primary" @click="$router.push('/signup')">
          Go to Sign Up
        </button>
        <button class="btn btn-outline btn-secondary" @click="$router.push('/login')">
          Go to Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
