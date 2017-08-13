<template>
    <section class="list mint-header">
    <div @click="rollback" class="mint-header-button is-left">
      <button class="mint-button mint-button--default mint-button--normal">
        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
        <label class="mint-button-text">返回</label>
      </button>
    </div>
    <h1 class="mint-header-title">{{ title }}</h1> 
    <div class="mint-header-button is-right"></div>
  </section>
</template>

<script>
export default {
   props:["title"] ,   //用此方式获取父组件的数据
   methods:{
      rollback:function(){
          this.$router.go(-1);
      }
  }
}
</script>
<style>

</style>

