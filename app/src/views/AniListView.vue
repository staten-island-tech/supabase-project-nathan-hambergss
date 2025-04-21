<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h2
      class="text-3xl font-semibold text-center text-gray-900 mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
    >
      Anime List
    </h2>

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
