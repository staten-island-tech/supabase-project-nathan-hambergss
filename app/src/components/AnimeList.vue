<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold text-center text-gray-900 mb-6">Anime List</h1>

    <!-- Anime List -->
    <ul
      v-if="animes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li
        v-for="anime in animes"
        :key="anime.mal_id"
        class="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <!-- Display the Anime Small Image -->
        <img
          :src="anime.images.jpg.small_image_url"
          alt="Anime Image"
          class="w-full h-56 object-cover"
        />

        <div class="p-4">
          <!-- Rank and Title -->
          <h2 class="text-lg font-medium text-gray-900">#{{ anime.title }}</h2>

          <!-- Display the synopsis if available -->
          <p class="text-sm text-gray-700 mt-2 truncate" v-if="anime.synopsis">
            {{ anime.synopsis }}
          </p>
        </div>
      </li>
    </ul>

    <!-- Loading message -->
    <p v-else class="text-center text-gray-500">Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'AnimeList',
  data() {
    return {
      animes: [],
      loading: true,
    }
  },
  async created() {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=25')
      const data = await response.json()

      this.animes = data.data
      this.loading = false
    } catch (error) {
      console.error('Error fetching anime data:', error)
      this.loading = false
    }
  },
}
</script>

<style scoped></style>
