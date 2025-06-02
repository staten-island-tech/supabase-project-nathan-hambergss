<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded shadow">
    <div v-if="anime">
      <img
        :src="anime.images.jpg.large_image_url"
        alt="Anime Image"
        class="w-full max-h-96 object-cover rounded mb-4"
      />
      <h1 class="text-2xl font-bold text-[#2d346d]">{{ anime.title }}</h1>
      <p class="mt-4 text-gray-700 whitespace-pre-wrap">{{ anime.synopsis }}</p>

      <div class="mt-6 flex gap-4">
        <button
          @click="addFavorite(anime)"
          class="bg-[#ffb347] hover:bg-[#ffa726] text-white font-semibold py-2 px-4 rounded"
        >
          Add to Favorites
        </button>
        <button
          @click="addRecommendation(anime)"
          class="bg-[#90ee90] hover:bg-[#76c893] text-white font-semibold py-2 px-4 rounded"
        >
          Add to Recommendations
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">Loading anime info...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore.js'

const { addFavorite, addRecommendation } = useAnimeStore()
const route = useRoute()

const anime = ref(null)

onMounted(async () => {
  const mal_id = route.params.mal_id
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`)
    const data = await response.json()
    anime.value = data.data
  } catch (error) {
    console.error('Failed to fetch anime details:', error)
  }
})
</script>
