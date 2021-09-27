<template>
  <transition name="loading">
    <div class="loading" v-if="loading">
      <div class="loading-message">Loading...</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  computed: {
    loading() { return this.$store.state.loading; },
  },
};
</script>

<style scoped>

  .loading{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .7);
    display: table;
  }
  .loading-message{
    display: table-cell;
    height:100%;
    margin:auto;
    vertical-align:middle;
  }
  /*.loading-enter-active{*/
  /*  transition: all 0.25s;*/
  /*}*/

  /*.loading-leave-active{*/
  /*  transition: all 0.25s;*/
  /*}*/
</style>
