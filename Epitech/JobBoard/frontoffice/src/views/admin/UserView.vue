<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64 bg-grey">
    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
      v-if="user.isAdmin === true"
    >
      This user is a site administrator
    </div>

    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full mb-2"
      v-if="user.isAdmin"
      @click="promoteUser('user')"
    >
      Promote user
    </button>
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full mb-2"
      v-else
      @click="promoteUser('admin')"
    >
      Promote admin
    </button>

    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >First name</label
          >
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.firstname"
            disabled
          />
        </div>
        <div>
          <label
            for="last_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Last name</label
          >
          <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.lastname"
            disabled
          />
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.email"
            disabled
          />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Phone</label
          >
          <input
            type="text"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.phone === null ? 'No phone number' : user.phone"
            disabled
          />
        </div>
        <div>
          <label
            for="createdAt"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Created At</label
          >
          <input
            type="datetime"
            id="createdAt"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.createdAt"
            disabled
          />
        </div>
        <div>
          <label
            for="updatedAt"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Updated At</label
          >
          <input
            type="text"
            id="updatedAt"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="user.updatedAt"
            disabled
          />
        </div>
      </div>
    </form>

    <button
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full mb-5"
      v-if="user !== null"
      @click="deleteUser()"
    >
      Delete this user
    </button>

    <div
      class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      v-if="user.company !== null"
    >
      <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        This user is part of the company
      </p>
      <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ user.company.name }}</h5>
    </div>

    <div v-else>
      <hr class="bg-gray-50 mt-2 mb-5" />
      <h1 class="pb-2 text-2xl">Job applications</h1>
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
</template>

<script>
import AdminHeader from '../../components/admin/Header.vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import qs from 'qs'
import axios from 'axios'
export default {
  components: {
    AdminHeader,
    AgGridVue
  },
  data() {
    return {
      userId: this.$route.params.id,
      error: false,
      success: false,
      agGridHeight: '400px',
      gridApi: null,
      gridColumnApi: null,
      getRowId: null,
      user: {
        id: null,
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        description: null,
        isPublic: false,
        isAdmin: false,
        createdAt: null,
        updatedAt: null,
        company: null
      },
      advertisments: []
    }
  },
  setup() {
    return {
      columnDefs: [
        { headerName: 'Status', field: 'status', sortable: true },
        { headerName: 'Advertisment Name', field: 'advertisment', sortable: true },
        { headerName: 'Company Name', field: 'company', sortable: true },
        { headerName: 'Send To', field: 'sendTo', sortable: true },
        { headerName: 'Sended At', field: 'sendedAt', sortable: true }
      ]
    }
  },
  mounted() {
    if (this.userId === null || this.userId === undefined) {
      return this.$router.push({ name: 'admin_users' })
    }
    this.getUserData()
  },
  beforeMount() {
    this.getRowId = (params) => params.data.id
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    async getUserData() {
      await axios
        .get('http://localhost:3000/api/admin/users/' + this.userId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.user = response.data
          response.data.advertisments.forEach((advertismentData) => {
            this.advertisments.push({
              id: advertismentData.id,
              sendTo: advertismentData.sendTo,
              advertisment: advertismentData.advertisment.name,
              company: advertismentData.advertisment.company.name,
              status: advertismentData.status,
              sendedAt: this.formatDate(advertismentData.sendedAt)
            })
          })
          this.user.createdAt = this.formatDate(response.data.createdAt)
          this.user.updatedAt =
            response.data.createdAt === null
              ? 'Not updated yet'
              : this.formatDate(response.data.updatedAt)
          this.gridApi.setRowData(this.advertisments)
        })
        .catch((error) => {
          console.log(error)
          return this.$router.push({ name: 'admin_users' })
        })
    },
    async promoteUser(role) {
      if (role === 'user') {
        this.user.isAdmin = false
      } else if (role === 'admin') {
        this.user.isAdmin = true
      }
      const ud = {
        isAdmin: this.user.isAdmin
      }
      const form = JSON.parse(JSON.stringify(ud))
      await axios
        .put('http://localhost:3000/api/admin/users/' + this.userId, qs.stringify(form), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          data: qs.stringify(form)
        })
        .then((response) => {
          this.$toast.open({
            type: 'success',
            message: 'The permissions has been updated'
          })
        })
        .catch((error) => {
          this.$toast.open({
            type: 'error',
            message: 'The data could not be updated'
          })
          console.log(error)
        })
    },
    async deleteUser() {
      await axios
        .delete('http://localhost:3000/api/admin/users/' + this.userId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.user = null
          this.$toast.open({
            type: 'success',
            message: 'This user has been updated'
          })
          setTimeout(() => {
            this.$router.push({ name: 'admin_users' })
          }, 1000)
        })
        .catch((error) => {
          this.$toast.open({
            type: 'error',
            message: 'The data could not be updated'
          })
          console.log(error)
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
