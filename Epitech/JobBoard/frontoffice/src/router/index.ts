import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/User'

const title = 'Le Bon Développeur'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/HomeView.vue'),
      meta: { title: title + ' | Administration', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'users',
          name: 'admin_users',
          meta: { title: title + ' | Users | Administration' },
          component: () => import('../views/admin/UsersView.vue')
        },
        {
          path: 'users/:id',
          name: 'admin_user',
          meta: { title: title + ' | User | Administration' },
          component: () => import('../views/admin/UserView.vue')
        },
        {
          path: 'companies',
          name: 'admin_companies',
          meta: { title: title + ' | Companies | Administration' },
          component: () => import('../views/admin/CompaniesView.vue')
        },
        {
          path: 'company/:slug',
          name: 'admin_company',
          meta: { title: title + ' | Company | Administration' },
          component: () => import('../views/admin/CompanyView.vue')
        },
        {
          path: 'advertisments',
          name: 'admin_advertisments',
          meta: { title: title + ' | Advertisments | Administration' },
          component: () => import('../views/admin/AdvertismentsView.vue')
        },
        {
          path: 'advertisments/:slug',
          name: 'admin_advertisment',
          meta: { title: title + ' | Advertisment | Administration' },
          component: () => import('../views/admin/AdvertismentView.vue')
        },
        {
          path: 'logs',
          name: 'admin_logs',
          meta: { title: title + ' | Logs | Administration' },
          component: () => import('../views/admin/LogsView.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      meta: { title: title + ' | Accueil' },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/first_step_register',
      name: 'first_step_register',
      meta: { title: title + ' | Inscription' },
      component: () => import('../views/BeforeRegisterView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: title + ' | Inscription' },
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { title: title + ' | Mes informations', requiresAuth: true },
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/enterprise_register',
      name: 'enterprise_register',
      meta: { title: title + ' | Inscription Entreprise' },
      component: () => import('../views/EnterpriseRegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: title + ' | Connexion' },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/companies',
      name: 'companies',
      meta: { title: title + ' | Les entreprises' },
      component: () => import('../views/AllCompaniesView.vue')
    },
    {
      path: '/company/:slug',
      name: 'company_single',
      meta: { title: title + ' | Entreprise' },
      component: () => import('../views/CompanyView.vue')
    },
    {
      path: '/candidats',
      name: 'candidats',
      meta: { title: title + ' | Les candidats' },
      component: () => import('../views/AllCandidatView.vue')
    },
    {
      path: '/candidate/:id',
      name: 'candidate',
      meta: { title: title + " | Profil d'un candidat" },
      component: () => import('../views/CandidateView.vue')
    },
    {
      path: '/advertisment/:slug',
      name: 'advertisment',
      meta: { title: title + ' | Les candidats' },
      component: () => import('../views/AllCandidatView.vue')
    },
    {
      path: '/advertisment/create',
      name: 'advertisment_create',
      meta: { title: title + ' | Poster une annonce', requiresAuth: true, requiresCompany: true },
      component: () => import('../views/AdvertismentCreate.vue')
    },
    {
      path: '/company/advertisments',
      name: 'company_advertisments',
      meta: { title: title + ' | Les candidats', requiresAuth: true, requiresCompany: true },
      component: () => import('../views/CompanyAdvertisments.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: { title: title + ' | Page introuvable' },
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  document.title = to.meta.title || title

  if (to.meta.requiresAuth === true && userStore.isAuthenticated === false) {
    next({ name: 'login' })
  }

  if (to.meta.requiresAdmin === true && userStore.isAdmin === false) {
    next({ name: 'home' })
  }

  if (to.meta.requiresCompany === true && userStore.company === null) {
    next({ name: 'home' })
  }

  if ((to.name === 'login' || to.name === 'register') && userStore.isAuthenticated === true) {
    next({ name: 'home' })
  }

  next()
})

export default router
