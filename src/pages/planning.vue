<!-- ここのファイルでコンポーネントをまとめると、変数の受け渡しに不便が生じるので、コンポーネントをplanning.jsで読み込む形式に変更 -->

<template>
  <el-container>
      <el-row type="flex" class="map-video-wrapper">
        <el-col :span=16>
          <tl-map ref="map" v-bind:planningPlaces="planningPlaces"></tl-map>
        </el-col>
        <el-col :span=8>
          <tl-video-chat></tl-video-chat>
        </el-col>
      </el-row>

  <el-main>
  <!-- iPhone用 -->
      <el-row class="hidden-sm-and-up">
        <el-col :span=24>
          <el-tabs class="smartphone-view"  v-model="activeName">
            <el-tab-pane label="Itinerary" name="itinerary">
              <tl-schedule v-bind:percentage="percentage" class="schedule-wrapper"></tl-schedule>
              <tl-itinerary v-bind:planningPlaces="planningPlaces" v-bind:stay_nights="stay_nights" v-bind:hotels="hotels"></tl-itinerary>
            </el-tab-pane>
            <el-tab-pane label="Edit"  name="edit">
              <tl-schedule v-bind:percentage="percentage" class="schedule-wrapper"  @childs-event="parentsMethod2"></tl-schedule>
              <tl-itinerary-edit v-bind:places="places" @childs-event="parentsMethod" class="itinerary-edit-wrapper"></tl-itinerary-edit>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <div id="switch-buttons">
          <div class="switch-button" v-on:click="activeName='itinerary', styleObject.transform='translateX(0)'">itinerary</div><!--
       --><div class="switch-button" v-on:click="activeName='edit', styleObject.transform='translateX(100%)'">edit</div>
          <span id="active-bar" v-bind:style="styleObject"></span>
        </div>
      </el-row>

<!-- PC,iPad用 -->
      <el-row :gutter="20" class="hidden-xs-only">
        <el-col :span=12 id="itinerary-box">
            <tl-itinerary v-bind:planningPlaces="planningPlaces"　v-bind:stay_nights="stay_nights" v-bind:hotels="hotels"></tl-itinerary>
        </el-col>
        <el-col :span=12 id="itinerary-edit-box">
          <tl-schedule v-bind:percentage="percentage" @childs-event="parentsMethod2"></tl-schedule>
          <tl-itinerary-edit v-bind:places="places" @childs-event="parentsMethod" class="itinerary-edit-wrapper"></tl-itinerary-edit>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<style>
/* 全体のレイアウト */
body{
  margin:0;
}



.el-main{
  padding:0 5px 5px 5px !important;
  margin-top: 265px;
}

.map-video-wrapper{
  width: 100%;
  position: fixed;
  margin-top: 40px;
  z-index: 10;
}

.schedule-wrapper{
  position: fixed;
  top:190px;
  left:0;
  width:100%;
  padding:5px;
  background-color: white;
  box-sizing: border-box;
  z-index: 15;
}

.itinerary-wrapper-wrapper{
  margin-bottom: 50px;
}

#itinerary-box{
  position: fixed;
  overflow-y: auto;
  /* top:150px; */
  height: calc(100%-250px);
}

#itinerary-edit-box{
  position: fixed;
  height: calc(100%-250px);
  overflow-y: auto;
  /* top:150px; */
  left:50%;
}

/* タブ切り替えボタン */
#switch-buttons{
  width:100%;
  position: fixed;
  bottom:0;
  left:0;
  height:50px;
  z-index: 20;
}

.switch-button{
  width:50%;
  height:50px;
  background-color: #f9f9f9;
  border: solid 0.5px #dcdfe6;
  box-sizing: border-box;
  margin: 0;
  display: inline-block;
  text-align: center;
  line-height: 50px;
}

#active-bar{
  position: fixed;
  bottom: 0px;
  left:0;
  width:50%;
  height:2px;
  background-color: #409EFF;
  transition: transform 0.5s;
}

/* Elementのコンポーネントのレイアウト調整 */
.el-checkbox__label{
  display: none !important;
}

.el-checkbox-group{
  font-size: initial !important;
}

.progress-bar{
  height:20px !important;
  line-height: 20px !important;
}

.el-progress-bar__inner{
  transition: width 1s ease-out;
}

.el-date-editor{
  height:35px !important;
  width:100px !important;
  vertical-align: top !important;
}

