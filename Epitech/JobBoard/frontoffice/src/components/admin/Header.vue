<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            @click="sidebar = !sidebar"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <RouterLink :to="{ name: 'home' }" class="flex ml-2 md:mr-24">
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >LBDev</span
            >
          </RouterLink>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
                @click="dropdown = !dropdown"
              >
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" :src="user.image" crossorigin="anonymous" />
              </button>
            </div>
            <div
              :class="{ block: dropdown, hidden: !dropdown }"
              class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              style="position: absolute; inset: 0px auto auto 0px; margin: 0px"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ user.firstname }} {{ user.lastname }}
                </p>
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {{ user.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    @click="logout()"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    :class="{ '-translate-x-full': sidebar, 'transform-none': !sidebar }"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink
            :to="{ name: 'admin' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="ml-3">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'admin_users' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'admin_companies' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">Companies</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'admin_advertisments' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">Advertisments</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'admin_logs' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">Logs</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
      sidebar: true,
      dropdown: false,
      user: this.$user
    }
  },
  mounted() {
    this.onScreenResize()
  },
  methods: {
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.dropdown = false
      })
    },
    logout() {
      this.$user.setLogout()
      this.$router.push({ name: 'home' })
    }
  },
  watch: {
    dropdown(dropdownState) {
      let width = window.innerWidth - 197
      document.getElementById('dropdown-user').style.transform = dropdownState
        ? 'translate3d(' + width + 'px, 58.4px, 0px)'
        : 'translate3d(356px, 58.4px, 0px)'
    }
  }
}
</script>
