import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import Contacto from '@/components/Contacto.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: Contacto
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
