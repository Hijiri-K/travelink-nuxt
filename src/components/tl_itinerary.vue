<template>

  <el-tabs type="card">
    <!-- <div class=""> -->
     <el-tab-pane  v-for="day in planDays"
                    :key='day.id'
                    :label='"Day "+day.id'>
       <div class="itinerary-wrapper-wrapper">
         <div class="" >
         <div class="time-line-wrapper top inline-block">
           <div class="" v-if="planningPlaces.length != 0">
             <div class="time-line__line-wrapper top inline-block">
               <div class="time-line__line bar-top">
               </div>
                 <span class="time-line__line__dot bar-top__dot"></span>
             </div><!--
          --><div class="time-line__time top inline-block">
               <p>{{start_time_show}}</p>
             </div>
           </div>
         </div>
         <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
           <span>出発：</span> <el-time-select
                         v-model="startTime"
                         :picker-options=picker_options
                         :clearable=clearable
                         placeholder="Select time"
                         @change="set_start_time"
                         class="inine-block"
                        >
                     </el-time-select>
         </el-card>
       </div>

         <transition-group tag="div" name="itinerary-transition">
           <div class="itinerary-wrapper itinerary-transition-item" v-for="place in planningPlaces" v-bind:key="place.id">
             <div class="" v-if="place.place_id != null">
               <div class="time-line-wrapper inline-block" >
                 <div class="time-line__line-wrapper inline-block">
                   <div class="time-line__line">
                       <!-- <span class="time-line__line__dot"></span> -->
                   </div>
                 </div><!--
              --><div class="time-line__time inline-block">
                 </div>
               </div><!--
            --><div class="itinerary-item-wrapper  inline-block">
                 <el-card :body-style="{ padding: '0px' }" class="itinerary-item"><!--
                    --><div class="itinerary-item__image inline-block">
                         <img src="https://cdn.4travel.jp/img/tcs/t/album/src/10/40/47/src_10404771.jpg?1259494610">
                       </div><!--
                    --><div class="itinerary-item__contents inline-block">
                         <section class="itinerary-item__contents__section">
                           <h3>{{place.title}}</h3>
                           <div class="itinerary-item__contents__section__category">
                             <p>種類：{{place.group}}　滞在時間：{{place.staying}} min</p>
                           </div>
                           <div class="itinerary-item__contents__section__stay">
                           </div>
                           <div class="itinerary-item__contents__section__discription">
                             <p>{{place.discription}}</p>
                           </div>
                           <div class="itinerary-item__contents__section__price">
                             <p>{{place.currency}}{{place.price}}</p>
                           </div>
                         </section>
                       </div>
                 </el-card>
               </div><!--
          --></div><!--
           --><div class="" v-if="place.duration != null">
               <div class="time-line-wrapper inline-block duration-card-time-line">
                 <div class="time-line__line-wrapper inline-block duration-card-time-line">
                   <div class="time-line__line">
                     <span class="time-line__line__dot dot-start"></span>
                     <span class="time-line__line__dot dot-finish"></span>
                   </div>
                 </div><!--
                 --><div class="time-line__time inline-block">
                       <div class="time-line__time-start">
                           <p>{{calcStartTime(place.startTime, place.duration)}}</p>
                       </div>
                       <div class="time-line__time-finish">
                           <p>{{calcFinishTime(place.startTime)}}</p>
                       </div>
                    </div>
               </div><!--
            --><el-card :body-style="{ padding: '0px'}" class="duration-card inline-block">
                 <p>移動時間：{{place.duration}}min</p>
               </el-card>
             </div>
           </div>
         </transition-group>
         <div class="">
           <div class="time-line-wrapper top inline-block" >
             <div class="" v-if="planningPlaces.length != 0">
               <div class="time-line__line-wrapper top inline-block">
                   <span class="time-line__line__dot bar-bottom__dot"></span>
               </div><!--
            --><div class="time-line__time bottom inline-block">
                 <p>{{calcStartTime(null, null)}}</p>
               </div>
             </div>
           </div>
           <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
             <p>終了：{{calcStartTime(null, null)}}</p>
           </el-card>
         </div>
       </div>
     </el-tab-pane>
    <!-- </div> -->
   </el-tabs>

</template>

<script>
import moment from 'moment';

var initial_time = {hours: 9, minutes: 0}
var plan_start_time = moment(initial_time);
var plan_start_time_show = plan_start_time.format("H:mm")
var end_time = moment(initial_time).format("H:mm");

