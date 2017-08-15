<template>
    <section class="photo-details">
        <v-title v-bind:title="title"></v-title>
        <div class="mui-card-header">{{detailsImg.title}}</div>
        <div class="mui-card-content-inner" style="padding-bottom:5px">
            <p>
                {{detailsImg.add_time|formatDate}}&nbsp;&nbsp;&nbsp;
                <span>{{detailsImg.click}}次阅读</span>&nbsp;
            </p>
        </div>
        <!--图片缩略图显示-->
        <ul class="mui-table-view mui-grid-view mui-grid-9 min-img-list">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(val,i) in minImgList" :key="val.id">
                <img :src="val.src">
            </li>
        </ul>
        <div class="mui-card-content-inner content-img" v-html="detailsImg.content"> </div>
        
        <mt-popup :v-model="popupVisible" >
            
            
        </mt-popup>
    </section>
</template>

<script>
import Ctitle from "../common/title.vue";
import Config from "../../js/config.js";
import Vue from "vue";
import { Popup } from 'mint-ui';
export default {
    data: function () {
        return {
            title: "图片详情",
            minImgList: [],
            detailsImg: {}
        }
    },
    components: {
        //注册为自己的子组件
        "v-title": Ctitle,
        "mt-popup":Popup
        
    },
    // watch:{
    //     $route:function(){
    //         this.getMinImg(this.$route.params.id);
    //     }
    // }
    // ,
    methods: {
        //获取缩略图
        getMinImg: function (id) {
            let url = Config.domain + "/api/getthumimages/" + id;
            this.$http.get(url).then(rep => {
                if (rep.body.status == 0) {
                    rep.body.message = rep.body.message.map(function (val, i) {
                        val.src = Config.imgDomain + val.src;  //图片路径拼接
                        return val;
                    });
                    this.minImgList = this.minImgList.concat(rep.body.message);
                    console.log(this.minImgList);
                    // this.minImgList = rep.body.message;
                }
            });
        },
        // 获取详情
        getDetailsImg: function (id) {
            let url = Config.domain + "/api/getimageInfo/" + id;
            this.$http.get(url).then(rep => {
                if (rep.body.status == 0) {
                    this.detailsImg = rep.body.message[0];
                    console.log(rep.body);
                }
            });
        }
    },
    created: function () {
        this.getMinImg(this.$route.params.id);
        this.getDetailsImg(this.$route.params.id);
    }
}
</script>

<style scoped lang="less">
.photo-details {
    .min-img-list {
        padding: 0 5px;
        li {
            padding: 5px;
            img {
                width: 100%;
            }
        }
    }
    .content-img{
        color:#4e4040;
        font-size:14px;
        padding-top:0;
    }
}
</style>

