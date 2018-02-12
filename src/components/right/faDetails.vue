<template>
    <div class="right" ref="right">
        <div class="intr-wrapper">
            <div class="title">简介</div>
            <div class="content">{{faDetails.introduce}}</div>
        </div>
        <div class="intr-wrapper">
            <div class="title">有谁拼单了</div>
            <el-table
                :data="faDetails['participant']"
                :height="tableHeight"
                stripe
                style="width: 100%">
                    <el-table-column
                        type="index"
                        width="100"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="总价">
                    </el-table-column>
                    <el-table-column
                        prop="is_payment"
                        width="100"
                        label="是否付款">
                    </el-table-column>
        </el-table>
        </div>
    </div>
</template>


<script>
    import  Velocity from 'velocity-animate'
    import { Loading } from 'element-ui'
    export default {
        name : "fa-list",
        data() {
            return {
                faDetails : {},
                faWhos : []
            }
        },
        created() {
            this._getDetails();
        },
        mounted() {
            this.$refs.right.style.height = document.body.clientHeight + "px";
        },
        computed: {
            /**
             * @name 参与拼单人员列表高度
             * @description 页面高度减去简介部分高度和right的padding
             * @author dongdongjie <zdj@ourstu.com> 2018-2-12
             */
            tableHeight(){
                return document.body.clientHeight - 402;
            }
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                console.log("路由变化了");
                this._getDetails();
            }
        },
        methods: {
            /**
             * @name 从服务器端获取拼单详情
             * @description 请求数据过程中，显示loading，这里使用element的loading组件
             *              利用axios向服务器请求数据，如果请求成功将数据赋值给faDetails，并关闭loading
             *              如果请求失败，弹出提示框提醒“网络错误”，并关闭loading
             * @author dongdongjie <zdj@ourstu.com> 2018-2-12
             */
            _getDetails(){
                let loading = Loading.service({
                    target: document.getElementsByClassName('right')[0]
                 });
                this.$axios.get(process.env.API_HOST+'faDetails/id/'+this.$route.params.id)
                .then((response) => {
                    //将服务器获取到的数据赋值给faDetails
                    this.faDetails = response.data.data;
                    //关闭loading加载动画
                    setTimeout(() => {
                        loading.close();
                    }, 500);
                })
                .catch((response) => { 
                    //关闭loading加载动画
                    setTimeout(() => {
                        loading.close();
                    }, 500);
                    //网络错误消息提示
                    this.$message({
                        showClose: true,
                        message: '网络错误，请检查您的网络状况',
                        type: 'error'
                    });
                })
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .right
        box-sizing: border-box
        padding: 10px;
        .intr-wrapper
            .title
                padding: 10px
                border-left: 4px solid #50bfff
                background-color: #ecf8ff
                font-weight: 600
                font-size: 17px
            .content
                // overflow-y: scroll
                min-height: 200px
                max-height: 400px
                padding: 20px
                font-size: 16px

</style>