.el-input__inner{
  width:100px !important;
  height:35px !important;
  vertical-align: top !important;
  line-height: 35px !important;
}

.el-input__prefix, .el-input__suffix, .el-input__icon{
  height:35px !important;
  line-height: 35px !important;
}

.el-input__icon{
  height:35px !important;
  line-height: 35px !important;
}

.smartphone-view > .el-tabs__header{
  display:none !important;
}

.el-date-range-picker {
    width: 360px !important;
}

.el-picker-panel__body {
    min-width: 360px !important;
}

.el-date-range-picker__header div {
    margin: 0 !important;
}

.el-date-table th{
  font-size:0;
  line-height: 20px;
}

.el-date-table th:first-letter{
    font-size:10px !important;
}

/* トランジション関係 */
.itinerary-transition-item {
  transition: all 0.5s;
  /* display: inline-block; */
  /* margin-right: 10px; */
}

.itinerary-transition-enter, .itinerary-transition-leave-to{
  opacity: 0;
  transform: translateY(0);
}
.itinerary-transition-leave-active {
  position: absolute;
}

.el-range-separator {
    padding: 0 !important;
    margin: 0 3px !important;
    line-height: 27px !important;
    width: 25px !important;
    color: #303133 !important;
}

/* .el-range-input {
    line-height: 27px !important;
} */

.el-range-editor{
  width:230px !important;
  margin-right: 10px;
}

</style>
<script>
// import HelloTemp from '../components/hello_temp.vue'
// import HelloVue from '../components/hello_vue.vue'
import Vue from 'vue/dist/vue.esm'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)


// import ElementUI from 'element-ui';
// import locale from 'element-ui/lib/locale/lang/en'
// import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/display.css';
// Vue.use(ElementUI, { locale })

// import TlPlanning from '../components/planning.vue'

import TlHeader from '../components/tl_header.vue'
import TlSchedule from '../components/tl_schedule.vue'
import TlVideoChat from '../components/tl_video_chat.vue'
import TlMap from '../components/tl_map.vue'
import TlItinerary from '../components/tl_itinerary.vue'
import TlItineraryEdit from '../components/tl_itinerary_edit.vue'



var places = [{ id:1, place_id:"ChIJoa3m8WSfRjUReaWY4_9UohE", title: '別府駅', group: '駅', staying:30, discription: '別府駅です。', price: 120, currency:"$", location:{lat:33.233358, lng:131.606644}, distance:0, day:null, start_time:null, default:true},
              { id:2, place_id: "ChIJ3xRR5tmtRjURfacmU4XGHvQ", title: '湯布院', group: '食べ歩き', staying:180, discription: '豊後富士と呼ばれる美しい由布岳の山麓に広がり、全国2位の湯量を誇る人気温泉地。', price: 60, currency:"$", location:{lat:33.262623,lng:131.357272}, distance:0, day:null, start_time:null, default:0},
              { id:3, place_id:"ChIJs3-vWz6hRjUR3g9LwnSoWRo", title: 'うみたまご', group: '水族館', staying:60, discription: '海の生き物とふれあえるテーマパークです。', price: 30, currency:"$", location:{lat:33.258607,lng:131.535934}, distance:0, day:null, start_time:null, default:0},
              { id:4, place_id:"ChIJg03qY32uRjURMT_ayA1n4yE", title: '金鱗湖', group: '湖', staying:120, discription: '大分川の源流のひとつであり、この池に朝霧がかかる風景は由布院温泉を代表する景観となっている。', price: 30, currency:"$", location:{lat:33.266685,　lng:131.369048}, distance:0, day:null, start_time:null, default:true},
              { id:5, place_id:"ChIJsQqC1jGoRjURUqzYIaD7zxw", title: '九州自然動物公園アフリカンサファリ', group: '宿', staying:120, discription: 'たくさんの珍しい動物たちを車の中から観察できるサファリ動物園。', price: 120, currency:"$", location:{lat:33.354042, lng:131.411499 }, distance:0, day:null, start_time:null, default:false},
              { id:6, place_id:"ChIJxWpZw0OvRjUReEV7lBzqj2k", title: '城島高原パーク', group: '宿', staying:240, discription: '国内初の木製ジェット コースターと季節限定の屋外スケートリンクがある遊園地。', price: 120, currency:"$", location:{lat:33.266971,lng:131.426408}, distance:0, day:null, start_time:null, default:false},
              ]

