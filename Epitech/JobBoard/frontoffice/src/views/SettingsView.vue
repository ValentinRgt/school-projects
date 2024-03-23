<template>
  <Header />

  <div
    id="banner"
    tabindex="-1"
    class="flex z-50 gap-8 justify-between items-start py-5 px-40 mb-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center"
  >
    <div class="flex justify-start items-center">
      <div class="mr-3">
        <img class="rounded-full w-20 h-20 bg-gray-200" :src="user.image" crossorigin="anonymous" />
      </div>
      <div>
        <h1>{{ user.firstname }} {{ user.lastname }}</h1>
      </div>
    </div>
  </div>

  <div>
    <h1 class="text-center text-4xl mb-4">Mes informations</h1>
    <form class="grid gap-5 w-1/2 mx-auto" @submit.prevent>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
          <InputForm v-model="data.firstname" title="Prénom" type="text" :value="data.firstname" />
        </div>
        <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
          <InputForm
            v-model="data.lastname"
            title="Nom de famille"
            type="text"
            :value="data.lastname"
          />
        </div>
        <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
          <InputForm v-model="data.email" title="Adresse e-mail" type="email" :value="data.email" />
        </div>
        <div class="relative z-0 w-full lg:mb-0 sm:mb-4 group">
          <InputForm
            v-model="data.phone"
            title="Numéro de téléphone"
            type="tel"
            :value="data.phone"
            @input="(event) => phoneNumberChecker()"
          />
          <p class="text-red-500 text-xs italic" v-if="data.phoneInvalid === true">
            Le numéro de téléphone n'est pas valide, exemple : +33606060606
          </p>
        </div>
      </div>
      <input
        type="file"
        class="bg-gray-50 text-gray-900 text-sm rounded-lg shadow-md outline-none block w-full p-2.5"
        @change="uploadLogo"
        ref="uploadLogo"
        accept="image/*"
      />
      <ButtonBlue
        type="submit"
        v-on:click="updateUserInformation()"
        title="Mettre à jour mes informations"
        :class="{ 'disabled:opacity-25': data.phoneInvalid === true }"
        :disabled="data.phoneInvalid === true"
      />
    </form>
  </div>

  <div v-if="this.user.company === null" class="mt-20 mb-20">
    <h1 class="text-center text-4xl mb-4">Mon profil</h1>
    <form class="grid gap-5 w-1/2 mx-auto" @submit.prevent>
      <div class="flex items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          v-model="profile.isPublic"
          value="modelValue"
          :checked="profile.isPublic"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900"
          >Rendre mon profil visible publiquement</label
        >
      </div>

      <TextareaForm v-model="profile.description" :value="profile.description" rows="10" />

      <label>Curriculum Vitae</label>
      <input
        type="file"
        class="bg-gray-50 text-gray-900 text-sm rounded-lg shadow-md outline-none block w-full p-2.5"
        @change="uploadCV"
        ref="uploadCV"
        accept="application/pdf"
      />
      <ButtonBlue type="submit" v-on:click="updateProfile()" title="Mettre à jour mon profil" />
    </form>

    <div class="px-52 mt-20">
      <h1 class="text-center text-4xl mb-4">Mes candidatures</h1>
      <ag-grid-vue
        :style="{ height: agGridHeight, width: '100%' }"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="advertisments"
        :animateRows="true"
        @grid-ready="onGridReady"
        :getRowId="getRowId"
        :pagination="true"
      >
      </ag-grid-vue>
    </div>
  </div>

  <div
    class="mx-auto mt-20 w-1/2 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    v-if="user.company !== null"
  >
    <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
      Vous faites partie de l'entreprise
    </p>
    <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ user.company.name }}</h5>
  </div>
</template>

