<template>
  <AdminHeader />
  <div class="p-4 mt-[50px] sm:ml-64">
    <div class="flex flex-wrap">
      <div class="mt-4 w-full lg:w-6/12 xl:w-4/12 px-5 mb-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg"
        >
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">Users</h5>
                <span class="font-semibold text-xl text-blueGray-700">{{ users }}</span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div
                  class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                >
                  <font-awesome-icon icon="users" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 w-full lg:w-6/12 xl:w-4/12 px-5">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg"
        >
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">advertisments</h5>
                <span class="font-semibold text-xl text-blueGray-700">{{ advertisments }}</span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div
                  class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500"
                >
                  <font-awesome-icon icon="envelope-open-text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 w-full lg:w-6/12 xl:w-4/12 px-5">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
        >
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">Companies</h5>
                <span class="font-semibold text-xl text-blueGray-700">{{ companies }}</span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div
                  class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-gray-500"
                >
                  <font-awesome-icon icon="building" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '../../components/admin/Header.vue'
import axios from 'axios'
export default {
  components: {
    AdminHeader
  },
  data() {
    return {
      users: 0,
      advertisments: 0,
      companies: 0
    }
  },
  mounted() {
    this.getStatistics()
  },
  methods: {
    async getStatistics() {
      await axios
        .get('http://localhost:3000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          this.users = response.data.users
          this.advertisments = response.data.advertisments
          this.companies = response.data.companies
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
