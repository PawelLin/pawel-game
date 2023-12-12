import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    // scrollBehavior (to, from, savedPosition) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (savedPosition) {
    //                 resolve(savedPosition)
    //             } else {
    //                 resolve({ x: 0, y: 0 })
    //             }
    //         }, 2000)
    //     })
    // },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "game" */ './views/game/Home.vue')
        },
        {
            path: '/game/sudoku',
            name: 'sudoku',
            component: () => import(/* webpackChunkName: "game" */ './views/game/Sudoku.vue')
        },
        {
            path: '/game/fight',
            name: 'fight',
            component: () => import(/* webpackChunkName: "game" */ './views/game/Fight.vue')
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import(/* webpackChunkName: "demo" */ './components/demo/index.vue')
        },
        {
            path: '/page1',
            name: 'page1',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page1.vue')
        },
        {
            path: '/page2',
            name: 'page2',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page2.vue')
        },
        {
            path: '/page3',
            name: 'page3',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page3.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('setRoutes', { to, from })
    if (store.state.forward) {
        const scrollTop = document.querySelector('#app > section > .contain').scrollTop || 0
        store.commit('setRoute', { name: from.name, scrollTop })
    }
    next()
})
router.afterEach(to => {
})

export default router
