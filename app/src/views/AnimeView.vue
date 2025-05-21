<template>
  <div>
    <header class="bg-primary text-white h-40 flex items-center justify-center">
      <h1 class="text-5xl font-bold">List of Animes</h1>
    </header>

    <div class="bg-blue-100 flex flex-col items-center justify-center min-h-screen p-6 space-y-2">
      <AnimeList />
    </div>
  </div>
</template>

<script setup>
import AnimeList from '@/components/AnimeList.vue'
</script>

<style scoped></style>
