
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/blank.vue'),
    children: [
      { path: '', component: () => import('pages/Login/Index.vue') },
      { path: 'big-screen', component: () => import('pages/Admin/BigScreen.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Admin/Index.vue') },
      { path: 'control-panel', component: () => import('pages/Admin/ControlPanel.vue') },
      { path: 'settings', component: () => import('pages/Admin/Setting.vue') }
    ]
  },
  {
    path: '/cashier',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cashier/Index.vue') }
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
