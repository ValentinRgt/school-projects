<script setup>
defineProps(['name', 'place', 'title', 'expe', 'img'])
</script>

<template>
  <div class="w-1/4 bg-gray-300 rounded drop-shadow-lg mt-40">
    <div
      :class="`bg-[url(src/assets/images/${img})]`"
      class="bg-center bg-cover h-[340px] w-full relative rounded-t-lg"
    >
      <div
        class="absolute bottom-0 bg-gradient-to-b from-transparent to-black w-full pt-10 text-white p-2"
      >
        <h2 class="text-3xl font-semibold leading-3">{{ name }}</h2>
        <h3 class="text-xl">{{ place }}</h3>
      </div>
    </div>
    <div class="p-2">
      <h2 class="text-3xl font-semibold">{{ title }}</h2>
      <h3 class="text-gray-500 text-2xl">{{ expe }}</h3>
    </div>
  </div>
</template>
