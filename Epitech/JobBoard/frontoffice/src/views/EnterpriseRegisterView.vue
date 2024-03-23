<template>
  <Header />

  <ol class="flex items-center">
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
          class="z-10 flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
        >
          <span class="flex w-3 h-3 bg-blue-600 rounded-full"></span>
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
        <InputForm v-model="name" title="Nom de l'entreprise" type="text" />
      </div>
      <div class="relative z-0 w-full group">
        <InputForm
          v-model="website"
          title="Site web (domain.extension)"
          type="text"
          class="w-full"
          @input="(event) => ((inputValue = event.target.value), isValidDomain(inputValue))"
        />
        <p class="text-red-500 text-xs italic absolute" id="wrongwebsite" style="display: none">
          Le site n'est pas conforme
        </p>
      </div>
      <div class="relative z-0 w-full group">
        <InputForm v-model="address" title="Adresse de l'entreprise" type="text" />
      </div>
      <div class="relative z-0 w-full group">
        <InputForm v-model="siret" title="Siret de l'entreprise" type="text" />
      </div>
    </div>
    <ButtonBlue type="submit" v-on:click="addEnterpriseUser()" title="Finaliser la création" />
    <p class="text-red-500 text-xs italic absolute" id="wrongform" style="display: none">
      Une des informations n'est pas valide
    </p>
  </form>
</template>
<script lang="ts">
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import ButtonBlue from '../components/ButtonBlue.vue'
import qs from 'qs'
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      website: '',
      address: '',
      siret: '',
      inputValue: ''
    }
  },
  components: {
    Header,
    InputForm,
    ButtonBlue
  },
  methods: {
    async addEnterpriseUser() {
      let messagebox = document.querySelector('#wrongform')
      if (this.isValidDomain(this.inputValue)) {
        const form = JSON.parse(JSON.stringify(this.$data))
        await axios
          .post('http://localhost:3000/api/companies', qs.stringify(form), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(form)
          })
          .then((res) => {
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
      } else {
        messagebox.style.display = 'block'
      }
    },
    isValidDomain(str: string) {
      let messagebox = document.querySelector('#wrongwebsite')
      // Regex to check valid
      // Domain Name
      let regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/)
      // if str
      // is empty return false
      if (str == '') {
        messagebox.style.display = 'none'
        return false
      }
      // Return true if the str
      // matched the ReGex
      if (regex.test(str) == true) {
        messagebox.style.display = 'none'
        return true
      } else {
        messagebox.style.display = 'block'
        return false
      }
    }
  }
}
</script>
