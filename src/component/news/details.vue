<template>
    <section>
        <v-title v-bind:title="title"></v-title> 
        <div class="mui-card">
				<div class="mui-card-header">{{list.title}}</div>
				<div class="mui-card-footer">{{list.add_time|abc('YYYY-MM-DD')}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-html="list.content"> </div>
				</div>
		</div>
    </section>
</template>

<script>
import Ctitle from "../common/title.vue";
import Config from "../../js/config.js";
 export default {
    data:function(){
        return{
            list:{},
            title:"新闻详情"
        }
    },
    methods:{
        getDetails:function(){
            let url = Config.newsDetails + this.$route.params.id;
            this.$http.get(url).then(rep=>{
                rep.body.status==0 && (this.list=rep.body.message[0]);
            });
        }
    },
    created:function(){
        this.getDetails();
    },
    components:{
        "v-title":Ctitle
    }
  }
</script>


<style lang="less">

</style>    
 