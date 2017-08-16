<template>
    <section class="counts-tpl">
        <div class="mui-numbox">
          	<button class="mui-btn mui-btn-numbox-minus" v-on:click="subtractCount">-</button>
          	    <input class="mui-input-numbox" type="number" v-model="countValue">
          	<button class="mui-btn mui-btn-numbox-plus" v-on:click="addCount">+</button>
        </div>
    </section>
</template>

<script>
export default {
    data:function(){
            return{
                countValue: this.countValue || 0
            }
        },
    props:["value"],
    methods:{
        addCount(){
            this.countValue++
        },
        subtractCount(){
            this.countValue && this.countValue--  //如果this.value大于1(true),就--
        }
    },
    watch:{  //当val变化时,通过父组件绑定的change事件返回   使用this.$emit("自定义事件名",值)
        value:function(){
            this.$emit("change",this.countValue);
        }
    }
    
}
</script>

<style scoped lang="less">
.goods-list{
    ul{
        padding:0;
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

