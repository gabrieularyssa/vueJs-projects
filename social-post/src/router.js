
import Vue from 'vue'
import Router from 'vue-router'
import firebaseConfig from './services/firebaseConnection'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Perfil from './pages/Perfil'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Home,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/perfil/:userid',
            component: Perfil,
            props: true,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            component: Login,
        },
    ]
})

//configurando o redirecionamento para pagina de login de usuarios nao atenticados
router.beforeEach((to, from, next) => {
    //quando a propriedade do meta for true, ele faz a verificação e protege a rota
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    //const requiresAuth = true/false
    if(requiresAuth && !firebaseConfig.auth().currentUser){
        //se a rota devolveu true para a necessidade da verificação e o usuario nao esta logado .. 
        next('/login')
    }else{
        next()
    }
})

export default router
