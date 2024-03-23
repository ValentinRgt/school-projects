<template>
  <Header />
  <h1 class="text-center text-4xl mb-4">Création du compte</h1>
  <ol class="flex items-center" v-if="charge == 'enterprise'">
    <li class="relative w-full mb-6">
      <div class="flex items-center">
        <div
          class="z-10 flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
        >
          <span class="flex w-3 h-3 bg-blue-600 rounded-full"></span>
        </div>
        <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div class="mt-3">
        <h3 class="font-medium text-gray-900 dark:text-black">Création du compte</h3>
      </div>
    </li>
    <li class="relative w-full mb-6">
      <div class="flex items-center">
        <div
          class="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-0 ring-white dark:bg-gray-700 sm:ring-8 dark:ring-gray-900 shrink-0"
        >
          <span class="flex w-3 h-3 bg-gray-900 rounded-full dark:bg-gray-300"></span>
        </div>
      </div>
      <div class="mt-3">
        <h3 class="font-medium text-gray-900 dark:text-black">
          Recherche/Création de l'entreprise
        </h3>
      </div>
    </li>
  </ol>

  <form class="grid gap-5 w-1/2 mx-auto" @submit.prevent>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
        <InputForm v-model="lastname" title="Nom" type="text" />
      </div>
      <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
        <InputForm v-model="firstname" title="Prénom" type="text" />
      </div>
      <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
        <InputForm v-model="password" title="Mot de passe" type="password" />
      </div>
      <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
        <InputForm v-model="passwordConfirm" title="Confirmer mot de passe" type="password" />
      </div>
    </div>
    <InputForm v-model="email" title="email" type="email" class="w-full" />
    <ButtonBlue type="submit" v-on:click="addUser()" title="Inscription" />
  </form>
</template>
<script lang="ts">
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import ButtonBlue from '../components/ButtonBlue.vue'
import type RegisterForm from '../interfaces/RegisterForm'
import axios from 'axios'

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      charge: localStorage.getItem('register_state')
    }
  },
  components: {
    Header,
    InputForm,
    ButtonBlue
  },
  methods: {
    async addUser() {
      const form: RegisterForm = JSON.parse(JSON.stringify(this.$data))
      await axios
        .post('http://localhost:3000/api/auth/register', form)
        .then((res) => {
          this.$user.setLogin(res.data.access_token)
          if (this.charge == 'candidat') {
            this.$router.push({ name: 'home' })
          } else {
            this.$router.push({ name: 'enterprise_register' })
          }
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
