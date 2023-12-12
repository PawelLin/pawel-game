<template>
    <div id="app">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"
            :css="false"
        >
            <keep-alive :include="include">
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Velocity from 'velocity-animate'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            on: false,
            isTabbar: true
        }
    },
    computed: mapState({
        include: state => {
            const include = state.routes.filter(item => !item.refresh && !state.tabbar.includes(item.name)).map(item => item.name).concat(
                state.tabbar.filter(item => {
                    const tabbarRoute = state.tabbarRoutes[item]
                    return !tabbarRoute || (tabbarRoute && !tabbarRoute.refresh)
                })
            )
            return include
        },
        forward: state => state.forward,
        routes: state => {
            const routes = {}
            state.routes.forEach(item => {
                routes[item.name] = item
            })
            return routes
        },
        tabbarRoutes: state => state.tabbarRoutes,
        tabbar: state => state.tabbar,
        fromRoute: state => state.fromRoute,
        transition: state => state.transition
    }),
    beforeCreate () {
        this.duration = 300
    },
    methods: {
        beforeEnter (el) {
            // console.log('beforeEnter', el.style.transform, el)
            this.isTabbar = this.tabbar.includes(this.$route.name) && this.tabbar.includes(this.fromRoute)
            this.isTransition = this.transition
            this.isForward = this.forward
            if (this.isTransition) {
                if (this.isForward !== null) {
                    el.style.position = 'absolute'
                }
            }
        },
        enter (el, done) {
            // console.log('enter', el.style.transform, el)
            const { refresh, scrollTop = 0 } = this.tabbarRoutes[this.$route.name] || this.routes[this.$route.name] || {}
            if (this.isTransition) {
                if (this.isForward !== null) {
                    const translateX = this.isForward ? '100%' : '-100%'
                    Velocity(el, { translateX: ['0%', translateX] }, { duration: this.duration, complete: done })
                    if (this.isForward) {
                    } else {
                        if (refresh) { // 需要刷新页面就不设置scrollTop了
                            this.$store.commit('setRoute', { name: this.$route.name, refresh: false })
                        } else {
                            el.querySelector('.contain').scrollTop = scrollTop
                        }
                    }
                }
            } else {
                if (this.isTabbar) {
                    el.querySelector('.contain').scrollTop = scrollTop
                }
                done()
            }
        },
        afterEnter (el) {
            // console.log('afterEnter', el.style.transform, el)
            if (this.isTransition) {
                el.style.position = ''
            }
        },
        enterCancelled (el) {
            // console.log('enterCancelled')
        },
        beforeLeave (el) {
            // console.log('beforeLeave', el.style.transform, el)
            if (this.isTransition) {
                el.style.position = 'absolute'
            }
        },
        leave (el, done) {
            // console.log('leave', el.style.transform, el)
            if (this.isTransition) {
                const translateX = this.isForward ? '-100%' : '100%'
                Velocity(el, { translateX: [translateX, '0%'] }, { duration: this.duration, complete: done })
            } else {
                done()
            }
        },
        afterLeave (el) {
            // console.log('afterLeave', el.style.transform, el)
            if (this.isTransition) {
                el.style.position = ''
                Velocity(el, { translateX: '0%' }, { duration: 0 })
            }
            if (this.transition === false) {
                this.$store.commit('setTransition', true)
            }
        },
        leaveCancelled (el) {
            // console.log('leaveCancelled')
        }
    }
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body, #app {
    height: 100%;
    font-size: 12px;
}
#app > section {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    > .contain {
        flex: 1;
        overflow-y: auto;
    }
    // background-color: #999;
}
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    position: absolute;
    top: 0;
    width: 100%;
    transition: all 2s ease;
}
.slide-left-enter, .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}
.slide-right-enter, .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
}
// .slide-left-enter, .slide-left-leave-active {
//     // opacity: 0;
// }
// .slide-right-enter, .slide-right-leave-active {
//     // opacity: 0;
// }
.test {
    height: 200px;
    background-color: #f9c;
}
</style>
