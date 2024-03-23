<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <ag-grid-vue
      :style="{ height: agGridHeight, width: '100%' }"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="users"
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
      users: [],
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
          headerName: 'Firstname',
          field: 'firstname',
          sortable: true /* filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] } */
        },
        {
          headerName: 'Lastname',
          field: 'lastname',
          sortable: true /* filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] } */
        },
        {
          headerName: 'Email address',
          field:
            'email' /* filter: true, floatingFilter: true, filterParams: { filterOptions: ['contains'] } */
        },
        { headerName: 'Company', field: 'company' },
        { headerName: 'Created At', field: 'created_at' },
        { headerName: 'Updated At', field: 'updated_at' }
      ]
    }
  },
  mounted() {
    this.onScreenResize()
    this.getUsers()
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
    async getUsers() {
      const queriesFormatted = new URLSearchParams(this.queries).toString()
      await axios
        .get('http://localhost:3000/api/admin/users?' + queriesFormatted, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          response.data.forEach((user) => {
            this.users.push({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              company: user.company !== null ? user.company.name : 'No company',
              created_at: this.formatDate(user.createdAt),
              updated_at:
                user.updatedAt !== null ? this.formatDate(user.updatedAt) : 'Not updated yet'
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
      this.gridApi.setRowData(this.users)
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
