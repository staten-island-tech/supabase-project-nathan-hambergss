<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#f4fbfa] p-6 space-y-20">
    <title>Anime Recommendation App</title>
    <h1 class="text-4xl font-bold text-secondary">Login View</h1>
    <form @submit.prevent="handleSignIn" class="space-y-4">
      <label class="flex items-center gap-2 border px-3 py-2 rounded-md input input-primary">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="flex-1 bg-transparent outline-none"
        />
      </label>
      <label class="flex items-center gap-2 border px-3 py-2 rounded-md input input-primary">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
            ></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          class="flex-1 bg-transparent outline-none"
        />
      </label>
      <button type="submit" :disabled="isLoading" class="btn btn-secondary w-full">
        {{ isLoading ? 'Logging in...' : 'Sign In' }}
      </button>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref(null)

const router = useRouter()

const handleSignIn = async () => {
  isLoading.value = true
  error.value = null

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  isLoading.value = false

  if (signInError) {
    error.value = signInError.message
    return
  }

  router.push('/anime')
}
</script>
