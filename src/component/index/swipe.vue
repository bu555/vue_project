<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item,i) in list" :key="i">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        
    </section>
</template>
<script>
    export default {
        data:function(){  //定义数据
            return{
                list:[]
            }
        },
        methods:{
            getLunbo:function(){  //ajax异步请求数据
                let url = "http://139.199.192.48:8888/api/getlunbo";
                this.$http.get(url).then(rep=>{
                    rep.body.status==0 && (this.list = rep.body.message);  
                });
            }
        },
        created:function(){
            this.getLunbo();   //先调用一次
        }

    }
</script>

<style lang="less">
    .swipe {
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>

