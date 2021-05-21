
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/blank.vue'),
    children: [
      { path: '', component: () => import('pages/Login/login.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Admin/index.vue') },
      { path: 'big_screen', component: () => import('pages/Admin/big_screen.vue') }
    ]
  },

  {
    path: '/cashier',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cashier/index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
