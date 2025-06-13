<template>
  <div class="relative min-h-screen bg-[#f4fbfa] p-6">
    <title>Anime Recommendation App</title>
    <header
      class="w-full bg-white border-b border-gray-200 px-6 py-4 text-center shadow-sm fixed top-0 left-0 z-50 overflow-hidden"
    >
      <!-- Marquee Wrapper -->
      <div
        ref="marqueeWrapper"
        class="relative whitespace-nowrap flex overflow-hidden"
        style="width: 100%"
      >
        <div ref="marqueeContent" class="flex whitespace-nowrap" style="will-change: transform">
          <h1 class="text-3xl sm:text-5xl font-bold text-primary px-6 whitespace-nowrap">
            Welcome to the Anime Recommendation App
          </h1>
          <h1 class="text-3xl sm:text-5xl font-bold text-primary px-6 whitespace-nowrap">
            Welcome to the Anime Recommendation App
          </h1>
          <h1 class="text-3xl sm:text-5xl font-bold text-primary px-6 whitespace-nowrap">
            Welcome to the Anime Recommendation App
          </h1>
        </div>
      </div>
    </header>

    <div class="flex items-center justify-center min-h-screen pt-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl px-4">
        <div
          class="bg-white shadow-xl rounded-xl p-10 border border-gray-300 flex flex-col items-center min-h-[300px]"
        >
          <h2 class="text-3xl font-semibold text-secondary mb-4">Log In to Your Account</h2>
          <p class="mb-6 text-center text-gray-600 text-lg">
            Already have an account? Click below to sign in.
          </p>
          <button
            class="btn btn-outline btn-secondary text-lg px-6 py-2 mt-auto"
            @click="$router.push('/login')"
          >
            Go to Sign In
          </button>
        </div>

        <div
          class="bg-white shadow-xl rounded-xl p-10 border border-gray-300 flex flex-col items-center min-h-[300px]"
        >
          <h2 class="text-3xl font-semibold text-primary mb-4">Don't Have an Account?</h2>
          <p class="mb-6 text-center text-gray-600 text-lg">
            Create a new account to start discovering anime recommendations!
          </p>
          <button
            class="btn btn-outline btn-primary text-lg px-6 py-2 mt-auto"
            @click="$router.push('/signup')"
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const marqueeContent = ref(null)

onMounted(() => {
  const content = marqueeContent.value
  const oneCopyWidth = content.offsetWidth / 3 //3 copys

  gsap.to(content, {
    x: `-=${oneCopyWidth}`,
    duration: 15, //(seconds)
    ease: 'linear',
    repeat: -1,
  })
})
</script>

<style scoped>
#scrolling-text,
#scrolling-text * {
  user-select: none;
}
</style>
