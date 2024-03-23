<template>
  <Header />
  <div class="mt-4">
    <h1 class="text-center text-4xl mb-4">Poster une annonce</h1>
    <form class="grid gap-5 w-1/2 mx-auto" @submit.prevent>
      <InputForm
        v-model="name"
        title="Intitulé du poste"
        type="text"
        :value="name"
        class="w-full"
      />
      <TextareaForm v-model="description" :value="description" rows="10" />
      <ButtonBlue type="submit" v-on:click="createAdvertisment()" title="Poster l'annonce" />
    </form>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import TextareaForm from '../components/TextareaForm.vue'
import ButtonBlue from '../components/ButtonBlue.vue'
import axios from 'axios'

export default {
  data() {
    return {
      name: null,
      description: null
    }
  },
  components: {
    Header,
    InputForm,
    TextareaForm,
    ButtonBlue
  },
  methods: {
    async createAdvertisment() {
      const form = JSON.parse(JSON.stringify(this.$data))
      await axios
        .post('http://localhost:3000/api/advertisments', form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          this.$router.push({ name: 'company_single', params: { slug: this.$user.company.slug } })
        })
        .catch((err) => {
          if (err.response.status === 400) {
            err.response.data.message.forEach((element) => {
              this.$toast.open({
                type: 'info',
                message: element
              })
            })
          }
          console.log(err)
        })
    }
  }
}
</script>
