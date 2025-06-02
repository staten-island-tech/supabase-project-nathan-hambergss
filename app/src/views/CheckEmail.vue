<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7f4] to-[#f4fbfa] p-6 space-y-10"
  >
    <h1 class="text-4xl font-bold text-primary text-center">Check Your Email</h1>

    <p class="text-lg text-gray-600 text-center max-w-md">
      We've sent you a confirmation email. Please check your inbox and follow the instructions to
      verify your account.
    </p>

    <button
      class="btn btn-primary px-6 py-2 rounded-md shadow-md hover:shadow-lg transition"
      @click="$router.push('/login')"
    >
      Go to Login
    </button>
  </div>
</template>

<script setup></script>

<style scoped></style>
