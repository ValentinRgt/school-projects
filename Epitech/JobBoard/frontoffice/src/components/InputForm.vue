<script setup>
defineProps(['modelValue', 'title', 'type'])
defineEmits(['update:modelValue'])
</script>
<template>
  <input
    class="bg-gray-50 text-gray-900 text-sm rounded-lg shadow-md outline-none block w-full p-2.5"
    :type="type"
    :placeholder="title"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
