<template>
    <section class="sudoku">
        <van-nav-bar title="数独" left-arrow @click-left="handleBack"></van-nav-bar>
        <div class="contain">
            <div class="main">
                <div v-for="(list, index) in data" :key="`big-${index}`">
                    <div
                        v-for="(item, inde) in list"
                        :key="`middle-${index}-${inde}`"
                        :class="[(!item.default && !item.value) && 'show-tip', selected.value && selected.value === item.value && 'common',  item.active && 'active', item.focus && 'focus']"
                        @click="handleClick(index, inde, item)"
                    >
                        <template v-if="!item.default && !item.value">
                            <div
                                v-for="(tip, ind) in item.tips"
                                :key="`tip-${index}-${inde}-${ind}`"
                                :class="[tip.visabled && 'visabled']"
                            >
                                <span>{{tip.value}}</span>
                            </div>
                        </template>
                        <span v-else
                            class="normal"
                            :class="[item.default && 'default']"
                        >{{item.value}}</span>
                    </div>
                </div>
            </div>
            <van-grid class="buttons" :border="false">
                <van-grid-item class="buttons-icon" @click="handleErase">
                    <van-icon class-prefix="icon" name="erase"/>
                    <span class="buttons-icon-text">擦除</span>
                </van-grid-item>
                <van-grid-item icon="replay" text="撤回" />
                <van-grid-item class="buttons-icon">
                    <van-icon name="edit" />
                    <span class="buttons-icon-text">笔记</span>
                    <van-switch
                        class="buttons-edit-switch"
                        v-model="showTip"
                        size="0.3rem"
                        active-color="#61acae"
                    ></van-switch>
                </van-grid-item>
                <van-grid-item icon="bulb-o" text="提示" />
            </van-grid>
            <div v-show="!selected.default" class="number">
                <div
                    @click="setNumber(item.value, index)"
                    v-for="(item, index) in selected.tips"
                    :key="`number-${item.value}`"
                    :class="[
                        showTip && 'showTip',
                        item.visabled && 'visabled'
                    ]"
                >
                    {{item.value}}
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { data } from './data'

export default {
    name: 'sudoku',
    data () {
        return {
            data: [],
            selected: {},
            showTip: false
        }
    },
    created () {
        this.initData()
    },
    methods: {
        initData () {
            const datas = []
            JSON.parse(JSON.stringify(data)).forEach(list => {
                list.forEach(item => {
                    item.tips = Array.from(new Array(9)).map((item, index) => ({ value: index + 1, visabled: false }))
                })
                datas.push(list)
            })
            this.data = this.setTogether(datas)
            console.log(this.data)
        },
        handleBack () {
            this.$router.go(-1)
        },
        handleInput (index) {
            this.socket.emit('setData', {
                index,
                value: this.list[index].value
            })
        },
        handleClick (index1, index2, items) {
            items.left = index1
            items.right = index2
            let selected = []
            this.data.forEach((list, inde1) => {
                list.forEach((item, inde2) => {
                    item.focus = inde1 === index1 && inde2 === index2
                    item.active = items.together.includes(`${inde1}${inde2}`)
                    if (item.active) {
                        let value = this.data[inde1][inde2].value
                        value && selected.push(value)
                    }
                })
            })
            this.selected = items
        },
        setNumber (value, index) {
            if (this.showTip) {
                this.selected.tips[index].visabled = !this.selected.tips[index].visabled
                return
            }
            // if (this.selected.key !== value) {
            //     this.$toast('错误')
            //     return
            // }
            this.selected.value = value
        },
        handleErase () {
            if (this.showTip) {
                (this.selected.tips || []).forEach(tip => {
                    tip.visabled = false
                })
            } else {
                this.selected.value = ''
            }
        },
        setTogether (datas) {
            const Numbers1 = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
            const Numbers2 = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
            datas.forEach((list, index1) => {
                let same = Array.from(new Array(9)).map((item, index) => `${index1}${index}`)
                list.forEach((item, index2) => {
                    let left1 = Numbers1[Math.floor(index1 / 3)]
                    let right1 = Numbers1[Math.floor(index2 / 3)]
                    let left2 = Numbers2[index1 % 3]
                    let right2 = Numbers2[index2 % 3]
                    item.together = Array.from(new Set([...left1.map(item1 => right1.map(item2 => `${item1}${item2}`).join()).join().split(','),
                        ...left2.map(item1 => right2.map(item2 => `${item1}${item2}`).join()).join().split(','),
                        ...same])
                    )
                })
            })
            return datas
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/game/icons/iconfont.css';
.main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 100vw;
    height: 100vw;
    grid-gap: 1px 1px;
    background-color: #517e7c;
    border: 1px solid #517e7c;
    > div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 1px 1px;
        background-color: #cfdac7;
        text-align: center;
        .normal {
            font-size: 26px;
            color: #3a8751;
            line-height: 1.5;
            &.default {
                color: #23605d;
            }
            &.bold {
                font-weight: bold;
            }
        }
        > div {
            background-color: #f6f9f2;
            &.show-tip {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                color: #587e67;
                > div {
                    position: relative;
                    visibility: hidden;
                    > span {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    &.visabled {
                        visibility: visible
                    }
                }
            }
            &.active {
                background-color: #f2f5e2;
            }
            &.common {
                background-color: #dfefaa;
            }
            &.focus {
                background-color: #d2dfa7;
            }
        }
    }
}
.buttons {
    color: #61acae;
    /deep/ span {
        color: #61acae;
    }
    /deep/ .van-grid-item > div {
        background-color: transparent;
    }
    &-icon {
        color: #61acae;
        /deep/ .van-icon, /deep/ .icon {
            font-size: 28px;
        }
        &-text {
            margin-top: 6px;
        }
        .buttons-edit-switch {
            position: absolute;
            top: 20px;
            right: 10px;
        }
    }
}
.number {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-gap: 6px 6px;
    height: calc(100vw / 9);
    font-size: 26px;
    text-align: center;
    > div {
        border: 1px solid transparent;
        line-height: 1.5;
        &.showTip {
            color: #587e67;
            &.visabled {
                border: 1px solid #587e67;
            }
        }
        &:not(.showTip) {
            color: #125958;
        }
    }
}
</style>
