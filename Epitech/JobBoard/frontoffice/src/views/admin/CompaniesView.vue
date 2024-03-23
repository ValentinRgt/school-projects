<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <ag-grid-vue
      :style="{ height: agGridHeight, width: '100%' }"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="companies"
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
      companies: [],
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
          headerName: 'Company Name',
          field: 'name',
          sortable: true /*filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] }*/
        },
        {
          headerName: 'Company Number',
          field: 'siret',
          sortable: true /*filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] }*/
        },
        {
          headerName: 'Website',
          field:
            'website' /*filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] }*/
        },
        { headerName: 'Company Address', field: 'address' },
        { headerName: 'Created At', field: 'created_at' },
        { headerName: 'Updated At', field: 'updated_at' }
      ]
    }
  },
  mounted() {
    this.onScreenResize()
    this.getCompanies()
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
    async getCompanies() {
      await axios
        .get('http://localhost:3000/api/admin/companies', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.forEach((company) => {
            this.companies.push({
              id: company.id,
              slug: company.slug,
              name: company.name,
              siret: company.siret,
              website: company.website,
              address: company.address,
              created_at: this.formatDate(company.createdAt),
              updated_at:
                company.updatedAt !== null ? this.formatDate(company.updatedAt) : 'Not updated yet'
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
      this.gridApi.setRowData(this.companies)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('default', { dateStyle: 'long', timeStyle: 'long' }).format(
        date
      )
    },
    onCellClicked(params) {
      return this.$router.push({ name: 'admin_company', params: { slug: params.data.slug } })
    }
  }
}
</script>
