import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isAuthenticated: false,
    id: null,
    firstname: null,
    lastname: null,
    image: null,
    email: null,
    phone: null,
    description: null,
    isPublic: false,
    isAdmin: false,
    company: null
  }),
  getters: {
    getIsAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    async checkIfAuthenticated() {
      const authToken = localStorage.getItem('token')

      if (authToken === null) {
        return (this.isAuthenticated = false)
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user/me', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        this.isAuthenticated = true
        this.id = response.data.id
        this.firstname = response.data.firstname
        this.lastname = response.data.lastname
        this.email = response.data.email
        this.phone = response.data.phone
        this.image =
          response.data.image === null
            ? 'http://localhost:3000/static/avatar/avatar.png'
            : 'http://localhost:3000/static/avatar/' + response.data.image
        this.isPublic = response.data.isPublic
        this.description = response.data.description
        this.company = response.data.company
        this.isAdmin = response.data.isAdmin
      } catch (error) {
        this.setLogout()
      }
    },
    async setLogin(accessToken: string) {
      localStorage.setItem('token', accessToken)
      this.isAuthenticated = true
      await this.checkIfAuthenticated()
    },
    setLogout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
    }
  }
})
