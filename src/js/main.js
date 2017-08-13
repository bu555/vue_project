//1.导入第三方包
import Vue from "vue/dist/vue.common.js";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import "mui/dist/css/mui.css";  //导入mui样式
import 'mui/examples/hello-mui/css/icons-extra.css'; // 引入mui的扩展图标样式
import "./filter.js";


//手动use启用插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

//2.导入自己的模块  
import App from "../component/App.vue";  //导入App.vue根组件
import router from "./router.js";//导入配置好的路由

//3.创建vue实例,关联视图,渲染根组件
var vm = new Vue({
    el: "#app",
    render: function (c) {
        return c(App);
    },
    router: router
});

