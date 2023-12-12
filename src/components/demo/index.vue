<template>
    <section class="demo">
        <van-nav-bar title="Demo" left-arrow @click-left="handleBack"></van-nav-bar>
        <div class="contain">
            <van-form class="contain" @submit="onSubmit">
                <!-- 输入任意文本 -->
                <van-field v-model="text" label="文本" />
                <!-- 输入手机号，调起手机号键盘 -->
                <van-field v-model="text" type="tel" label="手机号" />
                <!-- 允许输入正整数，调起纯数字键盘 -->
                <van-field v-model="text" type="digit" label="整数" />
                <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                <van-field v-model="text" type="number" label="数字" />
                <!-- 输入密码 -->
                <van-button @click="handleClick">跳转page1</van-button>
                <van-field v-for="i in 25" v-model="text" type="password" label="密码" :key="i + 'a'" />
                <van-field v-for="i in 25" v-model="text" type="password" label="密码" :key="i + 'b'" />
            </van-form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'demo',
    data () {
        return {
            text: ''
        }
    },
    activated () {
        console.log('activated demo')
    },
    created () {
        console.log('created demo')
    },
    methods: {
        onSubmit () {

        },
        handleClick () {
            this.$router.push({
                name: 'page1'
            })
        },
        handleBack () {
            this.goBack({
                name: 'home'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.demo {
}
</style>
