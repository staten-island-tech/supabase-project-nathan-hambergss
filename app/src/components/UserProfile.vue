<template>
  <div class="user-profile space-y-6">
    <header class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-[#2d346d]">User Profile</h2>
    </header>

    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">Favorites ({{ favorites.length }})</h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in favorites"
          :key="anime.mal_id"
          class="bg-[#fff7e6] p-4 rounded shadow text-[#2d346d]"
        >
          {{ anime.title }}
        </li>
      </ul>
      <p v-if="favorites.length === 0" class="text-gray-500">No favorites yet.</p>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">
        Recommendations ({{ recommendations.length }})
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in recommendations"
          :key="anime.mal_id"
          class="bg-[#e6fff7] p-4 rounded shadow text-[#2d346d]"
        >
          {{ anime.title }}
        </li>
      </ul>
      <p v-if="recommendations.length === 0" class="text-gray-500">No recommendations yet.</p>
    </section>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/stores/animeStore.js'
const { favorites, recommendations } = useAnimeStore()
</script>

<style scoped>
.user-profile {
  background-color: #f4fbfa;
  padding: 20px;
  border-radius: 12px;
}
</style>