var hotels = [{ id:1, place_id:"ChIJO3FL6menRjURgLiDwXzEebU", title: '潮騒の宿　晴海', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.317766, lng: 131.500177}, distance:0, day:null, start_time:null},
              { id:2, place_id:"ChIJvSfzzN2mRjURvtYsFM2Hs8w", title: '山田別荘', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.282059, lng: 131.503630}, distance:0, day:null, start_time:null},
              { id:3, place_id:"ChIJE7scRFymRjURjxfcE67NO80", title: '杉乃井ホテル', group: '温泉', staying:120, discription: '別府温泉郷・観海寺温泉の高台に位置する、３世代で楽しめる温泉リゾートホテルです。', price: 120, currency:"$", location:{lat:33.283696,lng:131.475077}, distance:0, day:null, start_time:null, default:null},
              ]

var planningPlaces = [];
var ordered_places=[];

var planning_hotels = [];

export default {
  components: {
    TlHeader,
    TlSchedule,
    TlVideoChat,
    TlMap,
    TlItinerary,
    TlItineraryEdit
  },
    data() {
        return {
            percentage: 0,
            places:places,
            hotels:hotels,
            planningPlaces:planningPlaces,
            places:places,
            activeName:'itinerary',
            ordered_places:ordered_places,
            stay_nights:[{id:1,day:1},{id:2,day:2},{id:3,day:3}],
            styleObject: {transform: 'translateX(0)'}
        }
    },
    methods: {
      calc_percentage: function(){
        this.percentage=0;
        var totalTime = 0;
        for(var place of planningPlaces){
         var staying = place['staying']+place['distance']
          totalTime += staying
          this.percentage = Math.round(totalTime/480*100/this.stay_nights[this.stay_nights.length-1].id)
          // console.log(totalTime)
        }
         console.log(this.percentage)
      },
      parentsMethod: function(selectedPlaces) {
        planningPlaces.length = 0
        planningPlaces.push(...selectedPlaces)
        console.log(planningPlaces)

         this.$refs.map.initMap()

         var directionsService = new google.maps.DirectionsService;
         var directionsDisplay = new google.maps.DirectionsRenderer;
         var before_spots =[];
         var place_ids=[];
         var response_place_ids=[];
         var day = 1
         var before_hotels=[];



         for (var planningPlace of this.planningPlaces){
             before_spots.push({
             location: planningPlace.location,
             stopover: true
             })}

         for (var test of planningPlaces){//place_idだけの配列を作成
             place_ids.push(test.place_id)}
         console.log(place_ids)


         if(before_spots.length!=0){
         var origin = before_spots[0].location;
         // var destination = before_spots[0].location;//最初に選択した場所に帰ってくるルート
         var destination = before_spots[before_spots.length-1].location;//最後に選択した場所に帰ってくるルート
         directionsService.route({
           origin:origin,
           destination:destination,
           travelMode: 'DRIVING',
           // waypoints: before_spots.slice(1),//最初に選択した場所に帰ってくるルート
           waypoints: before_spots.slice(1,before_spots.length-1),//最後に選択した場所に帰ってくるルート
           optimizeWaypoints: true
         }, function(response, status) {
           if (status === 'OK') {
             directionsDisplay.setDirections(response);
             console.log(response)

             for (var response_place_id of response.geocoded_waypoints){//responseのplace_idのみの配列を作る
                 response_place_ids.push(response_place_id.place_id)}
             // console.log(response_place_ids)


             ordered_places.length =0;
             var i = 0;
             var a =  response_place_ids.length-1

             var total_duration = 0;
             // console.log(a)
             for(var place_id of response_place_ids){//responseのplace_idをキーに検索して、planningPlacesのインデックスを調べる。
               var place_id_index = place_ids.indexOf(place_id)
               var current_place = planningPlaces[place_id_index]//indexOfで判明したインデックスを使って、該当の配列をplanningPlacesから取得する。
               current_place.distance=0;

               if(place_id_index != -1){//originとdistinationのindexは見つからず、-1でindexOfの結果が返ってくるため、それを除外する。
                 if(a!=0){//distinationで指定している最後の到着場所にはAPIから移動時間が返ってきていなくてエラーになる為、最後のplaceのみ処理から除外。
                   current_place.distance=0;
                   current_place.distance= Math.ceil(response.routes[0].legs[i].duration.value/60);//APIから帰ってきた移動時間を該当の配列のdistanceのkeyに代入する。
                   console.log("ok")
                   a=a-1;
                 }

                  total_duration = total_duration + current_place.staying + current_place.distance//これまでの場所のの滞在時間と移動時間の合計をtotal_durationに代入
                  current_place.start_time = total_duration
                  current_place.day=0
                  current_place.day=day


                   ordered_places.push(current_place)
                   console.log(total_duration)
                   i=i+1;

                 }
                 if(total_duration>=360){       //総計時間が360分を超える度に日程を一つ足していく
                       day++                    //TODO：ここで、ordered_placesを配列にしてplanningPlacesにpush  planningPlace.push([ordered_places])
                       total_duration=0         //TODO:そして、ordered_placesをクリーンにする
                     }
               }


              var hotels_locations=[]
              var last_activitis=[]
              var last_activitis_locations=[]
              var hotel_durations=[]
              for(var test of hotels){
                test.day=null}

              for(var date=1;date<=3;date++){
                hotel_durations=[]
                hotels_locations=[]
                for(var hotel of hotels){//place_idだけの配列を作成
                  if(hotel.day===null){
                hotels_locations.push(hotel.location)
              }
              }
              function get_daily_plan(date1){
              var daily_plan = ordered_places.filter(function(place){  //この処理が先行してしまい、以下の処理のdaily_planが全て最終版で行われてしまう。
                return place.day == date1;
              })
              console.log(daily_plan[daily_plan.length-1].location)
              return daily_plan[daily_plan.length-1].location
            }
              // console.log(daily_plan);

              // var last_activity = daily_plan[daily_plan.length-1]

            var distanceMatrixService = new google.maps.DistanceMatrixService();

            // var origins = [last_activity.location]
            // console.log(origins)
            // 到着点
            // var destinations = hotels_locations;
            hotel_durations=[]
            distanceMatrixService.getDistanceMatrix({
              	origins: [get_daily_plan(date)], // 出発地点
              	destinations: hotels_locations, // 到着地点
              	travelMode: google.maps.TravelMode.DRIVING, // 車モード or 徒歩モード
              }, function(response, status) {
              	if (status == google.maps.DistanceMatrixStatus.OK) {
                  console.log(response)

              		// 出発地点と到着地点の住所（配列）を取得
              		var origins = response.originAddresses;
              		var destinations = response.destinationAddresses;

              		// 出発地点でループ
              		for (var i=0; i<origins.length; i++) {
              			// 出発地点から到着地点への計算結果を取得
              			var results = response.rows[i].elements;

              			// 到着地点でループ
              			for (var j = 0; j<results.length; j++) {
              				var from = origins[i]; // 出発地点の住所
              				var to = destinations[j]; // 到着地点の住所
              				var duration = results[j].duration.value; // 時間
              				var distance = results[j].distance.value; // 距離
                      hotel_durations.push(duration)
              				console.log(from,  to, duration, distance);
              			}
                    console.log(hotel_durations);
                    var nearest_hotel = hotel_durations.indexOf(Math.min.apply(null,hotel_durations))
                    if(hotels[nearest_hotel].day===null){
                    hotels[nearest_hotel].day=null
                    // date++
                    hotels[nearest_hotel].day=date-1;
                    }
                    hotel_durations=[]
                    console.log(hotels[nearest_hotel]);
                    planningPlaces.length = 0
                    planningPlaces.push(...ordered_places)
              		}
              	}
              });
            }

             // planningPlaces.length = 0
             // planningPlaces.push(...ordered_places)

             console.log(planningPlaces)
           } else {
             window.alert('Directions request failed due to ' + status);
           }

         });
         // planningPlaces[planningPlaces.length-1].distance=0;
      }
      this.calc_percentage();

    },


    parentsMethod2: function(schedule){
      this.stay_nights=[];
      var date_calcrate = schedule[1]-schedule[0]
      var stay_nights = date_calcrate/86400000+1
      // console.log(stay_nights)

      for(var i=1;i<=stay_nights;i++){
        this.stay_nights.push({'id':i, 'day':i})
        this.stay_nights.sort()
      }

      console.log(this.stay_nights)
      this.calc_percentage();
    },


    }
}
</script>
