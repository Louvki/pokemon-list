<template>
  <div class="about" v-if="pokemon">
    <h1>This is an about page</h1>
    <img :src="pokemon.sprites.other['official-artwork'].front_default" alt="">
        <p>{{pokemon.name}}</p>
    <p>Height: {{pokemon.height}}</p>
    <p>Weight: {{pokemon.weight}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pokemon: null,
    };
  },
  async mounted() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id }`)
    this.pokemon = res.data;
  },
};
</script>
