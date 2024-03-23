<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <form>
      <div class="grid gap-6 mb-6">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Name</label
          >
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
            :value="advertisment.name"
            disabled
          />
        </div>
      </div>
    </form>

    <button
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full mb-5"
      v-if="advertisment !== null"
      @click="deleteAdvertisment()"
    >
      Delete this advertisment
    </button>

    <hr class="bg-gray-50 mt-2 mb-5" />
    <h1 class="pb-2 text-2xl">The applicants</h1>
    <ag-grid-vue
      :style="{ height: agGridHeight, width: '100%' }"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="advertisments"
      :animateRows="true"
      @grid-ready="onGridReady"
      :getRowId="getRowId"
      @cell-clicked="onCellClicked"
      :pagination="true"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import AdminHeader from '../../components/admin/Header.vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import axios from 'axios'
export default {
  components: {
    AdminHeader,
    AgGridVue
  },
  data() {
    return {
      advertismentSlug: this.$route.params.slug,
      error: false,
      success: false,
      agGridHeight: '400px',
      gridApi: null,
      gridColumnApi: null,
      getRowId: null,
      advertisment: {
        id: null,
        name: null,
        slug: null,
        createdAt: null,
        updatedAt: null,
        company: []
      },
      advertisments: []
    }
  },
  setup() {
    return {
      columnDefs: [
        { headerName: 'Firstname', field: 'firstname', sortable: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true },
        { headerName: 'Send To', field: 'sendTo', sortable: true },
        { headerName: 'Status', field: 'status', sortable: true },
        { headerName: 'Sended At', field: 'sendedAt', sortable: true }
      ]
    }
  },
  mounted() {
    if (this.advertismentSlug === null || this.advertismentSlug === undefined) {
      return this.$router.push({ name: 'admin_advertisments' })
    }
    this.getAdvertismentData()
  },
  beforeMount() {
    this.getRowId = (params) => params.data.id
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    async getAdvertismentData() {
      await axios
        .get('http://localhost:3000/api/admin/advertisments/' + this.advertismentSlug, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.advertisment = response.data
          this.advertisment.createdAt = this.formatDate(response.data.createdAt)
          this.advertisment.updatedAt =
            response.data.createdAt === null
              ? 'Not updated yet'
              : this.formatDate(response.data.updatedAt)
          response.data.advertisments.forEach((advertisment) => {
            this.advertisments.push({
              id: advertisment.id,
              userId: advertisment.user.id,
              firstname: advertisment.user.firstname,
              lastname: advertisment.user.lastname,
              sendTo: advertisment.sendTo,
              status: advertisment.status,
              sendedAt: this.formatDate(advertisment.sendedAt),
              updatedAt:
                advertisment.updatedAt === null
                  ? 'Not updated yet'
                  : this.formatDate(advertisment.updatedAt)
            })
          })
          this.gridApi.setRowData(this.advertisments)
        })
        .catch((error) => {
          console.log(error)
          return this.$router.push({ name: 'admin_advertisments' })
        })
    },
    async deleteAdvertisment() {
      await axios
        .delete('http://localhost:3000/api/admin/advertisments/' + this.advertismentSlug, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.advertisement = null
          this.$toast.open({
            type: 'success',
            message: 'This advertisment has been deleted'
          })
          setTimeout(() => {
            this.$router.push({ name: 'admin_advertisments' })
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
    },
    onCellClicked(params) {
      return this.$router.push({ name: 'admin_user', params: { id: params.data.userId } })
    }
  }
}
</script>
