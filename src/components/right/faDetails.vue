<template>
    <div class="right" ref="right">
        <div class="intr-wrapper">
            <div class="title">简介</div>
            <div class="content">{{$route.params.id}}</div>
        </div>
    </div>
</template>


<script>
    import  Velocity from 'velocity-animate'
    export default {
        name : "fa-list",
        data() {
            return {

            }
        },
        mounted() {
            this.$refs.right.style.height = document.body.clientHeight + "px";
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
            .content
                font-size: 12px

</style>