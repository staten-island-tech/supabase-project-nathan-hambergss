<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold text-center mb-6">Welcome to the Anime App</h2>
    <div class="flex flex-row justify-center space-x-4 mb-6">
      <router-link to="/" class="btn btn-secondary w-40">Go HOME</router-link>
    </div>

    <hr class="my-6" />
    <router-view />
  </div>
</template>
