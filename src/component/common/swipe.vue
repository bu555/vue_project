<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item class="swipe-box" v-for="(item,i) in list" :key="i" >
                <a :href="item.url">
                    <img :src="item.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        
    </section>
</template>
<script>
import Config from "../../js/config.js"
    export default {
        data:function(){  //定义数据
            return{
                 
            }
        },
        props:['list']   //接受父组件传来的数据,生成轮播内容
    }
</script>

<style lang="less">
    .swipe {
            padding:0 10px;
        .swipe-box{
            overflow:hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        height: 260px;
    }
</style>

