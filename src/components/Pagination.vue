<template>
  <div>
    <ul>
      <li v-for="page in pageRange" :key="page" @click="pageChange(page)">
        {{ page }} _
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageRange: [],
      pageStart: 20,
      pageEnd: 30,
    };
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    numberOfPages: {
      type: Number,
      require: true,
    },
  },
  mounted() {
    this.pageChange(1);
  },
  computed: {
    currentPageVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("pageChange", Number(value));
      },
    },
  },
  methods: {
    pageChange(page) {
      this.currentPageVal = page;
      let start = page - 4;
      let end = page + 5;

      // Check if range
      if (start < 1) {
        end = end + 1 - start;
        start = 1;
      }

      if (end > this.numberOfPages) {
        end = this.numberOfPages;
        start = end - 9;
        if (start < 1) {
          start = 1;
        }
      }

      this.pageRange = [];
      while (start <= end) {
        this.pageRange.push(start);
        start++;
      }
    },
  },
};
</script>

<style>
</style>
