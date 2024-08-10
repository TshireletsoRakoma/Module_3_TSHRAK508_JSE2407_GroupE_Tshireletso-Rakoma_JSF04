import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      searchTerm: '',
      sorting: 'default',
      filterItem: 'All categories',
    };
  },
  mutations: {
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setSorting(state, sorting) {
      state.sorting = sorting;
    },
    setFilterItem(state, filterItem) {
      state.filterItem = filterItem;
    },
  },
  actions: {
    updateSearchTerm({ commit }, searchTerm) {
      commit('setSearchTerm', searchTerm);
    },
    updateSorting({ commit }, sorting) {
      commit('setSorting', sorting);
    },
    updateFilterItem({ commit }, filterItem) {
      commit('setFilterItem', filterItem);
    },
  },
  getters: {
    searchTerm: (state) => state.searchTerm,
    sorting: (state) => state.sorting,
    filterItem: (state) => state.filterItem,
  },

  
});

export default store;
