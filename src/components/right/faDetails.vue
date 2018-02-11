<template>
    <div class="right" ref="right">
        <div class="intr-wrapper">
            <div class="title">简介</div>
            <div class="content">{{faDetails.introduce}}</div>
        </div>
    </div>
</template>


<script>
    import  Velocity from 'velocity-animate'
    export default {
        name : "fa-list",
        data() {
            return {
                faDetails : {}
            }
        },
        mounted() {
            this.$refs.right.style.height = document.body.clientHeight + "px";
        },
        created() {
            this._getDetails();
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                console.log("路由变化了");
                this._getDetails();
            }
        },
        methods: {
            _getDetails(){
                this.$axios.get(process.env.API_HOST+'faDetails/id/'+this.$route.params.id)
                .then((response) => {
                    console.log(response);
                    this.faDetails = response.data.data;
                })
                .catch((response) => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .right
        .intr-wrapper
            .title
                padding: 10px
                border-left: 4px solid #50bfff
                background-color: #ecf8ff
                font-weight: 600
                font-size: 17px
            .content
                padding: 10px
                font-size: 16px

</style>