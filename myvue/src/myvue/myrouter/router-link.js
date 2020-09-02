export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },

    // h 是 createElement 函数
    render(h) {
        // <a href="#/xxx"></a>
        // h(tag, props, children)
        // h 三个参数  组件名、参数、子元素
        return h('a', {
            attrs: {
                href: '#'+this.to
            }
        }, this.$slots.default)
    }
}