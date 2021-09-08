<template>
  <button
    v-if="currentPage !== 1"
    @click="$refs.pagination.pageChange(currentPage - 1)"
  >
    Previous
  </button>
  <button
    v-if="currentPage !== pageCount"
    @click="$refs.pagination.pageChange(currentPage + 1)"
  >
    Next
  </button>
  <div>
    <select v-model="activeSort" @change="applySort">
      <option :value="sortType.NONE">Sort by</option>
      <option :value="sortType.NAME_ASC">Name Ascending</option>
      <option :value="sortType.NAME_DESC">Name Descending</option>
      <option :value="sortType.WEIGHT_ASC">Weight Ascending</option>
      <option :value="sortType.WEIGHT_DESC">Weight Descending</option>
      <option :value="sortType.HEIGHT_ASC">Height Ascending</option>
      <option :value="sortType.HEIGHT_DESC">Height Descending</option>
    </select>
  </div>
  <div>
    <p @click="updateCardsPerPage(10)">10</p>
    <p @click="updateCardsPerPage(20)">20</p>
    <p @click="updateCardsPerPage(50)">50</p>
  </div>
  <input type="text" v-model="searchQuery" v-on:input="applySearchQuery" />

  <Card
    v-for="pokemon of cards"
    v-show="!pokemon._hideCard"
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
    const sortType = {
      NONE: "none",
      NAME_ASC: "name_asc",
      NAME_DESC: "name_desc",
      WEIGHT_ASC: "weight_asc",
      WEIGHT_DESC: "weight_esc",
      HEIGHT_ASC: "height_asc",
      HEIGHT_DESC: "height_desc",
    };

    const activeSort = this.$route.params.activeSort || sortType.NONE;
    const searchQuery = this.$route.params.searchQuery || "";

    return {
      cards: [],
      originalCardOrder: [],
      cardsPerPage: 20,
      totalAmountOfCards: 0,
      currentPage: 1,
      searchQuery,
      activeSort,
      sortType,
    };
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    pageChangedCallback(newPage) {
      this.currentPage = newPage;
      this.fetchCards();
    },
    updateCardsPerPage(newAmount) {
      if (newAmount !== this.cardsPerPage) {
        this.cardsPerPage = newAmount;
        this.fetchCards();
      }
    },
    applySearchQuery() {
      this.$router.push({
        path: "/",
        query: { activeSort: this.activeSort, searchQuery: this.searchQuery },
      });

      this.cards.forEach((card) => {
        let hideCard = !card.name.includes(this.searchQuery);
        card.abilities.forEach((ability) => {
          if (hideCard) {
            hideCard = !ability.ability.name.includes(this.searchQuery);
          }
        });
        card._hideCard = hideCard;
      });
    },
    applySort() {
      this.$router.push({
        path: "/",
        query: { activeSort: this.activeSort, searchQuery: this.searchQuery },
      });

      switch (this.activeSort) {
        case this.sortType.NONE:
          this.cards = this.originalCardOrder;
          break;
        case this.sortType.NAME_ASC:
          this.cards.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          break;
        case this.sortType.NAME_DESC:
          this.cards.sort((a, b) =>
            b.name > a.name ? 1 : a.name > b.name ? -1 : 0
          );
          break;
        case this.sortType.WEIGHT_ASC:
          this.cards.sort((a, b) =>
            a.weight > b.weight ? 1 : b.weight > a.weight ? -1 : 0
          );
          break;
        case this.sortType.WEIGHT_DESC:
          this.cards.sort((a, b) =>
            a.weight > b.weight ? 1 : b.weight > a.weight ? -1 : 0
          );
          break;
        case this.sortType.HEIGHT_ASC:
          this.cards.sort((a, b) =>
            a.height > b.height ? 1 : b.height > a.height ? -1 : 0
          );
          break;
        case this.sortType.HEIGHT_DESC:
          this.cards.sort((a, b) =>
            b.height > a.height ? 1 : a.height > b.height ? -1 : 0
          );
          break;
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

        this.originalCardOrder = pokemonList;
        this.cards = pokemonList;

        this.applySort();
        this.applySearchQuery();
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
