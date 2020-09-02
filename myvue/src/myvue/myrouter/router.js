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

import routerView from './router-view'
import routerLink from './router-link'

let myVue

class VueRouter {
    constructor(options) {
        this.$options = options

         // 响应式数据
        //const initial = window.location.hash.slice(1) || '/'
        // myVue.util.defineReactive(this, 'current', initial)

        this.current = window.location.hash.slice(1) || '/'
        myVue.util.defineReactive(this, 'matched', [])

        // match 方法可以递归遍历路由表，获得匹配关系数组
        this.match()
        
        // 监听事件        
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))

        // 缓存路由映射关系
        // 缓存path和route映射关系
        // this.routeMap = {}
        // this.$options.routes.forEach(route => {
        //     this.routeMap[route.path] = route
        // })
    }

    onHashChange() {
        this.current = window.location.hash.slice(1) || '/'
        this.matched = []
        this.match()
    }

    match(routes) {
        routes = routes || this.$options.routes

        // 递归遍历
        for (const route of routes) {
            if(route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }

            //   /about/info
            if(route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                this.matched.push(route)

                if(route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }
}

// 形参是Vue构造函数
VueRouter.install = function(Vue) {
    // 保存构造函数
    myVue = Vue

    // 1.挂载$router
    myVue.mixin({
        beforeCreate() {
            // 全局混入，将来在组件实例化的时候才执行
            // 此时router实例已经存在了
            // this指的是组件实例
            if(this.$options.router) {                
                // 挂载
                myVue.prototype.$router = this.$options.router
            }
        }
    })

    // 2.实现两个全局组件
    Vue.component('router-link', routerLink)

    // router-view是一个容器
    Vue.component('router-view', routerView)
}

export default VueRouter