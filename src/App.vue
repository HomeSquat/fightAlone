<template>
    <div id="app">
        <el-row>
            <!-- 拼单列表 -->
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
                    <div class="addfa-wrapper">
                        <div class="addfa">发起拼单</div>
                    </div>
                </div>
            </el-col>
            <!--拼单详情-->
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
                //拼单列表
                faList: []
            }
        },
        created(){
            console.log("左侧拼单列表创建完毕");
            //拼单的状态样式，根据拼单状态的不同设置不同的class，stop为结算中，conduct为进行中
            this.falistClass = ['stop','conduct'];
            //初始化，刚进入网页时，为true,进入第一个路由，之后设置为false
            this.IS_INIT = true;
            //从服务器端获取拼单列表
            this._getfaList();
            
        },
        mounted() {
            //设置faList的高度为浏览器高度
            this.$refs.faList.style.height = document.body.clientHeight + "px";
            //wrapperDiv高度为faList的100%
            this.$refs.wrapperDiv.style.height = "100%";
            //初始化滚动组件
            this._initScroll();
        },
        beforeUpdate() {
            //默认进入第一个拼单item的路由
            if(this.IS_INIT){
                this.$router.push({name: 'fades',params:{id:this.falistState[0].id}});
                this.IS_INIT = false;
            }
            
        },
        computed:{
            /**
             * @name 左侧拼单列表的状态
             * @description 根据fa中的state值判断拼单是进行中的还是结算中的
             * @author dongdongjie <zdj@ourstu.com> 2018-2-13
             */
            falistState(){
                let fal = [];
                this.faList.forEach((fa) => {
                    if(fa.state == "1"){
                        fa.stateText = "进行中";
                    }else{
                        fa.stateText = "结算中";
                    }
                    fal.push(fa);
                })
                return fal;
            }
        },
        methods: {
            /**
             * @name 初始化左侧的滚动插件
             * @description 利用better-scroll插件为左侧拼单列表设置滚动
             * @author dongdongjie <zdj@ourstu.com> 2018-2-13
             */
            _initScroll() {
                this.faist = new BScroll(this.$refs.wrapperDiv,{
                    click: true
                })
            },
            /** 
             * @name 从服务器端获取拼单列表
             * @description 获取拼单列表，将获取到的数据赋值给this.faList
             * @author dongdongjie <zdj@ourstu.com> 2018-2-13
            */
            _getfaList() {
                this.$axios.get(process.env.API_HOST+'faList').then(response => {
                    if(response.data.code == 200){
                        this.faList = response.data.data;
                    }
                    
                })
                .catch(error=>{
                    console.log(error);
                });
            },
            
            // +------------------------------------------------------------------------+
            // |------------------------       动画部分     -----------------------------|
            // +------------------------------------------------------------------------+
            /**
             * @name 左侧拼单列表进入之前
             * @description 在动画开始之前将item都移动到屏幕外面，并将透明度设置为0.3，设置transition属性
             * @author dongdongjie <zdj@ourstu.com> 2018-2-13
             */
            faItemBeforeEnter: function (el) {
                el.style.transform = `translate3d(-110%,0,0)`;
                el.style.opacity = `0.3`;
                el.style.transition = `all .5s`;
            },
            /**
             * @name 左侧拼单列表完成时的状态
             * @description 动画完成时将item移动到默认位置，将透明度设置为1,
             * @author dongdongjie <zdj@ourstu.com> 20182-13
             */
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
            padding: 20px 0 120px 0
            background-color: #eee
            box-shadow: 1px 0 8px 1px rgba(0,0,0,0.2)
            .wrapper-div
                overflow: hidden
                padding: 0 20px
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
            .addfa-wrapper
                position: relative
                box-sizing: border-box
                width: 100%
                height: 120px
                padding: 20px
                .addfa
                    width: 100%
                    height: 100%
                    border-radius: 5px
                    border: 1px dashed #409eff
                    text-align: center
</style>