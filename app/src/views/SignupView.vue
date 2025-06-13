<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#f4fbfa] p-6 space-y-20">
    <h1 class="text-4xl font-bold text-primary">Sign Up</h1>

    <form @submit.prevent="handleSignUp" class="space-y-4">
      <label class="flex items-center gap-2 border px-3 py-2 rounded-md input input-primary">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="flex-1 bg-transparent outline-none"
        />
      </label>

      <label class="flex items-center gap-2 border px-3 py-2 rounded-md input input-primary">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must include number, lowercase, uppercase"
          class="flex-1 bg-transparent outline-none"
        />
      </label>

      <label class="flex items-center gap-2 border px-3 py-2 rounded-md input input-primary">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
          class="flex-1 bg-transparent outline-none"
        />
      </label>

      <button type="submit" :disabled="isLoading" class="btn btn-secondary w-full">
        {{ isLoading ? 'Creating account...' : 'Sign Up' }}
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
const username = ref('')
const isLoading = ref(false)
const error = ref(null)

const router = useRouter()

const handleSignUp = async () => {
  isLoading.value = true
  error.value = null

  if (!username.value.trim()) {
    error.value = 'Username cannot be empty.'
    isLoading.value = false
    return
  }

  const { data: users, error: userCheckError } = await supabase.from('Users').select('username')
  if (userCheckError) {
    error.value = 'Error checking username.'
    isLoading.value = false
    return
  }

  const taken = users.some((u) => u.username === username.value)
  if (taken) {
    error.value = 'Username is already taken.'
    isLoading.value = false
    return
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (signUpError) {
    error.value = signUpError.message
    isLoading.value = false
    return
  }

  localStorage.setItem('pending_username', username.value)

  isLoading.value = false
  router.push('/checkemail')
}
</script>
