<template>
  <div class="user-profile space-y-6">
    <header class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-[#2d346d]">User Profile</h2>
    </header>

    <!-- Favorites -->
    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">
        Favorites ({{ animeStore.favorites.length }})
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in animeStore.favorites"
          :key="anime.mal_id"
          class="bg-[#fff7e6] p-4 rounded shadow text-[#2d346d] flex justify-between items-center"
        >
          <span>{{ anime.title }}</span>
          <button @click="animeStore.removeFavorite(anime.mal_id)" class="btn btn-error btn-sm">
            Remove
          </button>
        </li>
      </ul>
      <p v-if="animeStore.favorites.length === 0" class="text-gray-500">No favorites yet.</p>
    </section>

    <!-- Recommendations -->
    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">
        Recommendations ({{ animeStore.recommendations.length }})
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in animeStore.recommendations"
          :key="anime.mal_id"
          class="bg-[#e6fff7] p-4 rounded shadow text-[#2d346d] flex justify-between items-center"
        >
          <span>{{ anime.title }}</span>
          <button
            @click="animeStore.removeRecommendation(anime.mal_id)"
            class="btn btn-error btn-sm"
          >
            Remove
          </button>
        </li>
      </ul>
      <p v-if="animeStore.recommendations.length === 0" class="text-gray-500">
        No recommendations yet.
      </p>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore.js'

const animeStore = useAnimeStore()

onMounted(() => {
  animeStore.fetchFavorites()
  animeStore.fetchRecommendations()
})
</script>

<style scoped>
.user-profile {
  background-color: #f4fbfa;
  padding: 20px;
  border-radius: 12px;
}
</style>
