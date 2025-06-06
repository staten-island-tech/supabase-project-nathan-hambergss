<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase.js'

const animes = ref([])
const page = ref(1)
const loading = ref(false)
const endReached = ref(false)

const inserting = ref(false)
const insertSuccess = ref(false)
const insertError = ref(null)

async function fetchAnimes() {
  loading.value = true
  insertSuccess.value = false
  insertError.value = null

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=24&page=${page.value}`)
    const data = await response.json()

    animes.value = data.data
    endReached.value = data.data.length === 0

    // After fetch, insert new anime to Supabase, avoiding duplicates
    if (animes.value.length > 0) {
      await insertNewAnime(animes.value)
    }
  } catch (error) {
    console.error('Error fetching anime:', error)
    insertError.value = 'Failed to fetch anime list'
  } finally {
    loading.value = false
  }
}

async function insertNewAnime(apiAnimes) {
  inserting.value = true
  insertSuccess.value = false
  insertError.value = null

  try {
    // Remove duplicates with saem Mal_ID
    const uniqueMap = new Map()
    for (const anime of apiAnimes) {
      if (!uniqueMap.has(anime.mal_id)) {
        uniqueMap.set(anime.mal_id, anime)
      }
    }
    const uniqueAnimes = Array.from(uniqueMap.values())

    const malIds = uniqueAnimes.map((anime) => anime.mal_id)
    const { data: existingAnimes, error: fetchError } = await supabase
      .from('anime')
      .select('mal_id')
      .in('mal_id', malIds)

    if (fetchError) throw fetchError

    const existingIds = new Set(existingAnimes.map((a) => a.mal_id))
    const newAnimes = uniqueAnimes.filter((anime) => !existingIds.has(anime.mal_id))

    if (newAnimes.length === 0) {
      insertSuccess.value = true
      return
    }

    const formatted = newAnimes.map((anime) => ({
      mal_id: anime.mal_id,
      name: anime.title,
      genre: anime.genres.map((g) => g.name).join(', '),
      release_date: anime.aired?.from ? anime.aired.from.split('T')[0] : null,
      description: anime.synopsis,
    }))

    const { error: insertErrorSupabase } = await supabase
      .from('anime')
      .upsert(formatted, { onConflict: 'mal_id' })

    if (insertErrorSupabase) throw insertErrorSupabase

    insertSuccess.value = true
  } catch (err) {
    insertError.value = err.message || 'Unknown error inserting anime'
  } finally {
    inserting.value = false
  }
}

const nextPage = () => {
  if (!endReached.value && !loading.value) {
    page.value++
    fetchAnimes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (page.value > 1 && !loading.value) {
    page.value--
    fetchAnimes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(fetchAnimes)
</script>

<template>
  <div class="container mx-auto p-6">
    <ul
      v-if="animes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li
        v-for="anime in animes"
        :key="anime.mal_id"
        class="bg-[#e6fcff] rounded-lg shadow-lg relative overflow-visible group"
      >
        <img
          :src="anime.images.jpg.large_image_url"
          alt="Anime Image"
          class="w-full h-auto max-w-full max-h-[300px] object-contain"
        />

        <div class="p-4">
          <div class="relative w-full flex justify-center">
            <h2 class="text-lg font-medium text-gray-900 cursor-pointer text-center">
              {{ anime.title }}
            </h2>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block group-hover:z-50 bg-[#ff7575] bg-opacity-70 text-white text-base rounded-lg py-4 px-6 w-[300px] sm:w-[400px] lg:w-[500px] text-left shadow-lg"
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

    <div class="flex flex-col items-center mt-6 space-y-2">
      <div class="flex justify-center items-center space-x-4">
        <button
          @click="prevPage"
          :disabled="page === 1 || loading"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous 24
        </button>

        <span class="text-lg font-large text-gray-700"> Page {{ page }} </span>

        <button
          @click="nextPage"
          :disabled="endReached || loading"
          class="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Next 24
        </button>
      </div>
    </div>
  </div>
</template>
