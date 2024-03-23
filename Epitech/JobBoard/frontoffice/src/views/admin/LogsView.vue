<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <ag-grid-vue
      :style="{ height: agGridHeight, width: '100%' }"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="logs"
      :animateRows="true"
      @grid-ready="onGridReady"
      :getRowId="getRowId"
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
      agGridHeight: window.innerHeight - 85 + 'px',
      logs: [],
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
        { headerName: 'Type', field: 'type', sortable: true },
        { headerName: 'User', field: 'user', sortable: true },
        { headerName: 'Company', field: 'company', sortable: true },
        { headerName: 'Advertisment', field: 'advertisment', sortable: true },
        { headerName: 'Created At', field: 'createdAt' }
      ]
    }
  },
  mounted() {
    this.onScreenResize()
    this.getLogs()
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
    async getLogs() {
      const queriesFormatted = new URLSearchParams(this.queries).toString()
      await axios
        .get('http://localhost:3000/api/admin/logs?' + queriesFormatted, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.forEach((log) => {
            this.logs.push({
              id: log.id,
              type: log.type,
              user: log.options.userId !== undefined ? 'Yes - ' + log.options.userId : 'No',
              company:
                log.options.companyId !== undefined ? 'Yes - ' + log.options.companyId : 'No',
              advertisment:
                log.options.advertismentId !== undefined
                  ? 'Yes - ' + log.options.advertismentId
                  : 'No',
              createdAt: this.formatDate(log.createdAt)
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
      this.gridApi.setRowData(this.logs)
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
