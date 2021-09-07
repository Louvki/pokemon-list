<template>
  <div>
    <p>Previous</p>
    <p>Next</p>
  </div>
  <div>Home</div>
  <div>
    PAG
    <pagination
      v-model="currentPage"
      :records="totalAmountOfCards"
      :per-page="cardsPerPage"
      @paginate="myCallback"
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
      cardsPerPage: 10,
      totalAmountOfCards: 0,
      currentPage: 1,
    };
  },
  async mounted() {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.cardsPerPage}`,
    );
    const results = res.data;
    console.log(results);
    this.totalAmountOfCards = results.count;
    console.log(this.pageCount);
  },
  methods: {
    clickCallback(page) {
      console.log(page);
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalAmountOfCards / this.cardsPerPage);
    },
  },
};
</script>
