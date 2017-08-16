<template>
    <section clacc="comment">
        <div class="mui-card-content-inner">
            <h3>回复评论</h3>
        </div>
        <div class="mui-input-row" style="margin: 0px 5px;">
            <textarea id="textarea" rows="5" placeholder="请输入评论内容" v-model="content" style="margin-bottom: 5px;"></textarea>
        </div>
        <span id="comment-btn" class="mui-btn mui-btn-success" v-on:click="submitComment" style="margin-bottom: 20px;">
            提交评论
        </span>
        <!--评论显示-->
        <div class="mui-card-content-inner">
            <h4>评论内容</h4>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="(val,i) in list" :key="i">
                <div>
                    <p>{{i+1}}楼</p>
                </div>
                <div>{{val.content}}</div>
                <div ref="hhh">
                    <p id="user-name">{{val.user_name}}</p>
                    <p id="add-time">{{val.add_time|formatDate}}</p>
                </div>
            </li>
        </ul>
        <button type="button" ref="moreBtn" class="mui-btn mui-btn-primary mui-btn-block" v-on:click="getComment">加载更多</button>
    </section>
</template>

<script>
import Config from "../../js/config.js";
export default {
    props: ['id'],
    data: function () {
        return {
            content: "",
            pageindex: 1,
            list: []
        }
    },
    methods: {
        submitComment: function () {
            //接口路径
            let url = Config.domain + "/api/postcomment/" + this.id;
            //post请求,提交评论
            this.$http.post(url, { content: this.content }, { emulateJSON: true }).then(function (rep) {
                if (rep.body.status == 0) {
                    this.list.unshift({     //list数组在前面添加一个对象
                        user_name: "127.0.0.1",
                        add_time: new Date(),
                        content: this.content
                    });
                    this.content = "";   //清空输入框
                }
            });
        },
        getComment: function () {
            //接口路径
            let url = Config.domain + "/api/getcomments/" + this.id + "?pageindex=" + this.pageindex;
            //get请求,获取评论
            this.$http.get(url).then(function (rep) {
                if (rep.body.status == 0 && rep.body.message.length != 0) { //如果成功获取
                    this.list = this.list.concat(rep.body.message); //拼接list数组
                    this.pageindex++;  //pageindex自加1
                } else {                                              //如果没有数据了
                    this.$refs.moreBtn.setAttribute("disabled", true);  //按钮禁用
                    this.$refs.moreBtn.innerHTML = "没有更多了"  //按钮文字更新
                }
            });

        }

    },
    created: function () {
        this.getComment();
    }
}
</script>
<style>
#add-time {
    float: right;
}

#user-name {
    float: left;
}

#comment-btn {
    position: relative;
    right: -6px;
    /*transform:translateX(-50%);*/
}
</style>