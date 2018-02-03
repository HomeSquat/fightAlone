<template>
  <div id="app">
      <el-row>
          <el-col :span='5'>
              <faList></faList>
          </el-col>
          <!--商品展示-->
          <el-col :span="19">
              我是右侧部分
          </el-col>
      </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
    import faList from '@/components/faList/faList';
    export default {
        name: 'App',
        components: {
            faList
        }
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}
</style>
