<template>
  <div class="min-h-screen p-6 bg-[#f4fbfa]">
    <header
      class="bg-[#2d346d] text-white h-20 flex items-center justify-between px-6 mb-6 rounded-md"
    >
      <h1 ref="title" class="text-4xl font-bold">Check Out Others</h1>
      <router-link
        to="/anime"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded"
      >
        Back to Anime List
      </router-link>
    </header>

    <div v-if="loading" class="text-center text-lg text-gray-600">Loading users...</div>
    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold text-[#2d346d]">{{ user.username }}</h2>
        </div>
        <button
          @click="goToUserProfile(user.id)"
          class="mt-4 bg-[#2d346d] text-white py-2 px-4 rounded hover:bg-[#1f2449]"
        >
          View Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { gsap } from 'gsap'

const router = useRouter()
const users = ref([])
const loading = ref(true)
const error = ref(null)
const title = ref(null)

const goToUserProfile = (userId) => {
  router.push({ name: 'UserProfile', params: { id: userId } })
}

onMounted(async () => {
  // Animate the title
  gsap.fromTo(
    title.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data, error: fetchError } = await supabase
      .from('Users')
      .select('id, username')
      .neq('id', user.id)

    if (fetchError) throw fetchError
    users.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
