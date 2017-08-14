<template>
<section class="photo-list">
<!--图片导航-->
    <ul class="mui-table-view photo-nav">
        <li class="mui-table-view-cell">全部</li>
        <li class="mui-table-view-cell" v-for="(val,i) in categorylist" :key="val.id">
            <router-link :to="'/photo/list/'+ val.id">{{val.title}}</router-link>
        </li>
    </ul>
<!--图片列表-->
    <div class="mui-card" v-for="(val,i) in photolist" :key="i">
        <div class="mui-card-header mui-card-media" :style="'height:70vw;background-image:url('+val.img_url+')'">
        </div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>{{val.title}}</p>
                <p style="color: #333;" v-html="val.content"></p>
            </div>
        </div>
        <div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <a class="mui-card-link">Read more</a>
        </div>
    </div>
   </section>    
</template>

<script>
import Config from "../../js/config.js";
export default {
    data: function () {
        return {
            categorylist: [],
            photolist:[]
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
        //获取列表的图片
        getPhotoList: function (id=14) {
            let url = Config.domain + "/api/getimages/" + id;
            this.$http.get(url).then(function (rep) {
                if (rep.body.status == 0) {
                    rep.body.message = rep.body.message.map(function(val,index){
                        val.img_url = Config.imgDomain + val.img_url;
                        return val;
                    });
                    this.photolist = this.photolist.concat(rep.body.message);
                }
            });
        }
    },
    created: function () {
        this.getCategoryList();
        this.getPhotoList();
    }
}
</script>

<style scoped lang="less">
.photo-list{
    .photo-nav {
    height: 43px;
    width:400%;
    li {
        float: left;
    }
}
}

</style>

