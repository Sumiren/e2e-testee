<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/product">商品情報</router-link>
    </nav>
    <transition name="view">
      <router-view/>
    </transition>
    <LoadingOverlay />
  </div>
</template>

<script>
import LoadingOverlay from './components/LoadingOverlay';

export default {
  name: 'App',
  components: {
    LoadingOverlay,
  },
  computed: {
    message() { return this.$store.getters.message; },
  },
  beforeRouteEnter(to, from, next) {
    setTimeout(next, 1000);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav{
  background-color:black;
  text-align:left;
}

.nav>a{
  color:white;
  text-decoration: none;
  display:inline-block;
  padding:6px;
}

.router-link-active{
  background:#e25193;
}

.view-enter-active{
  transition: opacity 3s;
}

/*.view-leave-active{*/
/*  position:absolute;*/
/*}*/

.view-enter, .view-leave-to{
  opacity:0;
}


</style>
