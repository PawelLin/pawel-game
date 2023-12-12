<template>
    <div class="lazy-background-image" v-lazy:background-image="image" :style="{ height }">
        <div class="van-image__loading lazy-loading">
            <van-icon name="photo-o" class="van-image__loading-icon" />
        </div>
        <div class="van-image__loading lazy-error">
            <van-icon name="photo-o" class="van-image__loading-icon" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'lazyBackgroundImage',
    props: {
        image: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.lazy-background-image {
    position: relative;
    height: 100%;
    background-position: center;
    background-size: cover;
    .lazy-loading, .lazy-error {
        display: none;
    }
    &[lazy = loading] {
        .lazy-loading {
            display: flex;
        }
    }
    &[lazy = error] {
        .lazy-error {
            display: flex;
        }
    }
}
</style>
