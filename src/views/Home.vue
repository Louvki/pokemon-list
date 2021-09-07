<template>
  <Card
  v-for="pokemon of cards"
   :key="pokemon.id"
  :image="pokemon.sprites.other['official-artwork'].front_default"
  :name="pokemon.name"
  :height="pokemon.height"
  :weight="pokemon.weight"
  :abilities="pokemon.abilities"
   />
  <div class="pagination">
    <pagination
      v-model="currentPage"
      :records="totalAmountOfCards"
      :per-page="cardsPerPage"
      @paginate="pageChangedCallback"
    />
  </div>
</template>

<script>
/* eslint-disable quotes */
import Pagination from "v-pagination-3";
import Card from "../components/Card.vue";
import axios from "axios";

export default {
  components: {
    Pagination,
    Card,
  },
  data() {
    return {
      cards: [],
      cardsPerPage: 10,
      totalAmountOfCards: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    pageChangedCallback() {
      this.fetchCards();
    },
    async fetchCards() {
      const offset = (this.currentPage - 1) * this.cardsPerPage;

      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.cardsPerPage}&offset=${offset}`
        );
        this.totalAmountOfCards = res.data.count;
        const pokemonUrlList = res.data.results;

        const promiseList = [];
        for (const pokemon of pokemonUrlList) {
          promiseList.push(axios.get(pokemon.url));
        }

        const res2 = await Promise.all(promiseList);
        const pokemonList = [];
        for (const pokemonRes of res2) {
          pokemonList.push(pokemonRes.data);
        }

        this.cards = pokemonList;
      } catch (e) {}


    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalAmountOfCards / this.cardsPerPage);
    },
  },
};
</script>

<style >
.pagination ul {
  display: flex;
  list-style: none;
}

.pagination .page-link.active {
  color: red;
}
</style>
