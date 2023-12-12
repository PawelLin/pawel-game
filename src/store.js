import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routes: [],
        include: [],
        forward: null,
        back: 0,
        tabbarRoutes: {},
        tabbar: ['home', 'sort', 'cart', 'my'],
        fromRoute: '',
        transition: true
    },
    mutations: {
        setRoutes (state, route) {
            const { to: { name, params: { replace, forward } }, from } = route
            state.fromRoute = from && from.name
            if (!from || !from.name) {
                state.routes = [{ name }]
                state.include = [name]
                state.forward = null
            } else if (replace) {
                const routeLength = state.routes.length - 1
                state.routes[routeLength].name = name
                state.include[routeLength] = name
                state.forward = forward !== undefined ? forward : true
            } else {
                const toIndex = state.include.indexOf(name)
                if (toIndex === -1) {
                    state.routes.push({ name })
                    state.include.push(name)
                    state.forward = true
                } else {
                    state.forward = false
                    state.back = state.include.length - toIndex - 1
                    state.routes = state.routes.slice(0, toIndex + 1)
                    state.include = state.include.slice(0, toIndex + 1)
                }
            }
        },
        setRoute (state, { name, ...params }) {
            const isTabbar = state.tabbar.includes(name)
            if (isTabbar && !state.tabbarRoutes[name]) {
                Vue.set(state.tabbarRoutes, name, {})
            }
            const routeIndex = state.include.indexOf(name)
            const route = isTabbar ? state.tabbarRoutes[name] : state.routes[routeIndex]
            if (route) {
                Object.keys(params).forEach(key => {
                    if (route.hasOwnProperty(key)) {
                        route[key] = params[key]
                    } else {
                        // keep-live，include的计算属性与refresh关联，此处需给新属性refresh设置get/set方法，以便触发计算属性
                        Vue.set(route, key, params[key])
                    }
                })
            }
        },
        setTransition (state, transition) {
            state.transition = transition
        }
    },
    actions: {

    }
})
