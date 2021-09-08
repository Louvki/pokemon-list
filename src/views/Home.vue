<template>
  <div class="options-container">
    <div class="options-wrapper">
      <p>Search</p>
      <input type="text" v-model="searchQuery" v-on:input="applySearchQuery" />
    </div>
    <div class="options-wrapper">
      <p>Sort by</p>
      <select v-model="activeSort" @change="applySort">
        <option :value="sortType.NONE">None</option>
        <option :value="sortType.NAME_ASC">Name Ascending</option>
        <option :value="sortType.NAME_DESC">Name Descending</option>
        <option :value="sortType.WEIGHT_ASC">Weight Ascending</option>
        <option :value="sortType.WEIGHT_DESC">Weight Descending</option>
        <option :value="sortType.HEIGHT_ASC">Height Ascending</option>
        <option :value="sortType.HEIGHT_DESC">Height Descending</option>
      </select>
    </div>
    <div class="options-wrapper">
      <p>Cards per page</p>
      <select v-model="cardsPerPage" @change="cardsPerPageChanged">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
  <div class="pagination">
    <Pagination
      v-if="pageCount"
      :currentPage="currentPage"
      :numberOfPages="pageCount"
      @currentPageChanged="currentPageChanged"
    />
  </div>
  <div class="card-wrapper">
    <Card
      v-for="pokemon of cards"
      v-show="!pokemon._hideCard"
      :key="pokemon.id"
      :image="pokemon.sprites.other['official-artwork'].front_default"
      :name="pokemon.name"
      :height="pokemon.height"
      :weight="pokemon.weight"
      :abilities="pokemon.abilities"
      @click="$router.push(`${pokemon.name}`)"
    />
  </div>
  <div class="pagination">
    <Pagination
      v-if="pageCount"
      :currentPage="currentPage"
      :numberOfPages="pageCount"
      @currentPageChanged="currentPageChanged"
    />
  </div>
</template>

<script>
/* eslint-disable quotes */
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'

export default {
  components: {
    Pagination,
    Card
  },
  data() {
    const sortType = {
      NONE: 'none',
      NAME_ASC: 'name_asc',
      NAME_DESC: 'name_desc',
      WEIGHT_ASC: 'weight_asc',
      WEIGHT_DESC: 'weight_esc',
      HEIGHT_ASC: 'height_asc',
      HEIGHT_DESC: 'height_desc'
    }

    const activeSort = this.$route.params.activeSort || sortType.NONE
    const searchQuery = this.$route.params.searchQuery || ''

    return {
      cards: [],
      originalCardOrder: [],
      cardsPerPage: 20,
      currentPage: 1,
      totalAmountOfCards: 0,
      searchQuery,
      activeSort,
      sortType
    }
  },
  mounted() {
    this.fetchCards()
  },
  methods: {
    applySearchQuery() {
      this.updateQueryParams()

      this.cards.forEach((card) => {
        let hideCard = !card.name.includes(this.searchQuery)
        card.abilities.forEach((ability) => {
          if (hideCard) {
            hideCard = !ability.ability.name.includes(this.searchQuery)
          }
        })
        card._hideCard = hideCard
      })
    },
    applySort() {
      this.updateQueryParams()

      switch (this.activeSort) {
        case this.sortType.NONE:
          this.cards = []
          this.cards.push(...this.originalCardOrder)
          break
        case this.sortType.NAME_ASC:
          this.cards.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          break
        case this.sortType.NAME_DESC:
          this.cards.sort((a, b) => (b.name > a.name ? 1 : a.name > b.name ? -1 : 0))
          break
        case this.sortType.WEIGHT_ASC:
          this.cards.sort((a, b) => (a.weight > b.weight ? 1 : b.weight > a.weight ? -1 : 0))
          break
        case this.sortType.WEIGHT_DESC:
          this.cards.sort((a, b) => (a.weight > b.weight ? 1 : b.weight > a.weight ? -1 : 0))
          break
        case this.sortType.HEIGHT_ASC:
          this.cards.sort((a, b) => (a.height > b.height ? 1 : b.height > a.height ? -1 : 0))
          break
        case this.sortType.HEIGHT_DESC:
          this.cards.sort((a, b) => (b.height > a.height ? 1 : a.height > b.height ? -1 : 0))
          break
      }
    },
    async fetchCards() {
      const offset = (this.currentPage - 1) * this.cardsPerPage

      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.cardsPerPage}&offset=${offset}`)
        this.totalAmountOfCards = res.data.count
        const pokemonUrlList = res.data.results

        const promiseList = []
        for (const pokemon of pokemonUrlList) {
          promiseList.push(axios.get(pokemon.url))
        }

        const res2 = await Promise.all(promiseList)
        const pokemonList = []
        for (const pokemonRes of res2) {
          pokemonList.push(pokemonRes.data)
        }

        this.originalCardOrder = JSON.parse(JSON.stringify(pokemonList))
        this.cards = pokemonList

        this.applySort()
        this.applySearchQuery()
      } catch (e) {}
    },
    currentPageChanged(newPage) {
      this.currentPage = newPage
      this.updateQueryParams()
      this.fetchCards()
    },
    cardsPerPageChanged() {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount
      }
      this.fetchCards()
    },
    updateQueryParams() {
      this.$router.push({
        path: '/',
        query: { activeSort: this.activeSort, searchQuery: this.searchQuery, currentPage: this.currentPage }
      })
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalAmountOfCards / this.cardsPerPage)
    }
  }
}
</script>

<style scoped>
.options-container {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  padding: 0 30px;
}

.options-wrapper {
  min-width: 160px;
}

input {
  font-size: 14px;
}

select {
  margin-left: 2px;
  font-size: 14px;
  min-width: 60px;
}

.card-wrapper {
  max-width: 1340px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
}
</style>
