<template>
  <div>
    <span>{{productName}}</span>
    <input v-on:input="input">
    <button v-on:click="click">GO!</button>
  </div>
</template>

<script>
export default {
  name: 'ProductAdd',
  data: () => ({
    productName: '',
  }),
  methods: {
    input(event) {
      this.productName = event.target.value;
    },
    click() {
      this.$store.dispatch('addProduct', {
        productName: this.productName,
        id: this.$store.getters.products.length,
      });
      this.$router.push('/product');
    },
  },
};
</script>

<style scoped>

</style>
