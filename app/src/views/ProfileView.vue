<template>
  <div class="min-h-screen p-6 bg-[#f4fbfa]">
    <title>Anime Recommendation App</title>
    <header class="bg-[#2d346d] text-white h-20 flex items-center justify-center mb-6 rounded-md">
      <h1 class="text-4xl font-bold">User Profile</h1>
      <router-link
        to="/anime"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded"
      >
        Back to Anime List
      </router-link>
    </header>

    <UserProfile />
  </div>
</template>

<script setup>
import UserProfile from '@/components/UserProfile.vue'
</script>

<style scoped></style>
