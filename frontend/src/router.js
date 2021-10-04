import VueRouter from 'vue-router';
import Vue from 'vue';
import Product from './components/Product';
import ProductAdd from './components/ProductAdd';
import Home from './components/Home';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter(
  {
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      {
        name: 'Product',
        path: '/product',
        component: Product,
      },
      {
        name: 'ProductAdd',
        path: '/product/add',
        component: ProductAdd,
      },
    ],
  },
);

router.beforeEach((to, from, next) => {
  store.commit('start');
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  store.commit('end');
});

export default router;
