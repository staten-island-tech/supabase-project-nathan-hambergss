<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '../lib/supabase.js'

const page = ref(1)
const loading = ref(false)
const success = ref(false)
const error = ref(null)

async function fetchAndInsertAnime() {
  loading.value = true
  success.value = false
  error.value = null

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25&page=${page.value}`)

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const json = await response.json()

    if (!json.data || !json.data.length) {
      throw new Error('No anime data found in API response')
    }

    const apiAnimes = json.data
    const malIds = apiAnimes.map((anime) => anime.mal_id)

    // Query Supabase for existing mal_ids to avoid duplicates
    const { data: existingAnimes, error: fetchError } = await supabase
      .from('anime')
      .select('mal_id')
      .in('mal_id', malIds)

    if (fetchError) {
      throw fetchError
    }

    const existingIds = new Set(existingAnimes.map((a) => a.mal_id))

    // Filter out already existing anime
    const newAnimes = apiAnimes.filter((anime) => !existingIds.has(anime.mal_id))

    if (newAnimes.length === 0) {
      // Nothing new to insert
      success.value = true
      loading.value = false
      return
    }

    // Format new anime entries for insertion
    const formatted = newAnimes.map((anime) => ({
      mal_id: anime.mal_id,
      name: anime.title,
      genre: anime.genres.map((g) => g.name).join(', '),
      release_date: anime.aired?.from ? anime.aired.from.split('T')[0] : null,
      description: anime.synopsis,
    }))

    const { error: insertError } = await supabase.from('anime').insert(formatted)

    if (insertError) {
      throw insertError
    }

    success.value = true
  } catch (err) {
    error.value = err.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAndInsertAnime()
})

watch(page, () => {
  fetchAndInsertAnime()
})
</script>

<template></template>
