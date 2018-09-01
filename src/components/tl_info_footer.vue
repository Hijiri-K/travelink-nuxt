<template>
<div class="info-footer-wrapper">
  <div class="contents-wrapper">
    <div class="total-price">
      <p>Total price:</p> <p>${{totalPrice}}</p>
    </div>
    <router-link tag="div" :to="{name:'itineraryConfirm', params:{planningPlaces:planningPlaces}}" id="book-btn">Book Trip</router-link>
  </div>
</div>
</template>
 <style scoped>
.info-footer-wrapper{
  width:100%;
  height:50px;
  position: fixed;
  bottom:0;
  z-index: 500;
  background-color:#ececec;
}
 .contents-wrapper{
  float:right;
}
 .total-price{
  display: inline-block;
  height:50px;
  margin-right:20px;
}
 .total-price p{
  font-size: 30px;
  font-weight: bold;
  color:#555555;
  display: inline-block;
  line-height: 50px;
  margin: 0 3px;
}
 #book-btn{
  height:40px;
  width:100px;
  margin: 5px 20px;
  display: inline-block;
  vertical-align: top;
  background-color: #67c23a;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  line-height: 40px;
  text-align: center;
}
 </style>
 <script>
export default {
  props: ['totalPrice','planningPlaces'],
  data() {
    return {
    }
  }
}
 </script>
