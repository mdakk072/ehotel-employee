import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Loginpage from '../views/Loginpage.vue'
import dashboard from '../views/dashboard/dashboard.vue'
import Page1 from '../components/Page1.vue'
import LoginClientpage from '../views/client/LoginClientPage.vue'
import BookRoomView from '../views/client/BookRoomView.vue'
import ChambresClientView from '../views/client/ChambresClientView.vue'
import MyReservationsView from '../views/client/MyReservationsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{

    path: '/login',
    name: 'Login Page',
    component: Loginpage
  },{
    path: '/dashboard',
    name: 'dashboard',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:dashboard
  },{
    path: '/dashboard/:token',
    name: 'dashboard',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:dashboard
  },{
    path: '/dashboard/settings',
    name: 'Page1',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:Page1,
  },{
    path: '/dashboard/:token',
    name: 'dashboard',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:dashboard
  },{
    path: '/dashboard/hotel/:token',
    name: 'HotelView',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/HotelView.vue')
  },{
    path: '/dashboard/chaine/:token',
    name: 'ChaineView',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/ChaineView.vue')
  },
  ,{
    path: '/dashboard/reservation/:token',
    name: 'ReservationView',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/ReservationView.vue')
  },{
    path: '/dashboard/location/:token',
    name: 'LocationView',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/LocationView.vue')
  },{
    path: '/dashboard/clients/:token',
    name: 'ClientView',
    props: true ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/ClientView.vue')
  },{

    path: '/loginClient',
    name: 'Login Client Page',
    component: LoginClientpage
  },{

    path: '/bookRoom/:token',
    name: 'Book Room Page',
    props: true ,
    component: BookRoomView
  },{

  path: '/chambresClient/:token/:idhotel',
  name: 'Chambres Client Page',
  props: true ,
  component: ChambresClientView
  },{

  path: '/myReservations/:token',
  name: 'My Reservations Page',
  props: true ,
  component: MyReservationsView
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
