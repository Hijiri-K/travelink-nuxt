<template>

  <el-tabs type="card">
    <!-- <div class=""> -->
     <el-tab-pane  v-for="day in stay_nights"
                    :key='day.id'
                    :label='"Day "+day.id'>
       <div class="itinerary-wrapper-wrapper">
         <div class="" >
         <div class="time-line-wrapper top inline-block">
           <div class="time-line__line-wrapper top inline-block">
             <div class="time-line__line bar-top">
             </div>
               <span class="time-line__line__bot bar-top__dot"></span>
           </div><!--
        --><div class="time-line__time top inline-block">
             <p>{{start_time_show}}</p>
           </div>
         </div>
         <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
           <span>出発：</span> <el-time-select
                         v-model="start_time"
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
           <div class="itinerary-wrapper itinerary-transition-item" v-for="place in daily_plans[day.id]" v-bind:key="place.id">
             <div class="time-line-wrapper inline-block">
               <div class="time-line__line-wrapper inline-block">
                 <div class="time-line__line">
                     <span class="time-line__line__bot"></span>
                 </div>
               </div><!--
            --><div class="time-line__time inline-block">
                 <p>{{timeSchedule(place.start_time, place.distance)}}</p>
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
           --><div class="" v-if="place.distance!=0">
               <div class="time-line-wrapper inline-block duration-card-time-line">
                 <div class="time-line__line-wrapper inline-block duration-card-time-line">
                   <div class="time-line__line">
                     <span class="time-line__line__bot"></span>
                   </div>
                 </div><!--
                 --><div class="time-line__time inline-block">
                      <p>{{timeFormat(place.start_time)}}</p>
                    </div>
               </div><!--
            --><el-card :body-style="{ padding: '0px'}" class="duration-card inline-block"  >
                 <p>移動時間：{{place.distance}}min</p>
               </el-card>

             </div>
           </div>
         </transition-group>
         <div class="">
           <div class="time-line-wrapper top inline-block">
             <div class="time-line__line-wrapper top inline-block">
               <div class="time-line__line bar-bottom">
               </div>
                 <span class="time-line__line__bot bar-bottom__dot"></span>
             </div><!--
          --><div class="time-line__time top inline-block">
               <p>{{timeSchedule(null, null)}}</p>
             </div>
           </div>
           <el-card :body-style="{ padding: '0px'}" class="duration-card duration-card-start inline-block">
             <p>終了：{{timeSchedule(null, null)}}</p>
           </el-card>
         </div>
       </div>
     </el-tab-pane>
    <!-- </div> -->
   </el-tabs>

</template>

<script>
import moment from 'moment';
import _ from  'lodash'

var initial_time = {hours: 9, minutes: 0}
var plan_start_time = moment(initial_time);
var plan_start_time_show = plan_start_time.format("H:mm")
var end_time = moment(initial_time).format("H:mm");
var hotels = null
var daily_plans=[[],[],[],[]]


