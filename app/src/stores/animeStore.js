import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimeStore = defineStore('anime', () => {
  const favorites = ref([])
  const recommendations = ref([])

  const addFavorite = (anime) => {
    if (!favorites.value.find((a) => a.mal_id === anime.mal_id)) {
      favorites.value.push(anime)
    }
  }

  const addRecommendation = (anime) => {
    if (!recommendations.value.find((a) => a.mal_id === anime.mal_id)) {
      recommendations.value.push(anime)
    }
  }

  return {
    favorites,
    recommendations,
    addFavorite,
    addRecommendation,
  }
})
