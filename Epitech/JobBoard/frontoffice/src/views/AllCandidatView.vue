<template>
  <Header />

  <div class="py-10 px-10 grid grid-cols-5 gap-4">
    <div
      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-white"
      v-for="candidate in candidates"
      :key="candidate.id"
    >
      <div class="flex flex-col items-center pt-4 pb-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          :src="`http://localhost:3000/static/avatar/${
            candidate.image !== null ? candidate.image : 'avatar.png'
          }`"
          crossorigin="anonymous"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900">
          {{ candidate.firstname }} {{ candidate.lastname }}
        </h5>
        <RouterLink
          :to="{ name: 'candidate', params: { id: candidate.id } }"
          class="inline-flex items-center px-4 py-2 mt-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          En savoir plus
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Header from '../components/Header.vue'

export default {
  name: 'Candidates',

  data() {
    return {
      candidates: []
    }
  },
  components: {
    Header
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/advertisments/candidates')
      .then((response) => {
        this.candidates = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
