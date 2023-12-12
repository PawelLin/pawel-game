<template>
    <section>
        <van-nav-bar title="小游戏"></van-nav-bar>
        <div class="contain">
            <van-grid :column-num="2">
                <van-grid-item to="/game/fight">
                    <van-icon slot="icon" class-prefix="icon" name="plane" size="0.7rem" />
                    <span slot="text">飞行棋</span>
                </van-grid-item>
                <van-grid-item to="/game/sudoku">
                    <van-icon slot="icon" name="edit" size="0.7rem" />
                    <span slot="text">数独</span>
                </van-grid-item>
                <van-grid-item to="/demo">
                    <van-icon slot="icon" name="exchange" size="0.7rem" />
                    <span slot="text">监听返回</span>
                </van-grid-item>
            </van-grid>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/assets/game/icons/iconfont.css';
</style>
