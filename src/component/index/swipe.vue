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
        data:function(){
            return{
                list:[]
            }
        },
        methods:{
            getLunbo:function(){
                let url = "http://139.199.192.48:8888/api/getlunbo";
                this.$http.get(url).then(rep=>{
                    this.list = rep.body.message;  
                    console.log(rep);
                });
            }
        },
        created:function(){
            this.getLunbo();
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

