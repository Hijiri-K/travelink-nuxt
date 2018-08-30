<template>
  <transition name="modal">
    <div class="modal" v-show="showingModal" @click.self="closeModal">
      <el-card :body-style="{ padding: '0px' }" class="modal-card">
        <div class="close-btn" @click="closeModal">
          <span>×</span>
        </div>
        <img class="modal-card__image" :src="place.image_url">
        <div class="modal-card__contents">
          <h3>{{place.title}}</h3>
          <p>種類：{{place.group}}</p>
          <p>滞在時間：{{place.staying}}</p>
          <p>種類：{{place.price}}</p>
          <p>{{place.discription}}</p>
          <iframe src="/place_details/yufuin.html" width="100%" height="200px"></iframe>
        </div>
      </el-card>
    </div>
  </transition>
</template>
 <script>
import moment from 'moment';
   export default {
    data() {
      return {
        showingModal:false,
        place:{ id:null, place_id:null, type:null, title:null, group:null, staying:null, discription:null, price:null, currency:null, location:{lat:null, lng:null}, image_url:null, default:null}
      };
    },
    methods:{
      showModal: function(place){
        this.place = place;
        this.showingModal = true;
      },
      closeModal: function(){
        this.showingModal = false;
      }
    }
}
</script>
 <style scoped>
.modal {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, .6);
  transform: translate3d(0, 0, 0);
}
/* 往路のアニメーション全体に対して設定をするためのクラス */
.modal-enter-active {transition: opacity .2s;}
/* 往路の開始状態を設定するためのクラス */
.modal-enter        {opacity: 0;}
/* 往路の終了状態を設定するためのクラス */
.modal-enter-to     {opacity: 1;}
/* 復路のアニメーション全体に対して設定をするためのクラス */
.modal-leave-active {transition: opacity .6s;}
/* 復路の開始状態を設定するためのクラス */
.modal-leave        {opacity: 1;}
/* 復路の終了状態を設定するためのクラス */
.modal-leave-to     {opacity: 0;}
 .modal-card {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  height:90%;
  width:90%;
}
 .modal-card__image{
  width:100%;
  height:300px;
  display: block;
}
 .modal_card__contents{
  padding:20px;
}
 .close-btn span{
  font-size: 50px;
  color: #bfbfbf;
  opacity: 0.9;
  line-height: 25px;
  height:35px;
  width:35px;
  position: absolute;
  top:3px;
  right:3px;
 }
 </style>
