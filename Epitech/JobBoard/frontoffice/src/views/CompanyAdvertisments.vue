<template>
  <Header />

  <div
    id="banner"
    tabindex="-1"
    class="flex z-50 gap-8 justify-between items-start py-5 px-40 mb-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center"
  >
    <div class="flex justify-start items-center">
      <div class="mr-3">
        <img
          class="rounded-full w-20 h-20 bg-gray-200"
          :src="user.company.image"
          crossorigin="anonymous"
        />
      </div>
      <div>
        <h1>{{ user.company.name }}</h1>
      </div>
    </div>
  </div>

  <div class="px-52 mt-20">
    <h1 class="text-center text-4xl mb-4">Les candidats</h1>
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

<script lang="ts">
import Header from '../components/Header.vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import axios from 'axios'

export default {
  data() {
    return {
      user: this.$user,
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
          sortable: true
        },
        { headerName: 'Adresse e-mail ou Utilisateur', field: 'sendTo' },
        { headerName: 'Status', field: 'status' },
        { headerName: "Date d'envoi", field: 'sendedAt' },
        { headerName: 'Dernière mise à jour', field: 'updatedAt' }
      ]
    }
  },
  components: {
    Header,
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
        .get('http://localhost:3000/api/companies/candidates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.forEach((company) => {
            company.advertisments.forEach((advertisment) => {
              const advertismentName = advertisment.name
              advertisment.advertisments.forEach((advertisment) => {
                this.advertisments.push({
                  id: advertisment.id,
                  name: advertismentName,
                  user: advertisment.user !== null ? advertisment.user.id : null,
                  sendTo:
                    advertisment.user !== null
                      ? advertisment.user.firstname + ' ' + advertisment.user.lastname
                      : advertisment.sendTo,
                  status: advertisment.status,
                  sendedAt: this.formatDate(advertisment.sendedAt),
                  updatedAt:
                    advertisment.updatedAt !== null
                      ? this.formatDate(advertisment.updatedAt)
                      : 'Aucune mise à jour'
                })
              })
            })
          })
          this.gridApi.paginationSetPageSize(this.queries.limit)
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
    async onCellClicked(params) {
      await axios
        .put(
          'http://localhost:3000/api/companies/candidates',
          { id: params.data.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then((response) => {
          console.log('OK')
          if (params.data.user !== null) {
            return this.$router.push({ name: 'candidate', params: { id: params.data.user } })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
