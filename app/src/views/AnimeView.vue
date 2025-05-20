<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 space-y-20">
    <h1 class="text-2xl font-bold text-primary">
      List of Animes
    </h1>
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
