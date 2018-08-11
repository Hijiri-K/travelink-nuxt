<!-- ここのファイルでコンポーネントをまとめると、変数の受け渡しに不便が生じるので、コンポーネントをplanning.jsで読み込む形式に変更 -->

<template>
  <div class="">
    <div class="locations-wrapper" :style="{ height: pageHeight }">
      <el-row type="flex" class="locations-row" :gutter="10" >
        <el-col :span=12 class="location">
          <div class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <img src="https://cdn.4travel.jp/img/tcs/t/album/src/10/40/47/src_10404771.jpg?1259494610">
            </el-card>
          </div>
        </el-col>
        <el-col :span=12 class="location">
          <div class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <img src="https://cdn.4travel.jp/img/tcs/t/album/src/10/40/47/src_10404771.jpg?1259494610">
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="locations-row" :gutter="10">
        <el-col :span=12 class="location">
          <div class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <img src="https://cdn.4travel.jp/img/tcs/t/album/src/10/40/47/src_10404771.jpg?1259494610">
            </el-card>
          </div>
        </el-col>
        <el-col :span=12 class="location">
          <div class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <img src="https://cdn.4travel.jp/img/tcs/t/album/src/10/40/47/src_10404771.jpg?1259494610">
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="">
      <el-button class="shuffle-btn" type="success" round>Shuffle</el-button>
    </div>
  </div>
</template>

<style>
.locations-wrapper{
  box-sizing:border-box;
  margin-top: 40px;
  padding:10px 10px 10px 10px;
  /* height:80%; */
  width:100%;
}

.locations-row{
  /* box-sizing:border-box; */
  height:50%;
  margin:0 0 10px 0;
}

.location{
  /* margin:20px; */
  height:100%;
}

.location-pictures{
  /* height:100%; */
  /* background-color: green; */
  height:100%;

}

img{
  max-height:100%;
  width:100%;
  vertical-align: text-bottom;
}

.shuffle-btn{
  width:98%;
  margin: 10px;
}
</style>

<script>
import Vue from 'vue/dist/vue.esm'
var pageHeight;
export default{
  data() {
    return {
      pageHeight: pageHeight
    }
  },
  mounted: function(){
    this.pageHeight = window.parent.screen.height - 110 + 'px';
    console.log(this.pageHeight)
  }
}

</script>
