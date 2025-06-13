<template>
  <div class="user-profile space-y-6">
    <header class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-[#2d346d] break-words max-w-full" title="User email">
        {{ email }}'s Profile
      </h2>
    </header>

    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">Favorites ({{ favorites.length }})</h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in favorites"
          :key="anime.mal_id"
          class="bg-[#fff7e6] p-4 rounded shadow text-[#2d346d] flex flex-col gap-2"
        >
          <span>{{ anime.title }}</span>
          <router-link
            :to="`/info/${anime.mal_id}`"
            class="text-sm text-white bg-[#2d346d] hover:bg-[#1f2449] px-3 py-1 rounded text-center"
          >
            View Info About Anime
          </router-link>
        </li>
      </ul>
      <p v-if="favorites.length === 0" class="text-gray-500">No favorites yet.</p>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-[#2d346d] mb-2">
        Recommendations ({{ recommendations.length }})
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="anime in recommendations"
          :key="anime.mal_id"
          class="bg-[#e6fff7] p-4 rounded shadow text-[#2d346d] flex flex-col gap-2"
        >
          <span>{{ anime.title }}</span>
        </li>
      </ul>
      <p v-if="recommendations.length === 0" class="text-gray-500">No recommendations yet.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const email = ref('Loading...')
const favorites = ref([])
const recommendations = ref([])

async function fetchUserEmail() {
  const { data, error } = await supabase
    .from('Users')
    .select('email')
    .eq('id', props.userId)
    .single()

  if (error || !data) {
    console.error('Error fetching user email:', error)
    email.value = 'Unknown'
  } else {
    email.value = data.email
  }
}

async function fetchUserAnimeData() {
  if (!props.userId) return

  // Fetch favorites
  const { data: favData, error: favError } = await supabase
    .from('Favorites')
    .select('anime:anime_id(name, mal_id)')
    .eq('user_id', props.userId)

  if (favError) {
    console.error('Error fetching favorites:', favError)
    favorites.value = []
  } else {
    favorites.value =
      favData?.map((fav) => ({
        mal_id: fav.anime.mal_id,
        title: fav.anime.name,
      })) || []
  }

  // Fetch recommendations
  const { data: recData, error: recError } = await supabase
    .from('Recommendation')
    .select('anime:anime_id(name, mal_id)')
    .eq('user_id', props.userId)

  if (recError) {
    console.error('Error fetching recommendations:', recError)
    recommendations.value = []
  } else {
    recommendations.value =
      recData?.map((rec) => ({
        mal_id: rec.anime.mal_id,
        title: rec.anime.name,
      })) || []
  }
}

onMounted(() => {
  fetchUserEmail()
  fetchUserAnimeData()
})

watch(
  () => props.userId,
  () => {
    fetchUserEmail()
    fetchUserAnimeData()
  },
)
</script>

<style scoped>
.user-profile {
  background-color: #f4fbfa;
  padding: 20px;
  border-radius: 12px;
}
</style>
