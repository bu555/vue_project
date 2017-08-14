<template>
    <section>
        <v-title v-bind:title="title"></v-title> 
        <div class="mui-card">
				<div class="mui-card-header">{{list.title}}</div>
				<div class="mui-card-footer">{{list.add_time|formatDate }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-html="list.content"> </div>
				</div>
		</div>
        <v-comment v-bind:id="id"></v-comment>
    </section>
</template>

<script>
import Ctitle from "../common/title.vue";
import Config from "../../js/config.js";
import Ccomment from "../common/comment.vue"; //这是评论组件
 export default {
    data:function(){
        return{

            list:{},
            title:"新闻详情" ,
            id:this.$route.params.id,
            time:new Date()
        }
    },
    methods:{
        getDetails:function(){
            let url = Config.newsDetails + this.id;
            this.$http.get(url).then(rep=>{
                rep.body.status==0 && (this.list=rep.body.message[0]);
            });
        }
    },
    created:function(){
        this.getDetails();
    },
    components:{  //注册子组件
        "v-title":Ctitle,
        "v-comment":Ccomment
    }
  }
</script>


<style lang="less">

</style>    
 