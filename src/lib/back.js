// 参考至https://www.jianshu.com/p/f1d1eaac6e8c
class Back {
    constructor () {
        this.STATE = 'x-back'
        this.event = document.createEvent('Events')
        this.event.initEvent(this.STATE, false, false)
        window.addEventListener('popstate', this.onPopState, false)
    }
    onPopState = event => {
        event.state === this.STATE && this.element.dispatchEvent(this.event)
        event.state !== this.STATE && this.element1 && this.element1.dispatchEvent(this.event)
    }
    record (state) {
        history.pushState(state, null, location.href)
        history.pushState(state, null, location.href)
        // 参考https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
    }
    perRecord () {
        history.pushState(this.STATE, null, location.href)
    }
    listen (listener, listener1) {
        this.record(this.STATE)
        this.element = document.createElement('span')
        this.element.addEventListener(this.STATE, listener, false)
        if (listener1) {
            this.element1 = document.createElement('span')
            this.element1.addEventListener(this.STATE, listener1, false)
        }
    }
    removeListen () {
        window.removeEventListener('popstate', this.onPopState)
    }
    recoverListen () {
        window.addEventListener('popstate', this.onPopState, false)
    }
}

export default new Back()
