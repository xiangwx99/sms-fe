const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login')
  },

  {
    path: '/',
    name: 'Layout',
    component: () => import('../layouts/Layout'),
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('views/profile/Profile')
      }
    ]
  }
]

export default routes