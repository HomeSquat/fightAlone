<template>
    <div class="fa-list" ref="faList">
        <ul>
            <li v-for="item in faList" class="fa-item" :class="">
                <div class="fa-name">{{item.name}}</div>
                <div class="fa-user">发起人：{{item.user}}</div>
                <div class="fa-time">{{item.time}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name : "fa-list",
        data() {
            return {
                faList: [
                    {
                        name: "胡来烧饼",
                        user: "洞洞杰",
                        time: "2018-2-3 14:00",
                        state: 0
                    },
                    {
                        name: "黄焖鸡",
                        user: "通哥",
                        time: "2018-2-4 15:00",
                        state: 1
                    },
                    {
                        name: "老鸭煲",
                        user: "飞哥",
                        time: "2018-2-3 16:00",
                        state: 1
                    },
                ]
            }
        },
        created(){
            console.log("左侧拼单列表创建完毕");
        },
        mounted() {
            //设置faList的高度为浏览器高度
            this.$refs.faList.style.height = document.body.clientHeight + "px";
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .fa-list
        padding: 20px
        background-color: #eee
        box-shadow: 1px 0 8px 1px rgba(0,0,0,0.2)
        .fa-item
            box-sizing: border-box
            width: 100%
            margin: 15px 0
            padding: 10px
            border-radius: 5px
            background: linear-gradient(left,#097cf4,#409eff)
            color: #fff
            cursor: pointer
            transition: all .3s
            &:hover
                transform: translateX(10px)
            .fa-name
                font-size: 18px
            .fa-user
                margin: 5px 10px
                font-size: 14px
            .fa-time
                text-align: right
                font-size: 12px
</style>