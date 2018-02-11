<template>
    <div id="app">
        <el-row>
            <el-col :span='5'>
                <div class="fa-list" ref="faList">
                    <div class="wrapper-div wrapper" ref="wrapperDiv">
                        <transition-group
                            appear
                            tag="ul"
                            class="content"
                            :css="false"
                            @beforeEnter="faItemBeforeEnter"
                            @enter="faItemEnter"
                        >
                            <li v-for="(item,index) in falistState" class="fa-item" :key="item.id" :data-index="index" :class="falistClass[item.state]">
                                <router-link :to="{ name: 'fades', params: { id: item.id }}">
                                <div class="fa-name">{{item.name}}</div>
                                <div class="fa-user">发起人：{{item.user.name}}</div>
                                <div class="fa-time">{{item.start_time}}</div>  
                                <div class="fa-time">至{{item.end_time}}</div>  
                                <div class="fa-state">{{item.stateText}}</div>
                                </router-link>
                            </li>
                        </transition-group>
                    </div>
                </div>
            </el-col>
            <!--商品展示-->
            <el-col :span="19">
                <router-view class="right"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import  Velocity from 'velocity-animate'
    import BScroll from 'better-scroll'
    export default {
        name: 'App',
        data() {
            return {
                faList: [
                    
                ]
            }
        },
        created(){
            console.log("左侧拼单列表创建完毕");
            this.falistClass = ['stop','conduct'];
            this.IS_INIT = true;

            this.$axios.get(process.env.API_HOST+'faList').then(response => {
                if(response.data.code == 200){
                    this.faList = response.data.data;
                }
                
            })
            .catch(error=>{
                console.log(error);
                alert('网络错误，不能访问');
            });
            this.$nextTick(() => {
                this._initScroll();
            })
            

        },
        mounted() {
            //设置faList的高度为浏览器高度
            this.$refs.faList.style.height = document.body.clientHeight + "px";
           
            this.$refs.wrapperDiv.style.height = "100%";
        },
        beforeUpdate() {
            //默认进入第一个拼单item的路由
            if(this.IS_INIT){
                this.$router.push({name: 'fades',params:{id:this.falistState[0].id}});
                this.IS_INIT = false;
            }
            
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
            _initScroll() {
                this.faist = new BScroll(this.$refs.wrapperDiv,{
                    click: true
                })
            },



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
    #app
        font-family: Microsoft Yahei,'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        height: 100%
        .fa-list
            box-sizing: border-box
            padding: 20px
            background-color: #eee
            box-shadow: 1px 0 8px 1px rgba(0,0,0,0.2)
            .wrapper-div
                overflow: hidden
                .fa-item
                    position: relative
                    box-sizing: border-box
                    width: 100%
                    margin-bottom: 15px
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
                    a
                        text-decoration: none
                        color: #fff
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