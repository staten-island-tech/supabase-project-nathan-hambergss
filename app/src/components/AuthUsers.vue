<template>
  <div>

  </div>
</template>

<script setup>
import { supabase } from '../../supabase';

const { data, error } = await supabase
  .from('characters')
  .select()
</script>

<style scoped>

</style>