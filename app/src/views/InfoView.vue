<template>
  <div class="bg-[#f4fbfa] min-h-screen">
    <header class="bg-[#2d346d] text-white h-40 flex items-center justify-between px-8">
      <h1 class="text-5xl font-bold">Anime Info</h1>
      <router-link
        to="/anime"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded"
      >
        Back to Animes
      </router-link>
    </header>

    <div class="p-6 max-w-4xl mx-auto bg-[#dbebe8] rounded shadow">
      <div v-if="anime">
        <img
          :src="anime.images.jpg.large_image_url"
          alt="Anime Image"
          class="w-full max-h-96 object-cover rounded mb-4"
        />
        <h1 class="text-2xl font-bold text-[#2d346d]">{{ anime.title }}</h1>
        <p class="mt-4 text-gray-700 whitespace-pre-wrap">{{ anime.synopsis }}</p>

        <div class="mt-6">
          <button
            @click="handleAddFavorite(anime)"
            class="bg-[#ffb347] hover:bg-[#ffa726] text-white font-semibold py-2 px-4 rounded cursor-pointer active:cursor-wait"
          >
            Add to Favorites
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">Loading anime info...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const route = useRoute()
const router = useRouter()
const anime = ref(null)

onMounted(async () => {
  const mal_id = route.params.mal_id

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`)
    const data = await response.json()
    anime.value = data.data
  } catch (error) {
    console.error('Failed to fetch anime details:', error)
  }
})

async function handleAddFavorite(anime) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    alert('Please log in to add favorites.')
    return
  }

  // Try to get the anime from your own Supabase anime table
  let { data: existingAnime, error: fetchError } = await supabase
    .from('anime')
    .select('id')
    .eq('mal_id', anime.mal_id)
    .maybeSingle()

  let animeId

  if (fetchError) {
    console.error('Error checking for existing anime:', fetchError)
    alert('Error checking for anime.')
    return
  }

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

    if (insertAnimeError) {
      console.error('Anime insert failed:', insertAnimeError)
      alert('Could not insert anime.')
      return
    }

    animeId = insertedAnime.id
  }

  // Insert into Favorites
  const { error: favInsertError } = await supabase.from('Favorites').insert({
    user_id: user.id,
    anime_id: animeId,
  })

  if (favInsertError) {
    console.error('Error inserting into Favorites:', favInsertError)
    if (favInsertError.code === '23505') {
      alert('Already in your favorites.')
    } else {
      alert('Failed to add to favorites.')
    }
    return
  }

  alert('Added to favorites!')
  router.push('/profile')
}
</script>
