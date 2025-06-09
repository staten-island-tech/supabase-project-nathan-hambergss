<script setup>
import gsap from 'gsap'
import { ref, onMounted, nextTick, watch } from 'vue'
import { supabase } from '../lib/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToInfo = (mal_id) => {
  router.push({ name: 'info', params: { mal_id } })
}

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

function setupButtonAnimations() {
  nextTick(() => {
    const buttons = document.querySelectorAll('.animated-button')
    buttons.forEach((btn) => {
      let xSet = gsap.quickSetter(btn, 'x', 'px')
      let ySet = gsap.quickSetter(btn, 'y', 'px')
      let scaleSet = gsap.quickSetter(btn, 'scale')
      let bounds = btn.getBoundingClientRect()

      btn.addEventListener('mouseenter', () => {
        bounds = btn.getBoundingClientRect()
      })

      btn.addEventListener('mousemove', (e) => {
        const x = e.clientX - bounds.left - bounds.width / 2
        const y = e.clientY - bounds.top - bounds.height / 2
        xSet(x * 0.1)
        ySet(y * 0.1)
        scaleSet(1.05)
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  })
}

onMounted(async () => {
  await fetchAnimes()
  setupButtonAnimations()
})
watch(animes, () => {
  setupButtonAnimations()
})
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
        class="bg-[#e6fcff] rounded-lg shadow-lg overflow-hidden"
      >
        <img
          :src="anime.images.jpg.large_image_url"
          alt="Anime Image"
          class="w-full h-auto max-w-full max-h-[300px] object-contain"
        />

        <div class="p-4 text-center">
          <h2 class="text-lg font-medium text-gray-900 mb-2">
            {{ anime.title }}
          </h2>
          <button
            class="animated-button mt-2 bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded cursor-pointer active:cursor-wait transition-transform duration-200"
            @click="goToInfo(anime.mal_id)"
          >
            Click here to see more
          </button>
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
          class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Next 24
        </button>
      </div>
    </div>
  </div>
</template>
