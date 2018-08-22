<!-- ここのファイルでコンポーネントをまとめると、変数の受け渡しに不便が生じるので、コンポーネントをplanning.jsで読み込む形式に変更 -->

<template>
  <div class="top-wrapper">
    <div class="locations-wrapper">

      <el-row type="flex" class="locations-row upper" :gutter="10" >
        <el-col :span=12 class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <router-link tag="div" to="/planning" class="location-pictures" v-bind:style="{ 'background-image': 'url(' + image1 + ')' }">
                <h3 class="location-title">別府</h3>
              </router-link>
            </el-card>
        </el-col>

        <el-col :span=12 class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <router-link tag="div" to="/planning" class="location-pictures" v-bind:style="{ 'background-image': 'url(' + image2 + ')' }">
                <h3 class="location-title">鳥取</h3>
              </router-link>
            </el-card>
        </el-col>

      </el-row>

      <el-row type="flex" class="locations-row" :gutter="10">

        <el-col :span=12 class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <router-link tag="div" to="/planning" class="location-pictures" v-bind:style="{ 'background-image': 'url(' + image3 + ')' }">
                <h3 class="location-title">長野</h3>
              </router-link>
            </el-card>
        </el-col>

        <el-col :span=12 class="location">
            <el-card :body-style="{ padding: '0px' }" class="location-pictures">
              <router-link tag="div" to="/planning" class="location-pictures" v-bind:style="{ 'background-image': 'url(' + image4 + ')' }">
                <h3 class="location-title">滋賀</h3>
              </router-link>
            </el-card>
        </el-col>

      </el-row>
    </div>
    <div class="">
      <el-button class="shuffle-btn" type="success" round>Shuffle</el-button>
    </div>
  </div>
</template>

<style>
.top-wrapper{
  height:100%;
  width:100%;
}
.locations-wrapper{
  box-sizing:border-box;
  margin-top: 40px;
  padding:10px 10px 10px 10px;
  height:calc(100%-100px);
  width:100%;
}

.locations-row{
  /* box-sizing:border-box; */
  height:50%;
  /* margin:0 0 10px 0; */
}

.locations-row.upper{
  /* box-sizing:border-box; */
  margin-bottom: 10px;
  /* margin:0 0 10px 0; */
}


.location{
  /* margin:20px; */
  height:100%;
  width:50%;
}

.el-card__body{
  height: 100%;
  width:100%;
}

.location-pictures{
  height:100%;
  width:100%;
  background-size: cover;
  display: flex;
justify-content: center;
align-items: center;

}

.location-title{
  font-size: 60px;
  color: #fff;
  opacity: 0.85;
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
      image1:"https://www.japan-guide.com/thumb/XYZeXYZe4701_375.jpg",
      image2:"https://media-assets.aumo.jp/uploads/photo/upload_photo/data/3609/xlarge_a8304841-e0b3-4ea3-ba61-bd20a22534ac.jpeg",
      image3:"http://triplovers.jp/hokushinetsu/wp-content/uploads/2017/11/%EF%BC%95-1.jpg",
      image4:"https://image.gnst.jp/v1/gurutabi/public/img/article/f7/75/art001467/article_art001467_11.jpg?20170301151700&w=600"
    }
  },
  // mounted: function(){
  //   this.pageHeight = window.parent.screen.height - 110 + 'px';
  //   console.log(this.pageHeight)
  // }
}

</script>
