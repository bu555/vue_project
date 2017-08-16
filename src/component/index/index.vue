<template>
  <article>
      <v-swipe :list="lbList"></v-swipe>  
      <v-nav></v-nav>  
  </article>
</template>

<script>
import Cswipe from "../common/swipe.vue";
import Cnav from "./nav.vue";
import Config from "../../js/config.js"
export default {
  components:{
      "v-swipe":Cswipe,
      "v-nav":Cnav  
  },
  data:function(){
    return{
      lbList:[]
    }
  },
  methods:{
    getLunbo(){
      let url = Config.domain + "/api/getlunbo";
      this.$http.get(url).then(rep=>{
        if(rep.body.status==0){
          this.lbList = rep.body.message.map(function(val){
            val.src = val.img;
            return val;
          });
          console.log(this.lbList);
        }
      });
    }
  },
  created:function(){
    this.getLunbo();
  }
}
</script>

<style>

</style>
