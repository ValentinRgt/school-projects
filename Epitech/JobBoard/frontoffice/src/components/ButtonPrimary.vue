<script setup>
defineProps(['type', 'title'])
</script>
<template>
  <button
    :type="type"
    class="hover:bg-primary_light bg-primary_darker shadow-md rounded transition-colors text-white px-32 py-2 mt-8"
  >
    {{ title }}
  </button>
</template>
