import { createStore } from 'vuex'

export default createStore({
  state: {
    sortType: {
      NONE: 'none',
      NAME_ASC: 'name_asc',
      NAME_DESC: 'name_desc',
      WEIGHT_ASC: 'weight_asc',
      WEIGHT_DESC: 'weight_esc',
      HEIGHT_ASC: 'height_asc',
      HEIGHT_DESC: 'height_desc'
    },
    activeSort: 'none',
    searchQuery: '',
    currentPage: 1

  },
  mutations: {
    SET_ACTIVE_SORT(state, newVal) {
      state.activeSort = newVal;
    },
    SET_SEARCH_QUERY(state, newVal) {
      state.searchQuery = newVal;
    },
    SET_CURRENT_PAGE(state, newVal) {
      state.currentPage = newVal;
    }
  }
})
