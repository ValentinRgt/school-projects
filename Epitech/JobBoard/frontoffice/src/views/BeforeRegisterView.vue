<template>
  <Header />
  <section class="h-screen">
    <div class="h-full">
      <div class="g-6 flex h-full flex-wrap items-center justify-center">
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <h1 class="text-4xl mb-4">Vous êtes :</h1>
          <RouterLink
            :to="{ name: 'register' }"
            @click="UserIs('candidat')"
            class="text-white hover:bg-secondary_light bg-secondary shadow-md rounded px-4 transition-colors w-full font-medium rounded-lg text-sm sm:w-auto px-5 py-2"
          >
            <span>Un Candidat</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            @click="UserIs('enterprise')"
            class="text-white hover:bg-secondary_light bg-secondary shadow-md rounded px-4 transition-colors w-full font-medium rounded-lg text-sm sm:w-auto px-5 py-2"
          >
            <span>Une entreprise</span>
          </RouterLink>
        </div>

        <div
          class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
        >
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header
  },
  methods: {
    UserIs(params) {
      localStorage.setItem('register_state', params)
    }
  }
}
</script>
