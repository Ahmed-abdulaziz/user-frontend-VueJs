import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserProfile from '../components/UserProfile.vue';
import CreateUser from '../components/CreateUser.vue';
import UpdateUser from '../components/UpdateUser.vue';

const routes = [
  { path: '/', component: UserList },
  { path: '/users/:id', component: UserProfile },
  { path: '/users/:id/edit', component: UpdateUser },
  { path: '/create-user', component: CreateUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;