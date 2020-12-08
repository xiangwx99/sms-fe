const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login.vue')
  },

  {
    path: '/',
    name: 'Layout',
    component: () => import('../layouts/Layout.vue')
  }
]

export default routes