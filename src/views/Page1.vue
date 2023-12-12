<template>
    <section class="page1">
        <van-nav-bar title="Page1" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <div class="fixed"></div>
            <van-field v-for="i in 50" v-model="text" label="文本" :key="i" />
            <van-button @click="handleReplacePage2">跳转Page2(replace)</van-button>
            <van-button @click="handleToPage3">跳转Page3</van-button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'page1',
    data () {
        return {
            text: ''
        }
    },
    created () {
        console.log('created page1')
    },
    methods: {
        handleClick () {
            this.goBack({
                name: 'demo'
            })
        },
        handleReplacePage2 () {
            this.replaceRoute({
                name: 'page2'
            })
        },
        handleToPage3 () {
            this.$router.push({
                name: 'page3'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.page1 {
}
.fixed {
    position: fixed;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: hotpink;
    z-index: 1;
}
</style>
