<template>
<section class="photo-list">
<!--图片导航-->
  <div class="ul-box">
    <ul class="mui-table-view photo-nav">
        <li class="mui-table-view-cell" ref="li_width"><router-link to="/photo/list/0">全部</router-link></li>
        <li class="mui-table-view-cell" v-for="(val,i) in categorylist" :key="val.id">
            <router-link :to="'/photo/list/'+ val.id">{{val.title}}</router-link>
        </li>
    </ul>
   </div>
<!--图片列表-->
    <div class="mui-card" v-for="(val,i) in photolist" :key="i">
        <!--此处传入图片id-->
        <router-link :to="'/photo/details/'+val.id">
        <!--<div class="mui-card-header mui-card-media">
        </div>-->
        <img :src="val.img_url" style="width:100%" v-lazy="val.img_url"> 
        </router-link>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>{{val.title}}</p>
                <p style="color: #333;" v-html="val.content"></p>
            </div>
        </div>
        <!--<div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <a class="mui-card-link">Read more</a>
        </div>-->
    </div>
   </section>    
</template>

<script>
import Config from "../../js/config.js";
export default {
    data: function () {
        return {
            categorylist: [],
            photolist:[],
            // liWidth:this.$refs.li_width.getComputedStyle("width")
            // liWidth:this.$refs.li_width.getAttribute("width")
        }
    },
    watch: {  //watch用于观察Vue实例上的数据变动。对应一个对象，键是观察表达式，
        //值是对应回调。值也可以是方法名，或者是对象，包含选项。
        $route: function () {
            this.getPhotoList(this.$route.params.id);  
            console.log(this.$route.params.id);
        }
    },
    methods: {
        //获取图片分类信息
        getCategoryList: function () {
            // console.log(this.$route);
            let url = Config.domain + "/api/getimgcategory";
            this.$http.get(url).then(function (rep) {
                if (rep.body.status == 0) {
                    this.categorylist = this.categorylist.concat(rep.body.message);
                    console.log(rep.body.message);
                }
            });
        },
        //获取图片列表
        getPhotoList: function (id) {
            let url = Config.domain + "/api/getimages/" + id;
            // console.log(this.$refs.li_width.style);
            this.$http.get(url).then(function (rep) {
                if (rep.body.status == 0) {
                    console.log(rep.body.message);
                    rep.body.message = rep.body.message.map(function(val,index){
                        val.img_url = Config.imgDomain + val.img_url;
                        return val;
                    });

                    this.photolist = rep.body.message;
                    console.log(this.photolist);
                }
            });
        }
    },
    created: function () {
        this.getCategoryList();   //获取图片分类
        this.getPhotoList(this.$route.params.id);  //获取图片列表(全部)
    }
}
</script>

<style scoped lang="less">
.photo-list{
    box-sizing:border-box;
    .ul-box{
            width:100%;
            overflow-x:scroll;
            // overflow-y:hidden;
            &::-webkit-scrollbar {display:none}
            height: 42px;
        .photo-nav {
            height: 43px;
            width:400%;
            li {
                float: left;
                width:25vw;
                text-align:center;
                font-size:4vw;
                padding-left:5px;
                padding-right:5px;
            }
            li+li{
                border-left:1px solid #f3f3f3;
            }
        }
    }
}

</style>

