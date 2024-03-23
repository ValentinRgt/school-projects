<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Company name</label
          >
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="company.name"
            disabled
          />
        </div>
        <div>
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Company Number</label
          >
          <input
            type="text"
            id="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="company.siret"
            disabled
          />
        </div>
        <div>
          <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Company address</label
          >
          <input
            type="text"
            id="address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="company.address"
            disabled
          />
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >Company website</label
          >
          <input
            type="text"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="company.website"
            disabled
          />
        </div>
      </div>
    </form>

    <button
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full mb-5"
      v-if="company !== null"
      @click="deleteCompany()"
    >
      Delete this company
    </button>

    <hr class="bg-gray-50 mt-2 mb-5" />
    <h1 class="pb-2 text-2xl">Company members</h1>
    <ag-grid-vue
      :style="{ height: agGridHeight, width: '100%' }"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="company.users"
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
      companySlug: this.$route.params.slug,
      error: false,
      success: false,
      agGridHeight: '400px',
      gridApi: null,
      gridColumnApi: null,
      getRowId: null,
      company: {
        id: null,
        name: null,
        slug: null,
        siret: null,
        website: null,
        address: null,
        createdAt: null,
        updatedAt: null,
        users: []
      }
    }
  },
  setup() {
    return {
      columnDefs: [
        {
          headerName: 'Firstname',
          field: 'firstname',
          sortable: true /* filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] } */
        },
        {
          headerName: 'Lastname',
          field: 'lastname',
          sortable: true /* filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] } */
        }
      ]
    }
  },
  mounted() {
    if (this.companySlug === null || this.companySlug === undefined) {
      return this.$router.push({ name: 'admin_companies' })
    }
    this.getCompanyData()
  },
  beforeMount() {
    this.getRowId = (params) => params.data.id
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    async getCompanyData() {
      await axios
        .get('http://localhost:3000/api/admin/companies/' + this.companySlug, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.company = response.data
          this.company.createdAt = this.formatDate(response.data.createdAt)
          this.company.updatedAt =
            response.data.createdAt === null
              ? 'Not updated yet'
              : this.formatDate(response.data.updatedAt)
          this.gridApi.setRowData(this.company.users)
        })
        .catch((error) => {
          console.log(error)
          return this.$router.push({ name: 'admin_companies' })
        })
    },
    async deleteCompany() {
      await axios
        .delete('http://localhost:3000/api/admin/companies/' + this.companySlug, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.company = null
          this.$toast.open({
            type: 'success',
            message: 'This company has been updated'
          })
          setTimeout(() => {
            this.$router.push({ name: 'admin_companies' })
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
      return this.$router.push({ name: 'admin_user', params: { id: params.data.id } })
    }
  }
}
</script>
