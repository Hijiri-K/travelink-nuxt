<template>
  <div class="page-wrapper">

        <el-header>
          <tl-header>
          </tl-header>
        </el-header>
  <el-container>
    <nuxt/>
  </el-container>
  </div>
</template>

<script>
  import TlHeader from '../components/tl_header.vue'
  export default {
    components: {
      TlHeader
    }}
</script>
<style>
#__nuxt{
  height:100%;
}

#__layout{
  height:100%;
}

.page-wrapper{
  height:100%;
}

.el-container{
  height:100%;
}
.el-header{
  background-color: #63A375;
  height:40px !important;
  position: fixed;
  width:100%;
  z-index: 20;
}

html {
  height:100%;
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body{
  height: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
