import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

// 动态加载路由(一级路由)
const Index = () => import('@/views/Index');

// 动态加载路由(二级路由)
const Follow = () => import('@/views/page/Follow');
const Message = () => import('@/views/page/Message');
const My = () => import('@/views/page/My');
const Shot = () => import('@/views/page/Shot');
const PageHome = () => import('@/views/page/PageHome');

// 动态加载路由(三级路由)
const City = () => import('@/views/page/pagehome/City')
const Recommend = () => import('@/views/page/pagehome/Recommend')

let router =  new Router({
  routes: [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        redirect: '/index/pageHome',
        children:[
            {
                path: '/index/pageHome',
                name: 'pageHome',
                component: PageHome,
                redirect: '/index/pagehome/recommend',
                children: [
                    {
                        path: '/index/pageHome/city',
                        name: 'city',
                        component: City
                    },
                    {
                        path: '/index/pageHome/recommend',
                        name: 'recommend',
                        component: Recommend
                    }
                ]
            },
            {
                path: '/index/follow',
                name: 'follow',
                component: Follow
            },
            {
                path: '/index/message',
                name: 'message',
                component: Message
            },
            {
                path: '/index/my',
                name: 'my',
                component: My
            },
            {
                path: '/index/shot',
                name: 'shot',
                component: Shot
            }
        ]
    }
  ]
})

export default router;

