<template>
    <article class="list">
            <v-title v-bind:title="title"></v-title>   
            <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list"  :key="item.id">
                    <router-link :to="'/news/details/'+item.id">
					<a href="javascript:;" class="">
						<img :src="item.img_url" class="mui-media-object mui-pull-left" >
						<div class="mui-media-body">
							<p class="mui-ellipsis">{{item.title}}</p>
                            <div class="info">
							<span>发表时间:{{item.add_time}}</span><span>点击:{{item.click}}</span>
                            </div>
						</div>
					</a>
                    </router-link>
				</li>
		
			</ul>
    </article> 
</template>

<script>
import Ctitle from "../common/title.vue";
import Config from "../../js/config.js";
 export default {
      data:function(){
          return{
              list:[],
              title:"新闻资讯"
          }
      },
      methods:{
          getNews:function(){
              let url =Config.domain+"/api/getnewslist";  //domain是配置的路径
              this.$http.get(url).then(function(rep){
                    rep.body.status==0 && (this.list=rep.body.message);
            });
          }
      },
      created:function(){
          this.getNews();
      },
      components:{
          "v-title":Ctitle
      }
  }
</script>


<style lang="less">
     .list{
        .info{
            font-size:14px;
            span+span{
                float:right;
            }
        }
     }
</style>    
 