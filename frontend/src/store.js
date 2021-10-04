import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    products: [],
    loading: false,
  },
  getters: {
    message(state) { return state.message; },
    products(state) { return state.products; },
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload.message;
    },
    start(state) { state.loading = true; },
    end(state) { state.loading = false; },
    addProduct(state, payload) {
      state.products.push(payload.product);
    },
    removeProduct(state, payload) {
      const index = state.products.findIndex(p => p.id === payload.product.id);
      const product = state.products[index];
      product.archived = true;
      Vue.set(state.products, index, product);
    },
  },
  actions: {
    doUpdate({ commit }, message) {
      commit('setMessage', { message });
    },
    addProduct({ commit }, product) {
      commit('addProduct', { product });
    },
    removeProduct({ commit }, product) {
      commit('removeProduct', { product });
    },
  },
});

export default store;

