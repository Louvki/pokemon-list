<template>
<button v-if="currentPage !== 1" @click="$refs.pagination.pageChange(currentPage - 1)">Previous</button>
<button v-if="currentPage !== pageCount" @click="$refs.pagination.pageChange(currentPage + 1)">Next</button>
  <div>
    <p @click="chengeCarddsPerPage(10)">10</p>
    <p @click="chengeCarddsPerPage(20)">20</p>
    <p @click="chengeCarddsPerPage(50)">50</p>
  </div>
  <input type="text" v-model="searchQuery" v-on:input ="filterCards">
  <Card
    v-for="pokemon of cards"
    v-show="!pokemon.hideCard"
    :key="pokemon.id"
    :image="pokemon.sprites.other['official-artwork'].front_default"
    :name="pokemon.name"
    :height="pokemon.height"
    :weight="pokemon.weight"
    :abilities="pokemon.abilities"
  />
  <div class="pagination">
    <Pagination
    v-if="pageCount"
    ref="pagination"
    :currentPage="currentPage"
    :numberOfPages="pageCount"
    @pageChange="pageChangedCallback"
    />

  </div>
</template>

<script>
/* eslint-disable quotes */
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";
import axios from "axios";

export default {
  components: {
    Pagination,
    Card,
  },
  data() {
    return {
      cards: [],
      cardsPerPage: 20,
      totalAmountOfCards: 0,
      currentPage: 1,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    filterCards() {
      this.cards.forEach(card => {
        card.hideCard = !card.name.includes(this.searchQuery)
      })
    },
    pageChangedCallback(newPage) {
      this.currentPage = newPage;
      this.fetchCards();
    },
    chengeCarddsPerPage(newAmount) {
      if (newAmount !== this.cardsPerPage) {
        this.cardsPerPage = newAmount;
        this.fetchCards();
      }
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
