<template>
    <div id="app">
        <!-- <van-button @click="on = !on">按钮</van-button> -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"
    >
            <keep-alive :include="list">
                <router-view />
            </keep-alive>
            <!-- <div v-if="on" class="test">123</div> -->
        </transition>
    </div>
</template>

<script>
import Velocity from 'velocity-animate'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            on: false
        }
    },
    beforeCreate () {
        this.winScrollTop = 0
        this.divMarginTop = 0
        this.duration = 300
    },
    computed: mapState({
        list: state => state.list,
        forward: state => state.forward,
        routes: state => state.routes
    }),
    methods: {
        beforeEnter (el) {
            console.log('beforeEnter')
            if (this.forward !== null) {
                el.style.position = 'absolute'
                el.style.width = '100%'
                this.winScrollTop = document.documentElement.scrollTop || document.body.scrollTop
                if (this.forward) {
                    window.scrollTo(0, 0)
                    Velocity(el, { translateX: '100%' }, { duration: 0 })
                } else {
                    this.divMarginTop = this.routes[this.$route.name].scrollTop
                    document.body.style.height = this.routes[this.$route.name].height + 'px'
                    window.scrollTo(0, this.divMarginTop)
                    el.style.marginTop = ''
                    el.children[0].style.top = this.divMarginTop + 'px'
                    Velocity(el, { translateX: '-100%' }, { duration: 0 })
                }
            }
        },
        enter (el, done) {
            console.log('enter')
            if (this.forward !== null) {
                Velocity(el, { translateX: 0 }, { duration: this.duration, complete: done })
            }
        },
        afterEnter (el) {
            el.style.position = ''
            el.style.width = ''
            document.body.style.height = ''
            el.style.marginTop = ''
            el.children[0].style.top = ''
            el.style.transform = ''
            console.log('afterEnter')
        },
        enterCancelled (el) {
            console.log('enterCancelled')
        },
        beforeLeave (el) {
            console.log('beforeLeave')
            el.style.position = 'absolute'
            el.style.width = '100%'
            el.style.transform = 'translate3d(0, 0, 0)'
            el.children[0].style.top = this.winScrollTop + 'px'
            if (this.forward) {
                el.style.marginTop = -this.winScrollTop + 'px'
            } else {
                el.style.marginTop = (this.divMarginTop - this.winScrollTop) + 'px'
            }
        },
        leave (el, done) {
            console.log('leave')
            setTimeout(() => {
                if (this.forward) {
                    Velocity(el, { translateX: '-100%' }, { duration: this.duration, complete: done })
                } else {
                    Velocity(el, { translateX: '100%' }, { duration: this.duration, complete: done })
                }
            }, 10)
        },
        afterLeave (el) {
            el.style.position = ''
            el.style.width = ''
            el.style.transform = ''
            el.children[0].style.top = ''
            el.style.marginTop = ''
            console.log('afterLeave')
        },
        leaveCancelled (el) {
            console.log('leaveCancelled')
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
}
#app > section {
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
