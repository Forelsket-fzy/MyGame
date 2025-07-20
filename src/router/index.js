// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import Homepage from '../components/Homepage.vue';
import Login from '../components/Login-2.vue';
// import Homepage from '../components/Homepage.vue';
import MyGames from '../components/MyGames.vue';
import Manager from '../components/Manager.vue';
import Home from '../components/Home.vue';
import admin from '../components/admin-login.vue';
import gamexx from '../components/gamexx.vue';
import index from '../components/index.vue';

const routes = [
  {
    path: '/',
    // 根路径重定向到登录页面
    redirect: '/index'
  },
  {
    path: '/index',   
    name: 'index',
    component: index
  },

  {
    path: '/login-2',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/Homepage',
  //   name: 'Homepage',
  //   component: Homepage
  // },
  {
    path: '/MyGames',
    name: 'MyGames',
    component: MyGames
  },
  {

    path:'/Manager',
    name:'Manager',
    component:Manager

  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: admin
  },
  {
    path: '/gamexx/:game_id',
    name: 'gamexx',
    component: gamexx
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;