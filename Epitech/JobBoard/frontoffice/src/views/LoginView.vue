<template>
  <Header />
  <div>
    <h1 class="text-center text-4xl mb-4">Déja de retour</h1>
  </div>
  <form class="grid gap-5 w-1/2 mx-auto" @submit.prevent>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
        <InputForm v-model="email" title="Adresse e-mail" type="email" />
      </div>
      <div class="relative z-0 w-full group">
        <InputForm v-model="password" title="Mot de passe" type="password" />
      </div>
    </div>
    <ButtonBlue type="submit" v-on:click="loginUser()" title="Connexion" />
  </form>
</template>

<script default lang="ts">
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import ButtonBlue from '../components/ButtonBlue.vue'
import type LoginForm from '../interfaces/LoginForm'
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Header,
    InputForm,
    ButtonBlue
  },
  methods: {
    async loginUser() {
      const form: LoginForm = JSON.parse(JSON.stringify(this.$data))
      await axios
        .post('http://localhost:3000/api/auth/login', form)
        .then((res) => {
          this.$user.setLogin(res.data.access_token)
          this.$router.push({ name: 'home' })
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
