import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'Details',
    component: Details,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
