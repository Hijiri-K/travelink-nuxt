<template>
<div class="">
  <el-tabs type="card" @tab-click="tabClick">
     <el-tab-pane  v-for="day in planDays"
                    :key='day.id'
                    :label='"Day "+day.id'
                    class = "tlItinerary"
                    >
       <div class="itinerary-wrapper-wrapper">
         <div class="" >
         <div class="time-line-wrapper top inline-block">
           <div class="" v-if="planningPlaces[day.id -1] != undefined">
             <div class="time-line__line-wrapper top inline-block">
               <div class="time-line__line bar-top">
               </div>
                 <span class="time-line__line__dot bar-top__dot"></span>
             </div><!--
          --><div class="time-line__time top inline-block">
               <p>{{startTimeShow}}</p>
             </div>
           </div>
         </div>
         <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
           <span>出発：</span> <el-time-select
                         v-model="startTime"
                         :picker-options=picker_options
                         :clearable=clearable
                         :editable=editable
                         placeholder="Select time"
                         @change="set_start_time"
                         class="inine-block"
                        >
                     </el-time-select>
         </el-card>
       </div>
       <draggable :list="planningPlacesDraggable[day.id-1]" @start="deleteDurationBeforeDragging" @end="calcurateRouteAfterDragging" :options='draggableOptions'>
         <transition-group tag="div" name="itinerary-transition">
           <div class="itinerary-wrapper itinerary-transition-item" v-for="place in planningPlaces[day.id-1]" v-bind:key="place.id"  :class="{ 'disable-transition' : disableTrandition }">
             <div class="" v-if="place.place_id != null">
               <div class="time-line-wrapper inline-block" >
                 <div class="time-line__line-wrapper inline-block">
                   <div class="time-line__line">
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
          --><div v-if="place.duration != null">
             <div class="duration-cards">
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
           </div>
         </transition-group>
       </draggable>
         <div class="">
           <div class="time-line-wrapper top inline-block" >
             <div class="" v-if="planningPlaces[day.id -1] != undefined">
               <div class="time-line__line-wrapper top inline-block">
                   <span class="time-line__line__dot bar-bottom__dot"></span>
               </div><!--
            --><div class="time-line__time bottom inline-block">
                 <p>{{calcPlanFinishTime(day.id)}}</p>
               </div>
             </div>
           </div>
           <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
             <p>終了：{{calcPlanFinishTime(day.id)}}</p>
           </el-card>
         </div>
       </div>
     </el-tab-pane>
   </el-tabs>
   </div>
</template>

<script>
import moment from 'moment';
import draggable from 'vuedraggable';

var initialTime = {hours: 9, minutes: 0}
var planStartTime = moment(initialTime);
var planStartTimeShow = planStartTime.format("H:mm")

export default {
  components:{
    draggable
  },
  props: ['planningPlaces', 'planDays'],
  data() {
    return {
        startTimeShow:planStartTimeShow,
        startTime: moment(initialTime).format("H:mm"),
        picker_options:{
          start: moment({hours: 9, minutes: 0}).format("H:mm"),
          step: moment({hours: 0, minutes: 30}).format("H:mm"),
          end: moment({hours: 11, minutes: 0}).format("H:mm")
        },
        clearable:false,
        editable:false,
        tabIndex:0,
        planningPlacesDraggable:this.planningPlaces,
        draggableOptions:{group : "plan", animation:300, disabled:true},
        disableTrandition:false,
    };
  },
  methods:{
    calcStartTime: function (startTime, distance) {
      planStartTime = moment(initialTime)
      var result = planStartTime.add(startTime - distance, 'minutes').format("H:mm")
      return result
    },
    calcFinishTime: function(startTime){
      planStartTime = moment(initialTime)
      var result = planStartTime.add(startTime, 'minutes').format("H:mm")

      return result
    },
    calcPlanFinishTime: function(dayId) {
      planStartTime = moment(initialTime)
      if (this.planningPlaces[dayId - 1] != undefined){
        if(this.planningPlaces[dayId - 1].length >= 3 ){
          var result = planStartTime.add(this.planningPlaces[dayId - 1][this.planningPlaces[dayId - 1].length - 2].startTime + this.planningPlaces[dayId - 1][this.planningPlaces[dayId - 1].length - 1].staying, 'minutes').format("H:mm")
          return result
        }
      }
      },
    set_start_time: function(){
      var test = moment(this.startTime, "H: mm")
      initialTime = test
      this.startTimeShow = test.format("H:mm")
    },

    tabClick: function(tab){
      this.tabIndex = tab.index;
      this.$emit('tabClick');
    },
    deleteDurationBeforeDragging: function(){
      var durationCards = document.getElementsByClassName("duration-cards");
      for (var i = 0; durationCards.length > i; i++) {
        durationCards[i].style.display = "none";
      }
    },
    calcurateRouteAfterDragging: function(){
      console.log("end");
    }

  },
  mounted: function(){
    console.log(this.planningPlacesDraggable);
  }
}

</script>

<style scoped>


.itinerary-item-wrapper{
  padding-bottom:8px;
  /* padding-right: 5px; */
  width:calc(100%-55px);
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
  width:calc(100%-55px);
 }

 .duration-card p{
   font-size: 16px;
 }

.duration-card-start{
  margin-bottom:8px;
  width:calc(100%-55px);
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
   margin-left: 5px;
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
   left:0;
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

 .duration-cards{
   display: block;
   opacity: 1;
   /* transition: display 1s; */
 }

 .disable-transition {
    transition: transform 0s;
}

</style>
