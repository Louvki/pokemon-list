<template>
<div v-for="pokemon of cards" :key="pokemon.id" class="card">
  <p>{{pokemon.name}}</p>
</div>
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
import axios from "axios";

export default {
  components: {
    Pagination,
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
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.cardsPerPage}&offset=${offset}`,
      );
      this.cards = res.data.results;
      this.totalAmountOfCards = res.data.count;
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
