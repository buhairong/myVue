export default {
    render(h) {
        // 标记当前router-view深度
        this.$vnode.data.routerView = true

        let depth = 0
        let parent = this.$parent
        while(parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data
            if(vnodeData) {
                if(vnodeData.routerView) {
                    // 说明当前的 parent 是一个 router-view
                    depth++
                }
            }

            parent = parent.$parent
        }


        // 获取path对应的component
        //const {routeMap, current} = this.$router
        //const comp = routeMap[current].component || null


        let comp = null
        const route = this.$router.matched[depth]

        if(route) {
            comp = route.component
        }

        // 获取路由表
        return h(comp)        
    }
}