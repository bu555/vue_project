//导包
import VueRouter from "vue-router";
//导入组件
import Cindex from "../component/index/index.vue";

export default new VueRouter({
    router: [
        { path: '/', redirect: '/index' },
        { path: '/index', component: Cindex }
    ]
});