export default {
  props: ['planningPlaces', 'planDays'],
  data() {
    return {
        start_time_show:plan_start_time_show,
        end_time:end_time,
        startTime: moment(initial_time).format("H:mm"),
        picker_options:{
          start: moment({hours: 9, minutes: 0}).format("H:mm"),
          step: moment({hours: 0, minutes: 30}).format("H:mm"),
          end: moment({hours: 11, minutes: 0}).format("H:mm")
        },
        clearable:false
    };
  },
  methods:{
    calcStartTime: function (startTime, distance) {
      if(startTime != null && distance != null){//このメゾットでは上手くいかないので、googleAPIの中身から、時間を取り出す作戦に変更する。
      var base_time = moment(initial_time)
      var result = base_time.add(startTime-distance, 'minutes').format("H:mm")
      // console.log(result)
      end_time = result
      // console.log(end_time)
      return result
      }else{
        return end_time
      }
    },
    calcFinishTime: function(time){
      var base_time = moment(initial_time)
      var result = base_time.add(time, 'minutes').format("H:mm")

      return result
    },
    set_start_time: function(){
      console.log(this.startTime)
      var test = moment(this.startTime, "H: mm")
      initial_time = test
      this.start_time_show = test.format("H:mm")
    }
  },
  // mounted:function(){
  //   console.log(this.planningPlaces);
  // }
}

</script>

<style scoped>


.itinerary-item-wrapper{
  padding-bottom:8px;
  width:calc(100%-50px);
}
 .el-card{
   /* margin:10px; */
   padding:0;
   height:100px;
  box-sizing: border-box;
 }


 .duration-card{
   padding:0;
   margin-bottom: 8px;
   height:25px;
  width:calc(100%-50px);
 }

 .duration-card p{
   font-size: 16px;
 }

.duration-card-start{
  margin-bottom:8px;
  width:calc(100%-50px);
  height:38px;
  line-height:32px;
  padding:3px;
}

.duration-card-time-line{
  height:30px !important;
}

 .el-card__body{
   padding:0px;
   /* height:150px; */
 }
 .itinerary-item__image{
   /* display: inline-block; */
   height:100px;
   width:100px;
 }
 img{
   height:100px;
   width:100px;
   vertical-align: text-bottom;
 }

 h3{
   padding-top:5px;
   margin: 0;
   font-size: 16px;
 }

 p{
   margin:0;
   word-wrap: break-all;
   font-size: 12px
 }

 .itinerary-item__contents__section__category p, .itinerary-item__contents__section__stay p{
   font-size: 10px;
   color:#666666;
 }

 .itinerary-item{
 }

 .itinerary-item__contents{
   vertical-align:top;
   height:100px;
   width:calc(100%-100px);
 }

 .itinerary-item__contents__section{
   padding:0 15px 15px 15px;
 }

 .inline-block{
   display: inline-block;
   vertical-align: top;
 }

 .time-line__line{
   /* border: solid 2px #8895B3; */
   height:109px;
   width:4px;
   background-color: #8895B3;
   margin-right: 3px;
   margin-left: 3px;
 }

 .time-line-wrapper{
   /* height:108px; */
   width:50px;
   position:relative;
 }

 .time-line__time{
   height:100px;
   width:40px;
 }

 .time-line__time p{
   font-size:12px;
   padding: 0 0 4px 2px;
   position: absolute;
   bottom:-7px;
   /* width:50px; */
 }

 .time-line__time-start p{
   font-size:12px;
   padding: 0 0 4px 2px;
   position: absolute;
   bottom:23px;
   /* width:50px; */
 }

 .time-line__time-finish p{
   font-size:12px;
   padding: 0 0 4px 2px;
   position: absolute;
   bottom:-7px;
   /* width:50px; */
 }


 .time-line__line__dot{
   width:8px;
   height:8px;
   border-radius: 50%;
   background-color: #6D6875;
   position: absolute;
   bottom:0;
   left:0px;
   margin-right: 1px;
   margin-left: 1px;
 }

 .dot-start{
   position: absolute;
   bottom:31px;
   left:0px;
 }

 .dot-finish{
   position: absolute;
   bottom:0;
   left:0px;
 }

 .time-line__line-wrapper{
   height:108px;
   width:10px;
 }

 .top{
   height:20px;
 }

 .top p{
   bottom:-32px;
 }

 .bottom p{
    bottom:13px;
  }

 .bar-top{
   height:12px;
   /* width:100%; */
   position: absolute;
   bottom: -35px;
 }

 .bar-top__dot{
   bottom: -24px;
 }

 .bar-bottom{
   height:0;
   /* width:100%; */
   position: absolute;
   bottom: 5px;
 }

 .bar-bottom__dot{
   bottom: 20px;
 }

 .el-tabs__header{
   display:block !important;
 }


</style>
