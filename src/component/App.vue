<template>
    <main>
        <v-header></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
    </main>
</template>

<script>
import Cheader from "./home/header.vue";
import Cfooter from "./home/footer.vue";
export default {  //暴露出去
    components: {
        'v-header': Cheader,   //组件1
        'v-footer': Cfooter,      //组件2
    }
}
</script>

<style>

</style>