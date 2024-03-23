<script setup>
import ButtonBlue from '../components/ButtonBlue.vue'
</script>

<template>
  <div class="flex gap-4 mx-auto w-2/3 justify-center">
    <input
      class="p-3 bg-gray-200 rounded placeholder:text-gray-400 placeholder:text-lg border-2 border-gray-300 outline-none w-full h-fit"
      type="text"
      placeholder="Essayez “développeur C”,”chef de..."
    />
    <input
      class="p-3 bg-gray-200 rounded placeholder:text-gray-400 placeholder:text-lg border-2 border-gray-300 outline-none w-full h-fit"
      type="text"
      placeholder="Proximité de la personne (Lyon, Pa..."
    />
    <ButtonBlue class="w-2/5 text-lg" type="text" title="Trouver un candidat" />
  </div>
</template>
