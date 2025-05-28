<template>
  <div>
    <header class="bg-[#2d346d] text-white h-40 flex items-center justify-between px-8">
      <h1 class="text-5xl font-bold">List of Animes</h1>
      <router-link
        to="/profile"
        class="bg-[#ff7575] hover:bg-[#fa4e6e] text-white font-semibold py-2 px-4 rounded"
      >
        View Profile
      </router-link>
    </header>

    <transition name="fade">
      <div
        v-if="showProfile"
        class="absolute top-44 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6"
      >
        <UserProfile />
      </div>
    </transition>

    <div class="bg-[#f4fbfa] flex flex-col items-center justify-center min-h-screen p-6 space-y-2">
      <AnimeList />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AnimeList from '@/components/AnimeList.vue'
import UserProfile from '@/components/UserProfile.vue'

const showProfile = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
