<template>
    <div @click="animated">{{ number }}</div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: ''
        },
        nextColor: {
            type: String,
            default: ''
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            number: 1
        }
    },
    created () {
        this.complete = false
        this.isClick = false
    },
    methods: {
        animated () {
            if (!this.isClick && this.active) {
                this.isClick = true
                setTimeout(() => {
                    this.complete = true
                }, 1000)
                const animate = () => {
                    this.number = Math.ceil(Math.random() * 6)
                    if (this.complete) {
                        this.complete = false
                        this.isClick = false
                        this.$emit('setNumber', {
                            number: this.number,
                            color: this.color,
                            nextColor: this.nextColor
                        })
                    } else {
                        requestAnimationFrame(animate)
                    }
                }
                animate()
            }
        }
    }
}
</script>
