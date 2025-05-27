<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase.js'

const page = ref(1)
const loading = ref(false)
const success = ref(false)
const error = ref(null)

async function fetchAndInsertAnime() {
  console.log('🟡 Starting fetchAndInsertAnime...')
  loading.value = true
  success.value = false
  error.value = null

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25&page=${page.value}`)
    console.log('📡 Fetch response status:', response.status)

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const json = await response.json()
    console.log('📦 Raw API data:', json)

    if (!json.data || !json.data.length) {
      throw new Error('No anime data found in API response')
    }

    const formatted = json.data.map((anime) => ({
      name: anime.title,
      genre: anime.genres.map((g) => g.name).join(', '),
      release_date: anime.aired?.from ? anime.aired.from.split('T')[0] : null,
      description: anime.synopsis,
    }))

    console.log('📝 Formatted data to insert:', formatted)

    const { error: insertError } = await supabase.from('anime').insert(formatted)

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError)
      throw insertError
    }

    console.log('✅ Insert successful')
    success.value = true
    page.value++
  } catch (err) {
    console.error('🚨 Error during import:', err)
    error.value = err.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-4">
    <p v-if="loading">Loading and importing anime...</p>
    <p v-if="success">✅ Insert successful!</p>
    <p v-if="error">❌ Error: {{ error }}</p>
  </div>
</template>
