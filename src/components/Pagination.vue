<template>
  <div class="pagination-wrapper">
    <a class="btn btn-dark" @click="changeCurrentPage(currentPage - 1)">Previous</a>
    <p class="page-numbers">{{ currentPage }} / {{ numberOfPages }}</p>
    <a class="btn btn-dark" @click="changeCurrentPage(currentPage + 1)">Next</a>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    numberOfPages: {
      type: Number,
      require: true
    }
  },
  methods: {
    changeCurrentPage(newPage) {
      if (newPage < 1 || newPage > this.numberOfPages) {
        return
      }
      this.$emit('currentPageChanged', newPage)
    }
  }
}
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.page-numbers {
  margin: 0 12px;
  align-items: center;
  display: flex;
}

.btn {
  background: transparent;
  color: #1f1f1f;
  cursor: pointer;

  min-width: 120px;
  text-align: center;

  border-radius: 0px;
  text-decoration: none;
  padding: 12px 18px;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  letter-spacing: 3px;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-dark {
  border: none;
  background: transparent;
  color: #1f1f1f;
}
.btn-dark:hover,
.btn-dark.active {
  /* border:solid 2px #1f1f1f; */
  background: #1f1f1f;
  color: #fff;
}
</style>
