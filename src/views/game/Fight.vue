<template>
    <section class="fight">
        <van-nav-bar title="飞行棋" left-arrow @click-left="handleBack"></van-nav-bar>
        <div class="contain">
            <div class="numbers">
                <animate-integer
                    color="yellow"
                    next-color="blue"
                    class="yellow"
                    :class="[active === 'yellow' && 'active']"
                    :active="active === 'yellow' && !waitFly"
                    @setNumber="setNumber"
                />
                <span>起飞 - 6</span>
                <animate-integer
                    color="blue"
                    next-color="green"
                    class="blue"
                    :class="[active === 'blue' && 'active']"
                    :active="active === 'blue' && !waitFly"
                    @setNumber="setNumber"
                />
            </div>
            <div class="grid">
                <div
                    v-for="(item, index) in items"
                    :ref="`item${index}`"
                    :style="{ gridArea: `span ${item.row || 1} / span ${item.col || 1}` }"
                    :class="[(item.color && `bg-${item.color}`) || 'bg-none', item.col >= item.row && 'nowrap']"
                    :key="`items-${index}`"
                    :yellow="item.yellow"
                    :blue="item.blue"
                    :green="item.green"
                    :red="item.red"
                >
                    <!-- <span>{{item.blue}}</span> -->
                    <div
                        v-if="item.plane" class="plane"
                        :ref="item.color + item.index"
                        :class="[
                            item.color && `plane-${item.color}`,
                            getActive(item)
                        ]"
                        :style="getStyle(item)"
                        @click="go(item.color, item.index)"
                    >
                        <van-icon v-if="getComplete(item)" class="plane-icon" class-prefix="icon" name="victory" size="0.6rem" />
                        <van-icon v-else class="plane-icon" class-prefix="icon" name="plane" size="0.4rem" />
                    </div>
                    <div
                        v-if="item.yellow === 1 || item.blue === 1 || item.green === 1 || item.red === 1"
                        :ref="`start-${
                            (item.yellow === 1 && 'yellow') ||
                            (item.blue === 1 && 'blue') ||
                            (item.green === 1 && 'green') ||
                            (item.red === 1 && 'red')
                        }`"
                        class="start"
                        :class="[
                            item.yellow === 1 && 'bg-yellow-top-left',
                            item.blue === 1 && 'bg-blue-top-right',
                            item.green === 1 && 'bg-green-bottom-right',
                            item.red === 1 && 'bg-red-bottom-left',
                        ]"
                    >
                        <span>起飞点</span>
                    </div>
                </div>
            </div>
            <div class="numbers">
                <animate-integer
                    color="red"
                    next-color="yellow"
                    class="red"
                    :class="[active === 'red' && 'active']"
                    :active="active === 'red' && !waitFly"
                    @setNumber="setNumber"
                />
                <animate-integer
                    color="green"
                    next-color="red"
                    class="green"
                    :class="[active === 'green' && 'active']"
                    :active="active === 'green' && !waitFly"
                    @setNumber="setNumber"
                />
            </div>
        </div>
    </section>
</template>

<script>
import AnimateInteger from './animateInteger.vue'

export default {
    name: 'fight',
    components: {
        AnimateInteger
    },
    data () {
        return {
            active: 'yellow',
            planeActive: '',
            number: 1,
            waitFly: false,
            flying: false,
            yellow: [
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 90, complete: false, start: false, zIndex: '' }
            ],
            blue: [
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 180, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 180, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 180, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 180, complete: false, start: false, zIndex: '' }
            ],
            green: [
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: -90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: -90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: -90, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: -90, complete: false, start: false, zIndex: '' }
            ],
            red: [
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 0, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 0, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 0, complete: false, start: false, zIndex: '' },
                { initTop: 0, initLeft: 0, top: 0, left: 0, index: -1, rotate: 0, complete: false, start: false, zIndex: '' }
            ],
            items: [
                { row: 3, col: 3, model: '', color: 'yellow', plane: true, index: 1 },
                { row: 3, col: 3, model: '', color: 'yellow', plane: true, index: 2 },
                { row: 6, col: 1, model: '' },
                { row: 3, col: 3, model: '', color: 'green-bottom-right', yellow: 7, blue: 43, green: 31, red: 19 },
                { row: 3, col: 2, model: '', color: 'red', yellow: 8, blue: 44, green: 32, red: 20 },
                { row: 3, col: 2, model: '', color: 'yellow', yellow: 9, blue: 45, green: 33, red: 21 },
                { row: 3, col: 2, model: '', color: 'blue', yellow: 10, blue: 46, green: 34, red: 22 },
                { row: 3, col: 2, model: '', color: 'green', yellow: 11, green: 35, red: 23 },
                { row: 3, col: 2, model: '', color: 'red', yellow: 12, green: 36, red: 24 },
                { row: 3, col: 3, model: '', color: 'yellow-bottom-left', yellow: 13, blue: 1, green: 37, red: 25, jump: true },
                { row: 6, col: 1, model: '' },
                { row: 3, col: 3, model: '', color: 'blue', plane: true, index: 1 },
                { row: 3, col: 3, model: '', color: 'blue', plane: true, index: 2 }, // 13

                { row: 3, col: 3, model: '', color: 'yellow', plane: true, index: 3 },
                { row: 3, col: 3, model: '', color: 'yellow', plane: true, index: 4 },
                { row: 2, col: 3, model: '', color: 'blue', yellow: 6, blue: 42, green: 30, red: 18 },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 2, model: '', color: 'blue', blue: 47 },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 3, model: '', color: 'blue', yellow: 14, blue: 2, green: 38, red: 26 },
                { row: 3, col: 3, model: '', color: 'blue', plane: true, index: 3 },
                { row: 3, col: 3, model: '', color: 'blue', plane: true, index: 4 }, // 22

                { row: 2, col: 3, model: '', color: 'yellow', yellow: 5, blue: 41, green: 29, red: 17 },
                { row: 2, col: 2, model: '', color: 'blue', blue: 48 },
                { row: 2, col: 3, model: '', color: 'green', yellow: 15, blue: 3, green: 39, red: 27 }, // 25

                { row: 1, col: 7, model: '' },
                { row: 1, col: 7, model: '' }, // 27

                { row: 3, col: 3, model: '', color: 'red-bottom-right', yellow: 1, blue: 37, green: 25, red: 13, jump: true },
                { row: 3, col: 2, model: '', color: 'yellow', yellow: 2, blue: 38, green: 26, red: 14 },
                { row: 3, col: 2, model: '', color: 'blue', yellow: 3, blue: 39, green: 27, red: 15 },
                { row: 3, col: 3, model: '', color: 'green-red', yellow: 4, blue: 40, green: 28, red: 16 },
                { row: 2, col: 4, model: '', color: 'red', arrow: true },
                { row: 2, col: 2, model: '', color: 'blue', blue: 49 },
                { row: 2, col: 4, model: '', color: 'red', arrow: true },
                { row: 3, col: 3, model: '', color: 'red-yellow', yellow: 16, blue: 4, green: 40, red: 28 },
                { row: 3, col: 2, model: '', color: 'blue', yellow: 17, blue: 5, green: 41, red: 29 },
                { row: 3, col: 2, model: '', color: 'green', yellow: 18, blue: 6, green: 42, red: 30 },
                { row: 3, col: 3, model: '', color: 'red-bottom-left', yellow: 19, blue: 7, green: 43, red: 31 }, // 38

                { row: 1, col: 4, model: '' },
                { row: 2, col: 2, model: '', color: 'blue', blue: 50 },
                { row: 1, col: 4, model: '' }, // 41

                { row: 2, col: 3, model: '', color: 'green', blue: 36, green: 24, red: 12 },
                { row: 4, col: 4, model: '' },
                { row: 4, col: 2, model: '', color: 'green', arrow: true },
                { row: 3, col: 5, model: '' },
                { row: 3, col: 5, model: '' },
                { row: 4, col: 2, model: '', color: 'yellow', arrow: true },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 3, model: '', color: 'yellow', yellow: 20, blue: 8, green: 44, red: 32 }, // 49

                { row: 2, col: 2, model: '', color: 'blue', blue: 51 }, // 50

                { row: 2, col: 3, model: '', color: 'blue', blue: 35, green: 23, red: 11 },
                { row: 2, col: 3, model: '', color: 'blue', yellow: 21, blue: 9, green: 45, red: 33 }, // 52

                { row: 1, col: 4, model: '' },
                { row: 4, col: 4, model: '', color: 'all', yellow: 52, blue: 52, green: 52, red: 52 },
                { row: 1, col: 4, model: '' }, // 55

                { row: 2, col: 3, model: '', color: 'yellow', yellow: 46, blue: 34, green: 22, red: 10 },
                { row: 2, col: 2, model: '', color: 'yellow', yellow: 47 },
                { row: 2, col: 2, model: '', color: 'yellow', yellow: 48 },
                { row: 2, col: 2, model: '', color: 'yellow', yellow: 49 },
                { row: 2, col: 2, model: '', color: 'yellow', yellow: 50 },
                { row: 2, col: 2, model: '', color: 'yellow', yellow: 51 },
                { row: 2, col: 2, model: '', color: 'green', green: 51 },
                { row: 2, col: 2, model: '', color: 'green', green: 50 },
                { row: 2, col: 2, model: '', color: 'green', green: 49 },
                { row: 2, col: 2, model: '', color: 'green', green: 48 },
                { row: 2, col: 2, model: '', color: 'green', green: 47 },
                { row: 2, col: 3, model: '', color: 'green', yellow: 22, blue: 10, green: 46, red: 34 }, // 67

                { row: 2, col: 3, model: '', color: 'red', yellow: 45, blue: 33, green: 21, red: 9 },
                { row: 4, col: 4, model: '' },
                { row: 4, col: 2, model: '', color: 'green', arrow: true },
                { row: 1, col: 4, model: '' },
                { row: 1, col: 4, model: '' },
                { row: 4, col: 2, model: '', color: 'yellow', arrow: true },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 3, model: '', color: 'red', yellow: 23, blue: 11, red: 35 }, // 75

                { row: 3, col: 5, model: '' },
                { row: 2, col: 2, model: '', color: 'red', red: 51 },
                { row: 3, col: 5, model: '' }, // 78

                { row: 2, col: 3, model: '', color: 'green', yellow: 44, blue: 32, green: 20, red: 8 },
                { row: 2, col: 3, model: '', color: 'yellow', yellow: 24, blue: 12, red: 36 }, // 80

                { row: 2, col: 2, model: '', color: 'red', red: 50 }, // 81

                { row: 3, col: 3, model: '', color: 'blue-top-right', yellow: 43, blue: 31, green: 19, red: 7 },
                { row: 3, col: 2, model: '', color: 'yellow', yellow: 42, blue: 30, green: 18, red: 6 },
                { row: 3, col: 2, model: '', color: 'red', yellow: 41, blue: 29, green: 17, red: 5 },
                { row: 3, col: 3, model: '', color: 'green-blue', yellow: 40, blue: 28, green: 16, red: 4 },
                { row: 1, col: 4, model: '' },
                { row: 1, col: 4, model: '' },
                { row: 3, col: 3, model: '', color: 'blue-yellow', yellow: 28, blue: 16, green: 4, red: 40 },
                { row: 3, col: 2, model: '', color: 'red', yellow: 27, blue: 15, green: 3, red: 39 },
                { row: 3, col: 2, model: '', color: 'green', yellow: 26, blue: 14, green: 2, red: 38 },
                { row: 3, col: 3, model: '', color: 'blue-top-left', yellow: 25, blue: 13, green: 1, red: 37, jump: true }, // 91

                { row: 2, col: 4, model: '', color: 'blue', arrow: true },
                { row: 2, col: 2, model: '', color: 'red', red: 49 },
                { row: 2, col: 4, model: '', color: 'blue', arrow: true }, // 94

                { row: 1, col: 7, model: '' },
                { row: 2, col: 3, model: '', color: 'yellow', yellow: 39, blue: 27, green: 15, red: 3 },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 2, model: '', color: 'red', red: 48 },
                { row: 4, col: 4, model: '' },
                { row: 2, col: 3, model: '', color: 'green', yellow: 29, blue: 17, green: 5, red: 41 },
                { row: 1, col: 7, model: '' }, // 101

                { row: 3, col: 3, model: '', color: 'red', plane: true, index: 1 },
                { row: 3, col: 3, model: '', color: 'red', plane: true, index: 2 },
                { row: 6, col: 1, model: '' },
                { row: 6, col: 1, model: '' },
                { row: 3, col: 3, model: '', color: 'green', plane: true, index: 1 },
                { row: 3, col: 3, model: '', color: 'green', plane: true, index: 2 }, // 107

                { row: 2, col: 3, model: '', color: 'red', yellow: 38, blue: 26, green: 14, red: 2 },
                { row: 2, col: 2, model: '', color: 'red', red: 47 },
                { row: 2, col: 3, model: '', color: 'red', yellow: 30, blue: 18, green: 6, red: 42 }, // 110

                { row: 3, col: 3, model: '', color: 'red', plane: true, index: 3 },
                { row: 3, col: 3, model: '', color: 'red', plane: true, index: 4 },
                { row: 3, col: 3, model: '', color: 'green-top-right', yellow: 37, blue: 25, green: 13, red: 1, jump: true },
                { row: 3, col: 2, model: '', color: 'blue', yellow: 36, blue: 24, green: 12 },
                { row: 3, col: 2, model: '', color: 'yellow', yellow: 35, blue: 23, green: 11 },
                { row: 3, col: 2, model: '', color: 'red', yellow: 34, blue: 22, green: 10, red: 46 },
                { row: 3, col: 2, model: '', color: 'green', yellow: 33, blue: 21, green: 9, red: 45 },
                { row: 3, col: 2, model: '', color: 'blue', yellow: 32, blue: 20, green: 8, red: 44 },
                { row: 3, col: 3, model: '', color: 'yellow-top-left', yellow: 31, blue: 19, green: 7, red: 43 },
                { row: 3, col: 3, model: '', color: 'green', plane: true, index: 3 },
                { row: 3, col: 3, model: '', color: 'green', plane: true, index: 4 } // 121
            ]
        }
    },
    mounted () {
        const all = this.$refs['item53'][0]
        all.style.borderWidth = `${all.getBoundingClientRect().width / 2}px`
        this.setPosition()
    },
    methods: {
        handleBack () {
            this.$router.go(-1)
        },
        setPosition () {
            let yellowList = []
            let blueList = []
            let greenList = []
            let redList = []
            this.items.forEach((item, index) => {
                if (item.yellow || item.blue || item.green || item.red) {
                    let { top, left, width, height } = this.$refs[`item${index}`][0].getBoundingClientRect()
                    let keys = item.color.match(/([a-z]+)-(.*)/) || []
                    if (keys[2] === 'bottom-right') {
                        top = top + height / 6
                        left = left + width / 4
                    }
                    if (keys[2] === 'bottom-left') {
                        top = top + height / 6
                        left = left - width / 4
                    }
                    if (keys[2] === 'top-left') {
                        top = top - height / 6
                        left = left - width / 4
                    }
                    if (keys[2] === 'top-right') {
                        top = top - height / 6
                        left = left + width / 4
                    }
                    let list = [{ top, left, width, height, color: item.color.split('-')[0] }]
                    if (item.jump) list[0].jump = item.jump
                    if (item.color === 'green-red') {
                        list = [
                            { top: top + height / 6, left: left - width / 4, width, height, color: 'green' },
                            { top: top - height / 6, left: left + width / 4, width, height, color: 'red', fly: true }
                        ]
                    }
                    if (item.color === 'red-yellow') {
                        list = [
                            { top: top - height / 6, left: left - width / 4, width, height, color: 'red' },
                            { top: top + height / 6, left: left + width / 4, width, height, color: 'yellow', fly: true }
                        ]
                    }

                    if (item.color === 'blue-yellow') {
                        list = [
                            { top: top - height / 6, left: left + width / 4, width, height, color: 'yellow' },
                            { top: top + height / 6, left: left - width / 4, width, height, color: 'blue', fly: true }
                        ]
                    }
                    if (item.color === 'green-blue') {
                        list = [
                            { top: top + height / 6, left: left + width / 4, width, height, color: 'blue' },
                            { top: top - height / 6, left: left - width / 4, width, height, color: 'green', fly: true }
                        ]
                    }
                    item.yellow && yellowList.push(...list.map(data => ({ ...data, index: item.yellow })))
                    item.blue && blueList.push(...list.map(data => ({ ...data, index: item.blue })))
                    item.green && greenList.push(...list.map(data => ({ ...data, index: item.green })))
                    item.red && redList.push(...list.map(data => ({ ...data, index: item.red })))
                }
                if (item.plane) {
                    let rect = this.$refs[`item${index}`][0].getBoundingClientRect()
                    let obj = this[item.color][item.index - 1]
                    let plane = this.$refs[item.color + item.index][0].getBoundingClientRect()
                    obj.initTop = rect.top
                    obj.initLeft = rect.left
                    obj.width = plane.width
                    obj.height = plane.height
                    obj.top = obj.endTop = rect.top + rect.height / 2 - plane.height / 2
                    obj.left = obj.endLeft = rect.left + rect.width / 2 - plane.width / 2
                    obj.endRotate = obj.rotate
                }
            })
            let starts = this.getStart()
            yellowList = this.setRotate(yellowList.sort((a, b) => a.index - b.index), 'yellow')
            greenList = this.setRotate(greenList.sort((a, b) => a.index - b.index), 'green')
            blueList = this.setRotate(blueList.sort((a, b) => a.index - b.index), 'blue')
            redList = this.setRotate(redList.sort((a, b) => a.index - b.index), 'red')
            this.list = {
                yellow: [starts.yellow, ...yellowList],
                blue: [starts.blue, ...blueList],
                green: [starts.green, ...greenList],
                red: [starts.red, ...redList]
            }
            this.setEndPosition(this.list)
        },
        getStyle (item) {
            let obj = this[item.color][item.index - 1]
            return { top: `${-obj.initTop}px`, left: `${-obj.initLeft}px`, transform: `translate(${obj.left}px, ${obj.top}px) rotate(${obj.rotate}deg)`, zIndex: item.zIndex }
        },
        getStart () {
            let { top: yTop, left: yLeft, width: yWidth, height: yHeight } = this.$refs['start-yellow'][0].getBoundingClientRect()
            let { top: bTop, left: bLeft, width: bWidth, height: bHeight } = this.$refs['start-blue'][0].getBoundingClientRect()
            let { top: gTop, left: gLeft, width: gWidth, height: gHeight } = this.$refs['start-green'][0].getBoundingClientRect()
            let { top: rTop, left: rLeft, width: rWidth, height: rHeight } = this.$refs['start-red'][0].getBoundingClientRect()
            return {
                yellow: { top: yTop - yHeight / 4, left: yLeft - yWidth / 8, width: yWidth, height: yHeight },
                blue: { top: bTop - bHeight / 8, left: bLeft + bWidth / 4, width: bWidth, height: bHeight },
                green: { top: gTop + gHeight / 4, left: gLeft + gWidth / 8, width: gWidth, height: gHeight },
                red: { top: rTop + rHeight / 8, left: rLeft - rWidth / 4, width: rWidth, height: rHeight }
            }
        },
        setEndPosition ({ yellow, blue, green, red }) {
            let lastYellow = yellow[yellow.length - 1]
            let lastBlue = blue[blue.length - 1]
            let lastGreen = green[green.length - 1]
            let lastRed = red[red.length - 1]
            lastYellow.left = lastYellow.left - lastYellow.width / 3
            lastBlue.top = lastBlue.top - lastBlue.height / 3
            lastGreen.left = lastGreen.left + lastGreen.width / 3
            lastRed.top = lastRed.top + lastRed.height / 3
        },
        setRotate (list, color) {
            let rotates = {
                yellow: { 5: 0, 8: 90, 13: 180, 18: 90, 21: 180, 26: 270, 31: 180, 34: 270, 39: 360, 44: 270, 47: 360, 50: 450 },
                blue: { 5: 90, 8: 180, 13: 270, 18: 180, 21: 270, 26: 360, 31: 270, 34: 360, 39: 450, 44: 360, 47: 450, 50: 540 },
                green: { 5: -180, 8: -90, 13: 0, 18: -90, 21: 0, 26: 90, 31: 0, 34: 90, 39: 180, 44: 90, 47: 180, 50: 270 },
                red: { 5: -90, 8: 0, 13: 90, 18: 0, 21: 90, 26: 180, 31: 90, 34: 180, 39: 270, 44: 180, 47: 270, 50: 360 }
            }
            list.forEach((item, index) => {
                let rotate = rotates[color][index]
                if (rotate !== undefined) {
                    item.rotate = rotate
                }
            })
            return list
        },
        hasBack (obj, color) {
            let colorVie = {
                yellow: 'green',
                blue: 'red',
                green: 'yellow',
                red: 'blue'
            }
            return this[colorVie[color]].filter(item => item.index === 53)
        },
        goHome (item) {
            item.top = item.endTop
            item.left = item.endLeft
            item.rotate = item.endRotate
            item.index = -1
            item.complete = false
            item.start = false
        },
        async back (obj, color) {
            let colors = ['yellow', 'blue', 'green', 'red']
            colors.forEach(color1 => {
                color1 !== color && this[color1].forEach(item => {
                    if (item.top === obj.top && item.left === obj.left) {
                        this.goHome(item)
                    }
                })
            })
        },
        async backJumpFly (obj, color) {
            let colors = this.hasBack(obj, color)
            if (colors.length) {
                await this.waitAnimate(() => {
                    colors.forEach(item => {
                        this.goHome(item)
                    })
                }, false, 100)
                await this.waitAnimate(() => this.back(obj, color), false, 200)
            } else {
                await this.waitAnimate(() => this.back(obj, color))
            }
        },
        async move (obj, list, number, color) {
            let rect = {}
            for (let i = 0; i < number; i++) {
                rect = list[++obj.index]
                if (rect) {
                    obj.top = rect.top + rect.height / 2 - obj.height / 2
                    obj.left = rect.left + rect.width / 2 - obj.width / 2
                    if (rect.rotate !== undefined) {
                        obj.rotate = rect.rotate
                    }
                    if ((obj.index + 1) === list.length) {
                        await this.waitAnimate((resolve) => {
                            obj.top = obj.endTop
                            obj.left = obj.endLeft
                            obj.rotate = 0
                            obj.index = -1
                            setTimeout(() => {
                                obj.complete = true
                                resolve()
                            }, 300)
                        }, true)
                    }
                }
                await this.waitAnimate()
            }
            color && this.back(obj, color)
            return rect
        },
        async fly (obj, list, number, color) {
            let rect = await this.move(obj, list, number, color)
            if (rect.color === color) {
                if (rect.fly) {
                    rect = list[obj.index += 16]
                    obj.top = rect.top + rect.height / 2 - obj.height / 2
                    obj.left = rect.left + rect.width / 2 - obj.width / 2
                    await this.backJumpFly(obj, color)
                } else if (rect.jump) {
                    await this.move(obj, list, 4)
                    rect = list[obj.index += 12]
                    obj.top = rect.top + rect.height / 2 - obj.height / 2
                    obj.left = rect.left + rect.width / 2 - obj.width / 2
                    await this.backJumpFly(obj, color)
                } else if (rect.index < 46) {
                    await this.move(obj, list, 4, color)
                }
            }
        },
        async start (obj, list) {
            obj.start = true
            await this.move(obj, list, 1)
        },
        async go (color, index) {
            // this.test(color, index)
            if (!this.flying && this.getActive({ color, index })) {
                this.flying = true
                let obj = this[color][index - 1]
                let list = this.list[color]
                let number = this.number
                this.number = ''
                if (obj.start) {
                    await this.fly(obj, list, number, color)
                } else {
                    await this.start(obj, list)
                }
                if (number !== 6) {
                    this.active = this.nextColor
                }
                this.waitFly = false
                this.flying = false
            }
        },
        async test (color, index) {
            let obj = this[color][index - 1]
            let list = this.list[color]
            let num = color === 'green' ? 54 : color === 'blue' ? 18 : 1
            await this.fly(obj, list, num, color)
        },
        getActive (item) {
            let obj = this[item.color][item.index - 1]
            return !obj.complete && item.color === this.planeActive && (obj.start || this.number === 6) && this.number && 'active'
        },
        getComplete (item) {
            let obj = this[item.color][item.index - 1]
            return obj.complete
        },
        setNumber ({ color, nextColor, number }) {
            this.planeActive = color
            this.nextColor = nextColor
            this.number = number
            if (number !== 6 && !this[color].some(item => item.start)) {
                this.active = nextColor
            } else {
                this.waitFly = true
            }
        },
        async waitAnimate (fun, notResolve, time = 300) {
            await new Promise((resolve, reject) => {
                this.$nextTick(() => {
                    setTimeout(() => {
                        fun && fun()
                        !notResolve && resolve()
                    }, time)
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/assets/game/icons/iconfont.css';
@yellow: #ffc66e;
@blue: #70dfdf;
@red: #ff8da3;
@green: #80d870;
.numbers {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child {
        margin-top: 10px;
    }
    > span {
        font-size: 16px;
    }
    > div {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid;
        font-size: 20px;
        border-radius: 2px;
        background-color: #ffffff;
        &.yellow {
            color: @yellow;
            border-color: @yellow;
        }
        &.blue {
            color: @blue;
            border-color: @blue;
        }
        &.green {
            color: @green;
            border-color: @green;
        }
        &.red {
            color: @red;
            border-color: @red;
        }
        &.active {

            box-shadow: 0 0 10px;
        }
    }
}
.grid {
    display: grid;
    padding: 10px 10px;
    width: 100%;
    height: 100vw;
    grid-template-columns: repeat(30, 1fr);
    grid-template-rows: repeat(30, 1fr);
    grid-gap: 2px 2px;
}
.grid > div {
    position: relative;
    border-radius: 2px;
}
.grid > div > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    z-index: 1;
}
.grid > div.nowrap > span {
    white-space: nowrap;
}
.plane {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56%;
    height: 56%;
    // border: 1px solid #000;
    background-color: #ffffff;
    border-radius: 50%;
    transition: transform 0.3s;
    z-index: 1;
    &.active {
        box-shadow: 0 0 10px #ffffff;
    }
    &-yellow {
        color: #ffc66e;
    }
    &-blue {
        color: #70dfdf;
    }
    &-red {
        color: #ff8da3;
    }
    &-green {
        color: #80d870;
    }
}
.start {
    position: absolute;
    font-size: 12px;
    border-radius: 2px;
    > span {
        position: absolute;
        transform: scale(0.7);
        white-space: nowrap;
        color: #ffffff;
    }
    &.bg-yellow-top-left {
        width: 80%;
        height: 140%;
        top: -30%;
        left: 0;
        > span {
            top: 2%;
            left: 46%;
            transform: scale(0.7) rotate(90deg);
            transform-origin: left top;
        }
    }
    &.bg-blue-top-right {
        width: 140%;
        height: 80%;
        top: 0;
        right: -30%;
        > span {
            right: -10%;
            top: -13%;
            transform: scale(0.7) rotate(180deg);
        }
    }
    &.bg-green-bottom-right {
        width: 80%;
        height: 140%;
        bottom: -30%;
        right: 0;
        > span {
            bottom: 19%;
            right: 46%;
            transform: scale(0.7) rotate(-90deg);
            transform-origin: right top;
        }
    }
    &.bg-red-bottom-left {
        width: 140%;
        height: 80%;
        bottom: 0;
        left: -30%;
        > span {
            left: -10%;
            bottom: -13%;
        }
    }
}
.bg-none {
    // background-color: #d5d5d5;
}
.bg-yellow {
    background-color: #ffc66e;
}
.bg-blue {
    background-color: #70dfdf;
}
.bg-red {
    background-color: #ff8da3;
}
.bg-green {
    background-color: #80d870;
}
.bg-green-red {
    background-image: linear-gradient(45deg, #80d870 0%, #80d870 50%, #ff8da3 50%,#ff8da3 100%);
}
.bg-red-yellow {
    background-image: linear-gradient(135deg, #ff8da3 0%, #ff8da3 50%, #ffc66e 50%,#ffc66e 100%);
}
.bg-green-blue {
    background-image: linear-gradient(135deg, #80d870 0%, #80d870 50%, #70dfdf 50%,#70dfdf 100%);
}
.bg-blue-yellow {
    background-image: linear-gradient(45deg, #70dfdf 0%, #70dfdf 50%, #ffc66e 50%,#ffc66e 100%);
}

.bg-green-top-left {
    background-image: linear-gradient(135deg, #80d870 0%, #80d870 50%, transparent 50%, transparent 100%);
}
.bg-green-top-right {
    background-image: linear-gradient(-135deg, #80d870 0%, #80d870 50%, transparent 50%, transparent 100%);
}
.bg-green-bottom-right {
    background-image: linear-gradient(-45deg, #80d870 0%, #80d870 50%, transparent 50%, transparent 100%);
}
.bg-green-bottom-left {
    background-image: linear-gradient(45deg, #80d870 0%, #80d870 50%, transparent 50%, transparent 100%);
}

.bg-yellow-top-left {
    background-image: linear-gradient(135deg, #ffc66e 0%, #ffc66e 50%, transparent 50%, transparent 100%);
}
.bg-yellow-top-right {
    background-image: linear-gradient(-135deg, #ffc66e 0%, #ffc66e 50%, transparent 50%, transparent 100%);
}
.bg-yellow-bottom-right {
    background-image: linear-gradient(-45deg, #ffc66e 0%, #ffc66e 50%, transparent 50%, transparent 100%);
}
.bg-yellow-bottom-left {
    background-image: linear-gradient(45deg, #ffc66e 0%, #ffc66e 50%, transparent 50%, transparent 100%);
}

.bg-red-top-left {
    background-image: linear-gradient(135deg, #ff8da3 0%, #ff8da3 50%, transparent 50%, transparent 100%);
}
.bg-red-top-right {
    background-image: linear-gradient(-135deg, #ff8da3 0%, #ff8da3 50%, transparent 50%, transparent 100%);
}
.bg-red-bottom-right {
    background-image: linear-gradient(-45deg, #ff8da3 0%, #ff8da3 50%, transparent 50%, transparent 100%);
}
.bg-red-bottom-left {
    background-image: linear-gradient(45deg, #ff8da3 0%, #ff8da3 50%, transparent 50%, transparent 100%);
}

.bg-blue-top-left {
    background-image: linear-gradient(135deg, #70dfdf 0%, #70dfdf 50%, transparent 50%, transparent 100%);
}
.bg-blue-top-right {
    background-image: linear-gradient(-135deg, #70dfdf 0%, #70dfdf 50%, transparent 50%, transparent 100%);
}
.bg-blue-bottom-right {
    background-image: linear-gradient(-45deg, #70dfdf 0%, #70dfdf 50%, transparent 50%, transparent 100%);
}
.bg-blue-bottom-left {
    background-image: linear-gradient(45deg, #70dfdf 0%, #70dfdf 50%, transparent 50%, transparent 100%);
}

.bg-all {
    background-color: #70dfdf;
    border-style: solid;
    border-color:#70dfdf #80d870 #ff8da3 #ffc66e;
}
</style>
