<script setup>
defineProps(['type', 'title'])
</script>
<template>
  <button
    :type="type"
    class="text-white hover:bg-secondary_light bg-secondary shadow-md rounded px-4 transition-colors w-full font-medium rounded-lg text-sm sm:w-auto px-5 py-2"
  >
    {{ title }}
  </button>
</template>
