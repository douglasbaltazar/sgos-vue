import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Tecnicos from '../views/Tecnicos.vue'
import Clientes from '../views/Clientes.vue'
import Servicos from '../views/Servicos.vue'
import TecnicoForm from '../views/TecnicoForm.vue'
import ClienteForm from '../views/ClienteForm.vue'
import ServicosForm from '../views/ServicosForm.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tecnicos',
    name: "Tecnicos",
    component: Tecnicos
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/servicos',
    name: 'Servicos',
    component: Servicos
  },
  {
    path: '/tecnicos/novo',
    name: 'Novo Tecnico',
    component: TecnicoForm
  },
  {
    path: '/clientes/novo',
    name: 'Novo Cliente',
    component: ClienteForm
  },
  {
    path: '/servicos/novo',
    name: 'Agendamento',
    component: ServicosForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