export default {
  props: ['planningPlaces','stay_nights','hotels', 'daily_plans'],
  data() {
    return {
        start_time_show:plan_start_time_show,
        end_time:end_time,
        start_time: moment(initial_time).format("H:mm"),
        picker_options:{
          start: moment({hours: 9, minutes: 0}).format("H:mm"),
          step: moment({hours: 0, minutes: 30}).format("H:mm"),
          end: moment({hours: 11, minutes: 0}).format("H:mm")
        },
        clearable:false
    };
  },
  methods:{
    timeSchedule: function (start_time, distance) {
      if(start_time!=null&&distance!=null){//このメゾットでは上手くいかないので、googleAPIの中身から、時間を取り出す作戦に変更する。
      var base_time = moment(initial_time)
      var result = base_time.add(start_time-distance,'minutes').format("H:mm")
      console.log(result)
      end_time=result
      console.log(end_time)
      return result
    }else{
      return end_time
    }

  },
  timeFormat: function(data){
    var base_time = moment(initial_time)
    var result = base_time.add(data,'minutes').format("H:mm")

    return result
  },
  set_start_time: function(){
    console.log(this.start_time)
    console.log(this.daily_plans)
    var test = moment(this.start_time,"H: mm")
    initial_time = test
    this.start_time_show = test.format("H:mm")
  },
  planningPlacesOrder: function(day){
    //
    //
    // var hotels = this.hotels
    // var planning_places_hotels=[]
    // var hotel_durations = []
    // var planning_places = this.planningPlaces
    // var delayed_result = null;
    // var hotels_locations = []
    // var testtest = this.daily_plans
    //
    //
    // // function define_nearest_hotel(){
    //   var day_planning = planning_places.filter(function(place){
    //     return place.day == day;
    //   })
    //
    //   for(var test of hotels){//place_idだけの配列を作成
    //       hotels_locations.push(test.location)}
    //   console.log(hotels_locations)
    //
    //
    // // console.log(day_planning[day_planning.length-1])
    // if(day_planning[day_planning.length-1]!==undefined){//undefinedの場合を除いて、各日程の最終のアクティビティーを抽出してbefore_hotelsに追加する。
    //
    //   // DistanceMatrix サービスを生成
    //     var distanceMatrixService = new google.maps.DistanceMatrixService();
    //
    //     // 出発点
    //     var origins = day_planning[day_planning.length-1].location;
    //
    //     // DistanceMatrix の実行
    //     distanceMatrixService.getDistanceMatrix({
    //     	origins: [origins], // 出発地点
    //     	destinations: hotels_locations, // 到着地点
    //     	travelMode: google.maps.TravelMode.DRIVING, // 車モード or 徒歩モード
    //
    //     }, function(response, status) {
    //       console.log(response);
    //
    //       // var hotel_durations = []
    //
    //     	if (status == google.maps.DistanceMatrixStatus.OK) {
    //
    //     		// 出発地点と到着地点の住所（配列）を取得
    //     		var origins = response.originAddresses;
    //     		var destinations = response.destinationAddresses;
    //
    //     		// 出発地点でループ
    //     		for (var i=0; i<origins.length; i++) {
    //     			// 出発地点から到着地点への計算結果を取得
    //     			var results = response.rows[i].elements;
    //
    //     			// 到着地点でループ
    //     			for (var j = 0; j<results.length; j++) {
    //     				var from = origins[i]; // 出発地点の住所
    //     				var to = destinations[j]; // 到着地点の住所
    //     				var duration = results[j].duration.value; // 時間
    //     				// var distance = results[j].distance.value; // 距離
    //     				// console.log(duration);
    //             hotel_durations.push(duration)
    //
    //     			}
    //           console.log(hotel_durations);
    //
    //
    //     		}
    //
    //         console.log(hotel_durations.indexOf(Math.min.apply(null,hotel_durations) ));
    //         var nearest_hotel = hotel_durations.indexOf(Math.min.apply(null,hotel_durations) )
    //         console.log(nearest_hotel);
    //
    //         hotels[nearest_hotel].day=day
    //         console.log(hotels[nearest_hotel]);
    //
    //         day_planning.push(hotels[nearest_hotel])
    //         console.log(day_planning);
    //         daily_plans[day]=[]
    //         daily_plans[day].push(...day_planning)
    //         console.log(daily_plans)
    //     	}
    //     });
    //       console.log(day_planning);
    //   }
    //   // return day_planning
    // //
    // // console.log(testtest);
    //   return this.daily_plans[day]
  },


  clean_planning_places_hotels:function(){
    planning_places_hotels=[]
  }

}
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
  margin-bottom: 8px;
  width:calc(100%-50px);
  height:45px;
  line-height: 40px;
  padding:2.5px;
}

.duration-card-time-line{
  height:25px !important;
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
 }

 .time-line__time p{
   position: absolute;
   bottom:-7px;
   /* width:50px; */
 }

 .time-line__line__bot{
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

 .time-line__line-wrapper{
   height:108px;
   width:10px;
 }

 .time-line__time p{
   /* font-size: 14px; */
 }

 .top{
   height:20px;
 }

 .top p{
   bottom:-5px;
 }

 .bar-top{
   height:45px;
   /* width:100%; */
   position: absolute;
   bottom: -35px;
 }

 .bar-top__dot{
   bottom: 3px;
 }

 .bar-bottom{
   height:15px;
   /* width:100%; */
   position: absolute;
   bottom: 5px;
 }

 .bar-bottom__dot{
   bottom: 3px;
 }

 .el-tabs__header{
   display:block !important;
 }


</style>
