<template>
    <section class="page3">
        <van-nav-bar title="Page3" left-arrow fixed @click-left="handleClick('page1')"></van-nav-bar>
        <van-button @click="handleClick('demo', true)">返回Demo并重新create</van-button>
        <p style="font-size: 14px;">点击手机物理键也返回Demo页面不重新create</p>
    </section>
</template>

<script>
import XBack from '@/lib/back'
export default {
    name: 'page3',
    data () {
        return {
            back: true
        }
    },
    created () {
        console.log('created page3')
        XBack.listen(() => {
            this.back && this.goBackListen({
                name: 'demo',
                num: 1
            })
        })
    },
    methods: {
        handleClick (name, refresh) {
            this.back = false
            this.goBackListen({
                name,
                refresh
            })
        }
    }
}
</script>

<style lang="less" scoped>
.page3 {
    padding-top: 46px;
}
</style>
