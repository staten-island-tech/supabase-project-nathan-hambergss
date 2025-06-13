<template>
  <div class="min-h-screen p-6 bg-[#f4fbfa]">
    <header
      class="bg-[#2d346d] text-white h-20 flex items-center justify-between px-6 mb-6 rounded-md"
    >
      <h1 ref="title" class="text-3xl font-bold">Profile Viewing</h1>
      <router-link
        to="/explore"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded"
      >
        Back to Users
      </router-link>
    </header>

    <OtherUserProfile :userId="userId" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import OtherUserProfile from '@/components/OtherUserProfile.vue'
import { gsap } from 'gsap'

const route = useRoute()
const userId = route.params.id // this is the UUID from the route
const username = ref('')
const title = ref(null)

onMounted(async () => {
  gsap.fromTo(
    title.value,
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
  )

  const { data, error } = await supabase.from('Users').select('username').eq('id', userId).single()

  if (error) {
    console.error('Failed to fetch user:', error)
    username.value = 'Unknown'
  } else {
    username.value = data?.username || 'Unknown'
  }
})
</script>
