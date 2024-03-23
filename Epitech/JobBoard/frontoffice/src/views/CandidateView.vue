<template>
  <Header />

  <div
    id="banner"
    tabindex="-1"
    class="flex z-50 gap-8 justify-between items-start py-5 px-40 w-full bg-gray-50 border border-b border-gray-200 sm:items-center"
  >
    <div class="flex justify-start items-center">
      <div class="mr-3">
        <img
          class="rounded-full w-20 h-20 bg-gray-200"
          :src="`http://localhost:3000/static/avatar/${
            user.image !== null ? user.image : 'avatar.png'
          }`"
          crossorigin="anonymous"
        />
      </div>
      <div>
        <h1>{{ user.firstname }} {{ user.lastname }}</h1>
      </div>
    </div>
    <div class="justify-end" v-if="true === false"></div>
  </div>

  <div class="min-h-screen flex">
    <div class="flex-1 py-10 px-10">
      <div v-if="user.description !== null">
        <h2 class="text-2xl">Description</h2>
        <p>{{ user.description }}</p>
      </div>
    </div>
    <div class="flex-1" v-if="user.curriculumVitae !== null">
      <embed
        class="w-full h-full"
        :src="`http://localhost:3000/static/cv/${user.curriculumVitae}`"
        crossorigin="anonymous"
      />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Header from '../components/Header.vue'

export default {
  name: 'Candiate',

  data() {
    return {
      candiateId: this.$route.params.id,
      user: {
        id: null,
        firstname: null,
        lastname: null,
        image: null,
        curriculumVitae: null,
        createdAt: null
      }
    }
  },
  components: {
    Header
  },
  mounted() {
    if (this.candiateId === null || this.candiateId === undefined) {
      return this.$router.push({ name: 'candidates' })
    }
    this.getCandidateData()
  },
  methods: {
    async getCandidateData() {
      await axios
        .get('http://localhost:3000/api/advertisments/candidates/' + this.candiateId)
        .then((response) => {
          this.user = response.data
          this.user.createdAt = this.formatDate(response.data.createdAt)
        })
        .catch((error) => {
          console.log(error)
          return this.$router.push({ name: 'candidats' })
        })
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'long' }).format(
        date
      )
    }
  }
}
</script>
