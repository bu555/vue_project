<template>
    <section class="goods-list">
        <ul>
            <li v-for="val in goodsList" :key="val.id">
                <div class="mui-card" >
                    <router-link :to="'/goods/details/'+val.id">
                        <img :src="val.img_url" style="width:100%" >
                        <p class=zhaiyao style="color: #333;">{{val.zhaiyao}}</p>
                    </router-link>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <span style="color:#ff0000;font-size:16px">¥{{val.sell_price}}</span>&nbsp;&nbsp;
                            <span style="color:#333;"><del>¥{{val.market_price}}</del></span>
                            <p>热卖中<span>剩{{val.stock_quantity}}件</span></p>
                        </div>
                    </div>

                </div>
            </li>
    
        </ul>
    </section>
</template>

<script>
import Config from "../../js/config.js";
export default {
    data:function(){
        return{
            goodsList:[]

        }
    },
    methods:{
        getGoodsList(page){
            let url = Config.domain + "/api/getgoods?pageindex=" + page;
            this.$http.get(url).then(rep=>{
                if(rep.body.status==0){
                    console.log(rep.body.message);
                    this.goodsList=this.goodsList.concat(rep.body.message);
                    
                }
            });
        }
    },
    created:function(){
        this.getGoodsList(this.$route.params.page);

    }
}
</script>

<style scoped lang="less">
.goods-list{
    ul{
        padding:0;
        background-color: #fff;
        li{
            width:50%;
            display:inline-block;
            .mui-card{
                margin:4px;
                .zhaiyao{
                    padding-left:10px;
                    padding-right:8px;
                }
                .mui-card-content-inner{
                    background-color: #f0f0f0;
                    p>span{
                        float:right;
                    }
                }
            }
            
        }
    }
}

</style>

