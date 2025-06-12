<template>
  <div class="user-profile space-y-6">
    <header class="flex items-center justify-between">
      <h2 ref="mainTitle" class="text-2xl font-bold text-[#2d346d]">Your Profile</h2>
    </header>

    <section>
      <h3 ref="favoritesTitle" class="text-xl font-semibold text-[#2d346d] mb-2">
        Favorites ({{ animeStore.favorites.length }})
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in animeStore.favorites"
          :key="anime.mal_id"
          class="bg-[#fff7e6] p-4 rounded shadow text-[#2d346d] flex justify-between items-center"
        >
          <span>{{ anime.title }}</span>
          <button
            @click="animeStore.removeFavorite(anime.mal_id)"
            class="btn btn-error btn-soft btn-sm"
          >
            Remove
          </button>
        </li>
      </ul>
      <p v-if="animeStore.favorites.length === 0" class="text-gray-500">No favorites yet.</p>
    </section>

    <section>
      <h3 ref="recommendationsTitle" class="text-xl font-semibold text-[#2d346d] mb-2">
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
            class="btn btn-error btn-soft btn-sm"
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
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { useAnimeStore } from '@/stores/animeStore.js'

const animeStore = useAnimeStore()

const mainTitle = ref(null)
const favoritesTitle = ref(null)
const recommendationsTitle = ref(null)

onMounted(() => {
  animeStore.fetchFavorites()
  animeStore.fetchRecommendations()

  gsap.from(mainTitle.value, {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'power2.out',
  })

  gsap.from(favoritesTitle.value, {
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out',
  })

  gsap.from(recommendationsTitle.value, {
    opacity: 0,
    x: 30,
    duration: 0.8,
    delay: 0.7,
    ease: 'power2.out',
  })
})
</script>

<style scoped>
.user-profile {
  background-color: #f4fbfa;
  padding: 20px;
  border-radius: 12px;
}
</style>
