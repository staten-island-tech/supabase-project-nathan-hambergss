<template>
  <div class="container mx-auto p-6">
    <ul
      v-if="animes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li
        v-for="anime in animes"
        :key="anime.mal_id"
        class="bg-white rounded-lg shadow-lg relative overflow-visible group"
      >
        <img
          :src="anime.images.jpg.large_image_url"
          alt="Anime Image"
          class="w-full h-auto max-w-full max-h-[300px] object-contain"
        />

        <div class="p-4">
          <!-- Title with floating tooltip -->
          <div class="relative w-fit">
            <h2 class="text-lg font-medium text-gray-900 cursor-pointer">
              {{ anime.title }}
            </h2>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block group-hover:z-50 bg-black bg-opacity-80 text-white text-base rounded-lg py-4 px-6 w-[300px] sm:w-[400px] lg:w-[500px] text-left shadow-lg"
            >
              <p class="text-sm leading-relaxed">
                {{ anime.synopsis }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <p v-if="loading" class="text-center text-gray-500 mt-4">Loading...</p>

    <!-- Pagination Buttons -->
    <div class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 1 || loading"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        Previous 25
      </button>

      <span class="text-lg font-large text-gray-700"> Page {{ page }} </span>

      <button
        @click="nextPage"
        :disabled="endReached || loading"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        Next 25
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeList',
  data() {
    return {
      animes: [],
      page: 1,
      loading: false,
      endReached: false,
    }
  },
  mounted() {
    this.fetchAnimes()
  },
  methods: {
    async fetchAnimes() {
      this.loading = true
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?limit=25&page=${this.page}`,
        )
        const data = await response.json()

        this.animes = data.data
        this.endReached = data.data.length === 0
      } catch (error) {
        console.error('Error fetching anime:', error)
      } finally {
        this.loading = false
      }
    },
    nextPage() {
      if (!this.endReached) {
        this.page++
        this.fetchAnimes()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
        this.fetchAnimes()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  },
}
</script>

<style scoped>
/* Tooltip specific styles */
.tooltip {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.group:hover .tooltip {
  opacity: 1;
  transform: translateY(-5px);
}
</style>
