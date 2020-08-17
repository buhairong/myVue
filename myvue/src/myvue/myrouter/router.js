/* 
需求分析
作为⼀个插件存在：实现VueRouter类和install⽅法
实现两个全局组件：router-view⽤于显示匹配组件内容，router-link⽤于跳转
监控url变化：监听hashchange或popstate事件
响应最新url：创建⼀个响应式的属性current，当它改变时获取对应组件并显示

spa点击链接不能刷新页面
    hash #xxx
    history api
事件 hashchange, 通知 router-view 更新
    利用 vue 数据响应式
    制造一个响应式数据表示当前url,在 router-view的render函数使用它
*/

/*
任务
实现一个插件
    实现VueRouter类
    实现install方法
实现两个全局组件
    router-link
    router-view
*/

let myVue

class VueRouter {
    constructor(options) {
        this.$options = options

        // 响应式数据
        const initial = window.location.hash.slice(1) || '/'
        myVue.util.defineReactive(this, 'current', initial)
        
        // 监听事件        
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))

        
    }

    onHashChange() {
        this.current = window.location.hash.slice(1) || '/'
    }
}

// 形参是Vue构造函数
VueRouter.install = function(Vue) {
    // 保存构造函数
    myVue = Vue

    // 1.挂载$router
    Vue.mixin({
        beforeCreate() {
            // 全局混入，将来在组件实例化的时候才执行
            // 此时router实例已经存在了
            // this指的是组件实例
            if(this.$options.router) {                
                // 挂载
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 2.实现两个全局组件
    Vue.component('router-link', {
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
    })

    // router-view是一个容器
    Vue.component('router-view', {
        render(h) {
            // 获取路由器实例
            const routes = this.$router.$options.routes
            const current = this.$router.current

            const route = routes.find(route => route.path === current)
            const comp = route ? route.component : null

            // // 获取路由表
            return h(comp)
            
        }
    })
}

export default VueRouter