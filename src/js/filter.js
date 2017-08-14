// import Vue from "vue";

// Vue.filter("formatDate",function(val,format){
//     var yReg = /yyyy/i;
//     var mReg = /mm/i;
//     var dReg = /dd/i;

//     var date = new Date(val);
//     var y = date.getFullYear();
//     var m = date.getMonth()+1;
//     var d = date.getDate();

//     return format.replace(yReg,y).replace(mReg,m).replace(dReg,d);
// })


// import Vue from "vue";
import Vue from "vue/dist/vue.common.js";

// 过滤器回调的第一个值固定为插值表达式中的初始值
Vue.filter('formatDate', function(val, format="yyyy/MM/dd hh:mm") {

    // 先创建匹配年月日的三个不同正则
    let yReg = /YYYY/i;
    let MReg = /MM/;
    let dReg = /DD/i;
    let mReg = /mm/;
    let hReg = /hh/;

    // 然后通过val得到相应的年月日
    let date = new Date(val);
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();

    // 最后替换
    return format.replace(yReg, y).replace(MReg, M).replace(dReg, d).replace(mReg, m).replace(hReg, h);
});