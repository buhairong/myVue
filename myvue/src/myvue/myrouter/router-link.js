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
        return h('a', {
            attrs: {
                href: '#'+this.to
            }
        }, this.$slots.default)
    }
}