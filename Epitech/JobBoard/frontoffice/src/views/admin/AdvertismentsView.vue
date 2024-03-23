<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
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
      agGridHeight: window.innerHeight - 85 + 'px',
      advertisments: [],
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
          headerName: 'Name',
          field: 'name',
          sortable: true /*filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] }*/
        },
        { headerName: 'Company Name', field: 'company_name' },
        { headerName: 'Created At', field: 'created_at' },
        { headerName: 'Updated At', field: 'updated_at' }
      ]
    }
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
        .get('http://localhost:3000/api/admin/advertisments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.forEach((advertisment) => {
            this.advertisments.push({
              id: advertisment.id,
              slug: advertisment.slug,
              name: advertisment.name,
              company: advertisment.company,
              company_name: advertisment.company.name,
              created_at: this.formatDate(advertisment.createdAt),
              updated_at:
                advertisment.updatedAt !== null
                  ? this.formatDate(advertisment.updatedAt)
                  : 'Not updated yet'
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
    onCellClicked(params) {
      return this.$router.push({ name: 'admin_advertisment', params: { slug: params.data.slug } })
    }
  }
}
</script>
