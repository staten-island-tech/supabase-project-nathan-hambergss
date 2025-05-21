<template>
  <div>
    <h1>Anime Data</h1>
    <button @click="fetchAndInsertAnimeData">Fetch and Insert Anime Data</button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'AnimeData',
  methods: {
    async fetchAndInsertAnimeData() {
      const supabaseUrl = 'https://your-supabase-url.supabase.co' // Replace with your Supabase URL
      const supabaseKey = 'your-supabase-api-key' // Replace with your Supabase API Key
      const supabase = createClient(supabaseUrl, supabaseKey)

      try {
        // Fetch data from Jikan API (Top 25 Anime)
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=25')
        const data = await response.json()

        // Process each anime and prepare data for Supabase
        for (let anime of data.data) {
          const animeData = {
            name: anime.title,
            genre: anime.genres.map((genre) => genre.name).join(', '), // Genres as a comma-separated string
            release_date: anime.start_date, // The release date (can format as needed)
            description: anime.synopsis, // Synopsis as description
          }

          // Insert data into Supabase (into your Anime table)
          const { data: insertedData, error } = await supabase
            .from('Anime') // Replace 'Anime' with the actual table name
            .insert([animeData])

          if (error) {
            console.error('Error inserting anime data:', error)
          } else {
            console.log('Anime inserted:', insertedData)
          }
        }
      } catch (error) {
        console.error('Error fetching data from Jikan API:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
