<template>
  <div>
    <h2 class="text-3xl font-semibold text-center text-gray-900 mb-6">Anime List</h2>

    <!-- Back to Home Link -->
    <router-link to="/" class="text-blue-500 mb-4 inline-block">Back to Home</router-link>

    <AnimeList />
  </div>
</template>

<script>
import AnimeList from '@/components/AnimeList.vue'

export default {
  name: 'AnimeListPage',
  components: {
    AnimeList,
  },
}
</script>

<style scoped></style>
