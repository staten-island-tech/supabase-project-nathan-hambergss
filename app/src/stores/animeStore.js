import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAnimeStore = defineStore('anime', {
  state: () => ({
    favorites: [],
    recommendations: [],
  }),

  actions: {
    async addFavorite(anime) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          return
        }

        const { data: existingAnime, error: fetchError } = await supabase
          .from('anime')
          .select('id')
          .eq('mal_id', anime.mal_id)
          .maybeSingle()

        if (fetchError) throw fetchError

        let animeId

        if (existingAnime) {
          animeId = existingAnime.id
        } else {
          const insertPayload = {
            mal_id: anime.mal_id,
            name: anime.title,
            genre: anime.genres?.map((g) => g.name).join(', ') || '',
            description: anime.synopsis || '',
            release_date: anime.aired?.from ? new Date(anime.aired.from) : null,
          }

          const { data: insertedAnime, error: insertAnimeError } = await supabase
            .from('anime')
            .insert(insertPayload)
            .select()
            .single()

          if (insertAnimeError) throw insertAnimeError

          animeId = insertedAnime.id
        }

        const { data: existingFavorite, error: favCheckError } = await supabase
          .from('Favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('anime_id', animeId)
          .maybeSingle()

        if (favCheckError) throw favCheckError

        if (existingFavorite) {
          return
        }

        const { error: favInsertError } = await supabase.from('Favorites').insert({
          user_id: user.id,
          anime_id: animeId,
        })

        if (favInsertError) throw favInsertError

        this.favorites.push(anime)
      } catch (error) {
        console.error('Error adding favorite:', error)
      }
    },

    async removeFavorite(mal_id) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) return

        const { data: animeData, error: animeError } = await supabase
          .from('anime')
          .select('id')
          .eq('mal_id', mal_id)
          .maybeSingle()

        if (animeError || !animeData) return

        const { error: deleteError } = await supabase
          .from('Favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('anime_id', animeData.id)

        if (deleteError) throw deleteError

        this.favorites = this.favorites.filter((a) => a.mal_id !== mal_id)
      } catch (err) {
        console.error('Error deleting favorite:', err.message)
      }
    },

    async addRecommendation(anime) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          return
        }

        const { data: existingAnime, error: fetchError } = await supabase
          .from('anime')
          .select('id')
          .eq('mal_id', anime.mal_id)
          .maybeSingle()

        if (fetchError) throw fetchError

        let animeId

        if (existingAnime) {
          animeId = existingAnime.id
        } else {
          const insertPayload = {
            mal_id: anime.mal_id,
            name: anime.title,
            genre: anime.genres?.map((g) => g.name).join(', ') || '',
            description: anime.synopsis || '',
            release_date: anime.aired?.from ? new Date(anime.aired.from) : null,
          }

          const { data: insertedAnime, error: insertAnimeError } = await supabase
            .from('anime')
            .insert(insertPayload)
            .select()
            .single()

          if (insertAnimeError) throw insertAnimeError

          animeId = insertedAnime.id
        }

        const { data: existingRec, error: recCheckError } = await supabase
          .from('Recommendation')
          .select('id')
          .eq('user_id', user.id)
          .eq('anime_id', animeId)
          .maybeSingle()

        if (recCheckError) throw recCheckError

        if (existingRec) {
          return
        }

        const { error: recInsertError } = await supabase.from('Recommendation').insert({
          user_id: user.id,
          anime_id: animeId,
        })

        if (recInsertError) throw recInsertError

        this.recommendations.push(anime)
      } catch (error) {
        console.error('Error adding recommendation:', error)
      }
    },

    async removeRecommendation(mal_id) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) return

        const { data: animeData, error: animeError } = await supabase
          .from('anime')
          .select('id')
          .eq('mal_id', mal_id)
          .maybeSingle()

        if (animeError || !animeData) return

        const { error: deleteError } = await supabase
          .from('Recommendation')
          .delete()
          .eq('user_id', user.id)
          .eq('anime_id', animeData.id)

        if (deleteError) throw deleteError

        this.recommendations = this.recommendations.filter((a) => a.mal_id !== mal_id)
      } catch (err) {
        console.error('Error deleting recommendation:', err.message)
      }
    },

    async fetchFavorites() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          this.favorites = []
          return
        }

        const { data, error } = await supabase
          .from('Favorites')
          .select(
            `
            anime:anime_id (
              mal_id,
              name,
              genre,
              release_date,
              description
            )
          `,
          )
          .eq('user_id', user.id)

        if (error) throw error

        this.favorites = data.map((fav) => ({
          mal_id: fav.anime.mal_id,
          title: fav.anime.name,
          genre: fav.anime.genre,
          release_date: fav.anime.release_date,
          description: fav.anime.description,
        }))
      } catch (error) {
        console.error('Failed to fetch favorites:', error)
      }
    },

    async fetchRecommendations() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          this.recommendations = []
          return
        }

        const { data, error } = await supabase
          .from('Recommendation')
          .select(
            `
            anime:anime_id (
              mal_id,
              name,
              genre,
              release_date,
              description
            )
          `,
          )
          .eq('user_id', user.id)

        if (error) throw error

        this.recommendations = data.map((rec) => ({
          mal_id: rec.anime.mal_id,
          title: rec.anime.name,
          genre: rec.anime.genre,
          release_date: rec.anime.release_date,
          description: rec.anime.description,
        }))
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      }
    },
  },
})
