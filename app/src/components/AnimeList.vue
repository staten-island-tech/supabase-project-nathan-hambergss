<template>
  <div class="container mx-auto p-6">
    <ul
      v-if="animes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li v-for="anime in animes" :key="anime.mal_id" class="anime-card group">
        <img
          :src="anime.images.jpg.large_image_url"
          alt="Anime Image"
          class="w-full h-auto max-w-full max-h-[300px] object-contain"
        />
        <div class="p-4 flex flex-col gap-2 items-center text-center">
          <div class="relative w-full">
            <h2 class="text-lg font-medium text-[#2d346d] cursor-pointer">
              {{ anime.title }}
            </h2>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block group-hover:z-50 bg-[#ff7575] bg-opacity-90 text-white text-base rounded-lg py-4 px-6 w-[300px] sm:w-[400px] lg:w-[500px] text-left shadow-lg"
            >
              <p class="text-sm leading-relaxed">{{ anime.synopsis }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <button @click="addReview(anime)" class="anime-btn bg-[#2d346d] hover:bg-[#1f244f]">
              Add Review
            </button>
            <button @click="addFavorite(anime)" class="anime-btn bg-[#ff7575] hover:bg-[#fa4e6e]">
              Favorite
            </button>
            <button
              @click="addToRecommendations(anime)"
              class="anime-btn bg-[#84dcbf] hover:bg-[#66d1ad]"
            >
              Recommend
            </button>
          </div>
        </div>
      </li>
    </ul>

    <p v-if="loading" class="text-center text-gray-500 mt-4">Loading...</p>

    <div class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 1 || loading"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        Previous 25
      </button>

      <span class="text-lg font-large text-[#2d346d]"> Page {{ page }} </span>

      <button
        @click="nextPage"
        :disabled="endReached || loading"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        Next 25
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore.js'

const animeStore = useAnimeStore()

const animes = ref([])
const page = ref(1)
const loading = ref(false)
const endReached = ref(false)

const fetchAnimes = async () => {
  loading.value = true
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25&page=${page.value}`)
    const data = await response.json()
    animes.value = data.data
    endReached.value = data.data.length === 0
  } catch (error) {
    console.error('Error fetching anime:', error)
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (!endReached.value) {
    page.value++
    fetchAnimes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchAnimes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const addReview = (anime) => {
  alert(`Review dialog for "${anime.title}" would open.`)
}

const addFavorite = (anime) => {
  animeStore.addFavorite(anime)
  alert(`"${anime.title}" added to favorites!`)
}

const addToRecommendations = (anime) => {
  animeStore.addRecommendation(anime)
  alert(`"${anime.title}" recommended to others!`)
}

onMounted(fetchAnimes)
</script>

<style scoped>
.anime-card {
  background-color: #e9fcff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  overflow: visible;
}

.anime-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.anime-btn {
  width: 100%;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s ease;
}
</style>