<script lang="ts">
import Header from '../components/Header.vue'
import InputForm from '../components/InputForm.vue'
import TextareaForm from '../components/TextareaForm.vue'
import ButtonBlue from '../components/ButtonBlue.vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      user: this.$user,
      data: {
        firstname: this.$user.firstname,
        lastname: this.$user.lastname,
        email: this.$user.email,
        phone: this.$user.phone,
        phoneInvalid: false
      },
      profile: {
        isPublic: this.$user.isPublic,
        description: this.$user.description
      },
      advertisments: [],
      agGridHeight: window.innerHeight - 85 + 'px',
      gridApi: null,
      gridColumnApi: null,
      getRowId: null,
      queries: {
        page: 0,
        limit: 30
      }
    }
  },
  setup() {
    return {
      columnDefs: [
        {
          headerName: 'Annonce',
          field: 'name',
          sortable:
            true /*filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] }*/
        },
        { headerName: 'Adresse e-mail', field: 'sendTo' },
        { headerName: 'Entreprise', field: 'company_name' },
        { headerName: 'Statut', field: 'status' },
        { headerName: "Date d'envoi", field: 'sendedAt' }
      ]
    }
  },
  components: {
    Header,
    InputForm,
    TextareaForm,
    ButtonBlue,
    AgGridVue
  },
  mounted() {
    this.onScreenResize()
    this.getAdvertisments()
  },
  beforeMount() {
    this.getRowId = (params) => params.data.id
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.agGridHeight = window.innerHeight - 85 + 'px'
      })
    },
    async getAdvertisments() {
      await axios
        .get('http://localhost:3000/api/user/advertisments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.data.forEach((advertisment) => {
            this.advertisments.push({
              slug: advertisment.advertisment.slug,
              name: advertisment.advertisment.name,
              sendTo: advertisment.sendTo,
              company_name: advertisment.advertisment.company.name,
              status: advertisment.status,
              sendedAt: this.formatDate(advertisment.sendedAt)
            })
            this.gridApi.paginationSetPageSize(this.queries.limit)
          })
          this.updateRows()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateRows() {
      this.gridApi.setRowData(this.advertisments)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'long' }).format(
        date
      )
    },
    async updateUserInformation() {
      if (this.data.phoneInvalid === false) {
        const form = JSON.parse(JSON.stringify(this.$data.data))
        await axios
          .put('http://localhost:3000/api/user/me', qs.stringify(form), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then((res) => {
            this.$toast.open({
              type: 'success',
              message: 'Vos informations ont été mises à jour'
            })
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
        this.$toast.open({
          type: 'error',
          message: "Il semblerait qu'il y ait des erreurs dans le formulaire"
        })
      }
    },
    async updateProfile() {
      const form = JSON.parse(JSON.stringify(this.$data.profile))
      await axios
        .put('http://localhost:3000/api/user/me/profile', qs.stringify(form), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          this.$toast.open({
            type: 'success',
            message: 'Vos informations ont été mises à jour'
          })
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
    },
    async uploadLogo() {
      const formData = new FormData()
      formData.append('image', this.$refs.uploadLogo.files[0])

      await axios
        .put('http://localhost:3000/api/user/me/avatar', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.$toast.open({
            type: 'success',
            message: 'Votre photo de profil a été mise à jour'
          })
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
    },
    async uploadCV() {
      const formData = new FormData()
      formData.append('curriculum', this.$refs.uploadCV.files[0])

      await axios
        .put('http://localhost:3000/api/user/me/profile/cv', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.$toast.open({
            type: 'success',
            message: 'Votre CV a été mise à jour'
          })
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
    },
    async phoneNumberChecker() {
      const regex = new RegExp(/^\+[1-9]\d{10}$/)

      if (this.data.phone === null || this.data.phone === '' || this.data.phone === undefined) {
        this.data.phoneInvalid = false
        return
      }

      if (regex.test(this.data.phone)) {
        this.data.phoneInvalid = false
      } else {
        this.data.phoneInvalid = true
      }
    }
  }
}
</script>
