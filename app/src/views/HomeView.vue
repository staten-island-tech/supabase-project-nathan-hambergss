<template>
  <div>
    <h1>Home View</h1>
    <button @click="goToSignUp">Go to Sign Up</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSignUp = () => {
  router.push('/login')
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #36a274;
}
</style>
