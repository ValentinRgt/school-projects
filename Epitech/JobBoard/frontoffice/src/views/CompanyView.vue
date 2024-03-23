<template>
  <Header />

  <div
    id="banner"
    tabindex="-1"
    class="flex z-50 gap-8 justify-between items-start py-5 px-40 w-full bg-gray-50 border border-b border-gray-200 sm:items-center"
  >
    <div class="flex justify-start items-center">
      <div class="mr-3">
        <img class="rounded-full w-20 h-20 bg-gray-200" :src="company.image" />
      </div>
      <div>
        <h1>{{ company.name }}</h1>
        <p>{{ company.description }}</p>
      </div>
    </div>
    <div class="justify-end hidden 2xl:block" v-if="company.website !== null">
      <a
        :href="'https://' + company.website"
        target="_blank"
        class="flex items-center hover:bg-primary-700 rounded-lg text-sm p-1.5 bg-primary rounded px-2 text-white w-full"
      >
        Voir le site web
      </a>
    </div>
  </div>

  <div class="flex w-full py-10 px-10 gap-10">
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1 gap-5 w-1/3"
    >
      <div
        class="rounded overflow-hidden shadow-lg"
        v-for="advertisment in advertisments"
        :key="advertisment.id"
      >
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ advertisment.name }}</div>
          <div class="text-md mb-2" v-if="advertisment.description !== null">
            {{ advertisment.description.substring(0, 100) + '...' }}
          </div>
          <div class="text-md mb-2" v-else>
            Aucune description n'a été fourni pour cette fiche de poste
          </div>
          <button
            @click="showAds(advertisment.id)"
            class="inline-flex items-center px-3 py-2 bottom-0 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Voir plus
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div id="showdes" class="rounded overflow-hidden shadow-lg none w-full h-full px-6 py-4">
      <div class="font-bold text-xl mb-2" id="titlebox"></div>
      <div class="text-md mb-2" id="fulldes"></div>
      <form>
        <div class="flex gap-2 flex-col">
          <div class="flex gap-2">
            <InputForm v-model="applier.lastname" title="Nom" type="text" />
            <InputForm v-model="applier.firstname" title="Prénom" type="text" />
          </div>
          <InputForm v-model="applier.email" title="Email" type="text" />
          <TextareaForm v-model="applier.message" title="message" type="text" />
        </div>
      </form>
      <p class="text-green-500 text-xs italic mt-2" id="applytrue" style="display: none">
        La candidature à bien été envoyé
      </p>
      <p class="text-red-500 text-xs italic mt-2" id="applytrue" style="display: none">
        Une erreur est survenue
      </p>
      <button
        class="inline-flex items-center mt-2 px-3 py-2 bottom-0 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        id="fulldes"
        @click="apply()"
      >
        Postuler à cette offre
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import TextareaForm from '../components/TextareaForm.vue'
import { QuerySelector } from 'ag-grid-community'

export default {
  name: 'Company',

  data() {
    return {
      currentAd: null,
      companySlug: this.$route.params.slug,
      user: this.$user,
      company: {
        id: null,
        name: null,
        slug: null,
        siret: null,
        website: null,
        address: null,
        description: null,
        createdAt: null,
        updatedAt: null
      },
      advertisments: [
        {
          id: null,
          name: null,
          slug: null,
          description: null,
          createdAt: null,
          updatedAt: null
        }
      ],
      applier: {
        firstname: null,
        lastname: null,
        email: null,
        message: null
      }
    }
  },
  components: {
    Header,
    InputForm,
    TextareaForm
  },
  mounted() {
    if (this.companySlug === null || this.companySlug === undefined) {
      return this.$router.push({ name: 'companies' })
    }
    this.getCompanyData()
  },
  methods: {
    async getCompanyData() {
      await axios
        .get('http://localhost:3000/api/companies/' + this.companySlug + '/advertisments')
        .then((response) => {
          this.company = response.data
          this.advertisments = response.data.advertisments
          this.company.createdAt = this.formatDate(response.data.createdAt)
          this.company.updatedAt =
            response.data.createdAt === null
              ? 'Not updated yet'
              : this.formatDate(response.data.updatedAt)
        })
        .catch((error) => {
          console.log(error)
          return this.$router.push({ name: 'companies' })
        })
    },
    async apply() {
      const form: RegisterForm = JSON.parse(JSON.stringify(this.$data.applier))
      await axios
        .post('http://localhost:3000/api/advertisments/' + this.currentAd + '/apply', form)
        .then((res) => {
          if (res.status == 201) {
            document.querySelector('#applytrue')!.style.display = 'block'
          } else {
          }
        })
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'long' }).format(
        date
      )
    },
    showAds(id) {
      this.currentAd = id
      const adbox = document.querySelector('#showdes')
      const title = document.querySelector('#titlebox')
      var fulldescription = document.querySelector('#fulldes')
      console.log(this.advertisments)
      if (fulldescription?.innerHTML == '') {
        adbox!.classList.remove(id)
        adbox?.classList.toggle('none')
        console.log('oui')
      }
      this.advertisments.forEach((element) => {
        if (element.id == id) {
          fulldescription!.innerHTML = element.description
          title!.innerHTML = element.name
        }
      })
    }
  }
}
</script>
<style>
.none {
  display: none;
}
</style>
