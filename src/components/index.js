import vant from './vant'
import { Lazyload } from 'vant'
const importComponent = Vue => {
    vant.forEach(component => {
        Vue.use(component)
    })
    Vue.use(Lazyload, {
        lazyComponent: true
    })
}

export default importComponent
