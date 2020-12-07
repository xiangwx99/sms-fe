const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login.vue')
  }
]

export default routes