<template>
  <nav class="bg-white w-full z-20 top-0 left-0 border-b-4 border-primary">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink :to="{ name: 'home' }" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black"
          >LeBonDéveloppeur</span
        >
      </RouterLink>
      <div class="flex items-center md:order-2">
        <RouterLink
          class="bg-primary rounded px-2 text-white 2xl:block sm:hidden hidden mr-3"
          :to="{ name: 'login' }"
          v-if="this.$user.isAuthenticated === false"
          >Connexion</RouterLink
        >
        <RouterLink
          class="text-black 2xl:block sm:hidden hidden"
          :to="{ name: 'first_step_register' }"
          v-if="this.$user.isAuthenticated === false"
          >Inscription</RouterLink
        >
        <RouterLink
          class="bg-primary rounded px-2 text-white 2xl:block sm:hidden hidden mr-3"
          :to="{ name: 'admin' }"
          v-if="this.$user.isAuthenticated === true && this.$user.isAdmin"
          >Administration</RouterLink
        >
        <button
          @click="userDropdown = !userDropdown"
          v-if="this.$user.isAuthenticated === true"
          type="button"
          class="flex mr-3"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" :src="user.image" crossorigin="anonymous" />
        </button>
        <!-- Dropdown menu -->
        <div
          v-if="this.$user.isAuthenticated === true"
          style="position: absolute; inset: 0px auto auto; margin-top: 70px; margin-left: -50px"
          :class="{ hidden: !userDropdown, block: userDropdown }"
          class="my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white"
              >{{ user.firstname }} {{ user.lastname }}</span
            >
            <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{
              user.email
            }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <RouterLink
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                :to="{ name: 'admin' }"
                v-if="this.$user.isAdmin"
                >Administration</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                :to="{ name: 'advertisment_create' }"
                v-if="this.$user.isAuthenticated === true && this.$user.company !== null"
                >Poster une annonce</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                :to="{ name: 'company_advertisments' }"
                v-if="this.$user.isAuthenticated === true && this.$user.company !== null"
                >Voir les candidatures</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                :to="{ name: 'settings' }"
                >Mes informations</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                :to="{ name: 'settings' }"
                v-if="this.$user.isAuthenticated === true && this.$user.company === null"
                >Mes candidatures</RouterLink
              >
            </li>
            <li>
              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Déconnexion</a
              >
            </li>
          </ul>
        </div>

        <button
          @click="headerCollapsed = !headerCollapsed"
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
        :class="{ hidden: !headerCollapsed, block: headerCollapsed }"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <RouterLink
              :to="{ name: 'candidats' }"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500"
              >Les candidats</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'companies' }"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500"
              >Les entreprises</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="bg-primary rounded px-2 text-white md:hidden sm:block"
              :to="{ name: 'login' }"
              v-if="this.$user.isAuthenticated === false"
              >Connexion</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="text-black md:hidden sm:block"
              :to="{ name: 'first_step_register' }"
              v-if="this.$user.isAuthenticated === false"
              >Inscription</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="bg-primary rounded px-2 mb-2 text-white md:hidden sm:block text-center"
              :to="{ name: 'admin' }"
              v-if="this.$user.isAuthenticated === true && this.$user.isAdmin"
              >Administration</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="bg-primary rounded px-2 text-white md:hidden sm:block text-center"
              :to="{ name: 'advertisment_create' }"
              v-if="this.$user.isAuthenticated === true && this.$user.company !== null"
              >Poster une annonce</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      headerCollapsed: false,
      userDropdown: false,
      user: this.$user
    }
  },
  mounted() {
    this.onScreenResize()
  },
  methods: {
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.headerCollapsed = false
        this.userDropdown = false
        //document.getElementById('user-dropdown').style.transform = null;
      })
    },
    logout() {
      this.$user.setLogout()
      this.$router.push({ name: 'home' })
    }
  },
  watch: {
    userDropdown(dropdownState) {
      console.log(window.innerWidth)
      if (window.innerWidth <= 800) {
        document.getElementById('user-dropdown').style.marginLeft = dropdownState ? '-180px' : null
      } else if (window.innerWidth <= 958) {
        document.getElementById('user-dropdown').style.marginLeft = dropdownState ? '-180px' : null
      } else if (window.innerWidth <= 783) {
        document.getElementById('user-dropdown').style.marginLeft = dropdownState ? '-150px' : null
      } else if (window.innerWidth <= 766) {
        document.getElementById('user-dropdown').style.marginLeft = dropdownState ? '-110px' : null
      } else {
        document.getElementById('user-dropdown').style.marginLeft = dropdownState ? '-50px' : null
      }
    }
  }
}
</script>
