<template>
  <div class="container">
    <router-link
      :to="{
        name: 'Home',
        query: {
          activeSort: $store.state.activeSort,
          searchQuery: $store.state.searchQuery,
          currentPage: $store.state.currentPage
        }
      }"
    >
      <img
        class="back-arrow"
        src="https://www.pinclipart.com/picdir/big/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
        alt=""
      />
    </router-link>

    <div class="about" v-if="pokemon">
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.other['official-artwork'].front_default" alt="" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      pokemon: null
    }
  },
  async mounted() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
    this.pokemon = res.data
  }
}
</script>

<style scoped>
.container {
  max-width: 1340px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}

.back-arrow {
  width: 50px;
  margin-top: 30px;
  margin-bottom: 40px;
}

.about {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
