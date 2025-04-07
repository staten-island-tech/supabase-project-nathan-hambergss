<template>
  <div>

  </div>
</template>

<script setup>
import { supabase } from '../../supabase';

const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
</script>

<style scoped>

</style>