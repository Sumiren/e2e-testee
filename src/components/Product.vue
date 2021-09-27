<template>
  <div class="product">
    <ul>
      <li v-for="item in products" :key="item.id">
        <span>{{ item.productName}}</span>
        <button v-on:click="remove(item.id)" class="remove">削除</button>
      </li>
    </ul>
    <router-link to="/product/add" class="link">追加</router-link>
  </div>
</template>

<script>
export default {
  name: 'Product',
  computed: {
    products() {
      return this.$store.getters.products.filter(p => !p.archived);
    },
  },
  beforeRouteEnter(to, from, next) {
    setTimeout(next, 200);
  },
  methods: {
    remove(productId) {
      console.log(`product id :${productId}`);
      this.$store.dispatch('removeProduct', { id: productId });
    },
  },
};
</script>


<style scoped>
ul {
  padding: 0 ;
  width:80%;
  margin: 20px auto;
}

ul li, ol li {
  color: #404040;
  border-left-style: solid;
  border-left-width: 6px;/*左側の線*/
  border-left-color: #d5d5d5;
  border-bottom: solid 2px #dadada;/*下に灰色線*/
  background: whitesmoke;
  margin-bottom: 5px;/*下のバーとの余白*/
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none!important;/*ポチ消す*/
  font-weight: bold;
  text-align:left;
}

.remove{
  color:white;
  margin:0 0 0 auto;
  display:block;
  text-align:right;
  background-color:red;
  float: right;
  border-color:#FF4422;
}
.remove + * {
  clear: both;
}

.link {
  text-decoration: none;
  display:inline-block;
  background-color:#9999EE;
  padding:10px 20px;
  border-radius: 5%;
  text-align:center;
  cursor: pointer;
  box-shadow    : 3px 3px 3px #777799;
  color:white;
}
</style>
