<template>
    <div class="fa-list" ref="faList">
        <transition-group
            appear
            tag="ul"
            :css="false"
            @beforeEnter="faItemBeforeEnter"
            @enter="faItemEnter"
        >
            <li v-for="(item,index) in falistState" class="fa-item" :key="item.id" :data-index="index" :class="falistClass[item.state]">
                <div class="fa-name">{{item.name}}</div>
                <div class="fa-user">发起人：{{item.user}}</div>
                <div class="fa-time">{{item.time}}</div>
                
                <div class="fa-state">{{item.stateText}}</div>
            </li>
        </transition-group>
    </div>
</template>


<script>
    import  Velocity from 'velocity-animate'
    export default {
        name : "fa-list",
        data() {
            return {
                faList: [
                    {
                        id: 1,
                        name: "胡来烧饼",
                        user: "洞洞杰",
                        time: "2018-2-3 14:00",
                        state: 0
                    },
                    {
                        id: 2,
                        name: "黄焖鸡",
                        user: "通哥",
                        time: "2018-2-4 15:00",
                        state: 1
                    },
                    {
                        id: 3,
                        name: "老鸭煲",
                        user: "飞哥",
                        time: "2018-2-3 16:00",
                        state: 1
                    },
                    {
                        id: 4,
                        name: "老鸭煲",
                        user: "飞哥",
                        time: "2018-2-3 16:00",
                        state: 1
                    },
                    {
                        id: 5,
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
            this.falistClass = ['stop','conduct'];
        },
        mounted() {
            //设置faList的高度为浏览器高度
            this.$refs.faList.style.height = document.body.clientHeight + "px";
        },
        computed:{
            falistState(){
                let fal = [];
                this.faList.forEach((fa) => {
                    if(fa.state == "1"){
                        fa.stateText = "进行中";
                    }else{
                        fa.stateText = "已结束";
                    }
                    fal.push(fa);
                })
                return fal;
            }
        },
        methods: {
            // 过渡进入
            // 设置过渡进入之前的组件状态
            faItemBeforeEnter: function (el) {
                el.style.transform = `translate3d(-110%,0,0)`;
                el.style.opacity = `0.3`;
                el.style.transition = `all .5s`;
            },
            // 设置过渡进入完成时的组件状态
            faItemEnter: function (el, done) {
                var delay = el.dataset.index * 200;
                console.log(delay);
                Velocity(
                    el,
                    { 
                        transform:'translate3d(0,0,0)',
                        opacity: 1
                    },
                    { 
                        easing: "swing",
                        delay: delay,
                        complete: done
                    }
                )
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .fa-list
        padding: 20px
        background-color: #eee
        box-shadow: 1px 0 8px 1px rgba(0,0,0,0.2)
        .fa-item
            position: relative
            box-sizing: border-box
            width: 100%
            margin: 15px 0
            padding: 10px
            border-radius: 5px
            overflow: hidden
            cursor: pointer
            &.conduct
                background: linear-gradient(left,#097cf4,#409eff)
                color: #fff
            &.stop
                background: linear-gradient(left,#666,#ccc)
                color: #fff
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
            .fa-state
                position: absolute
                right: -20px
                top: 2px
                transform: rotate(30deg)
                width: 100px
                height: 25px
                background: red
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.5)
                text-align: center
                line-height: 25px
                font-size: 12px
</style>