<template>
  <Header />
  <main>
    <section>
      <article class="flex mx-auto w-2/3 justify-between my-16">
        <div class="flex flex-col justify-center">
          <h2 class="text-3xl font-bold">
            Le bon developpeur n'attend plus <br />
            qu'une bonne entreprise.
          </h2>
          <span class="text-lg">Trouvez le votre dès maintenant</span>
        </div>
        <img
          class="w-1/4"
          src="@/assets/images/home_background.png"
          alt="business man doing a handshake with a person"
        />
      </article>
      <SearchBar class="" />
    </section>
    <section class="flex flex-col">
      <div class="flex w-4/5 mx-auto justify-between gap-8">
        <CardUser
          name="Arsene Cyrille"
          title="Développeur Back"
          place="Lyon"
          expe="10 ans d'expériences"
          img="arsene.jpg"
        />
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <ButtonPrimary class="mx-auto text-2xl" title="Voir tous les profils" />
    </section>
    <section class="flex w-4/5 mx-auto justify-between">
      <div>
        <p>
          Choississez les languages qu'il vous faut, et découvrez les profils qui répondront à vos
          attentes.
        </p>
      </div>
      <div class="flex flex-col items-center">
        <h3>Les languages de programmations</h3>
        <div class="grid grid-cols-4">
          <img src="@/assets/images/prog_icons/c.png" alt="" />
          <img src="@/assets/images/prog_icons/java.png" alt="" />
          <img src="@/assets/images/prog_icons/php.png" alt="" />
          <img src="@/assets/images/prog_icons/ruby.png" alt="" />
          <img src="@/assets/images/prog_icons/css-3.png" alt="" />
          <img src="@/assets/images/prog_icons/html-5.png" alt="" />
          <img src="@/assets/images/prog_icons/julia.png" alt="" />
          <img src="@/assets/images/prog_icons/python.png" alt="" />
          <img src="@/assets/images/prog_icons/swift.png" alt="" />
          <img src="@/assets/images/prog_icons/sql.png" alt="" />
          <img src="@/assets/images/prog_icons/javascript.png" alt="" />
          <img src="@/assets/images/prog_icons/c-sharp.png" alt="" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Header from '../components/Header.vue'
import SearchBar from '../components/SearchBar.vue'
import CardUser from '../components/CardUser.vue'
import ButtonPrimary from '../components/ButtonPrimary.vue'
export default {
  components: {
    Header,
    SearchBar,
    CardUser,
    ButtonPrimary
  }
}
</script>
