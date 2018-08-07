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
              <tl-itinerary v-bind:planningPlaces="planningPlaces" v-bind:planDays="planDays"></tl-itinerary>
            </el-tab-pane>
            <el-tab-pane label="Edit"  name="edit">
              <tl-schedule v-bind:percentage="percentage" class="schedule-wrapper"  @childs-event="parentsMethod2"></tl-schedule>
              <tl-itinerary-edit ref="itineraryEdit" v-bind:places="places" @childs-event="parentsMethod" class="itinerary-edit-wrapper"></tl-itinerary-edit>
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
            <tl-itinerary ref="itinerary" v-bind:planningPlaces="planningPlaces"　v-bind:planDays="planDays"></tl-itinerary>
        </el-col>
        <el-col :span=12 id="itinerary-edit-box">
          <tl-schedule v-bind:percentage="percentage" @childs-event="parentsMethod2"></tl-schedule>
          <tl-itinerary-edit ref="itineraryEdit" v-bind:places="places" @childs-event="parentsMethod" class="itinerary-edit-wrapper"></tl-itinerary-edit>
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
  height:30px !important;
  vertical-align: top !important;
  line-height: 30px !important;
}

.el-input__prefix, .el-input__suffix, .el-input__icon{
  height:30px !important;
  line-height: 30px !important;
}

.el-input__icon{
  height:30px !important;
  line-height: 30px !important;
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


/**
 * 観光地の選択肢の配列（BD化）
 * @type {Array}
 */
var places = [{ id:1, place_id:"ChIJoa3m8WSfRjUReaWY4_9UohE", title: '別府駅', group: '駅', staying:30, discription: '別府駅です。', price: 120, currency:"$", location:{lat:33.233358, lng:131.606644}, default: true},
              { id:2, place_id: "ChIJ3xRR5tmtRjURfacmU4XGHvQ", title: '湯布院', group: '食べ歩き', staying:180, discription: '豊後富士と呼ばれる美しい由布岳の山麓に広がり、全国2位の湯量を誇る人気温泉地。', price: 60, currency:"$", location:{lat:33.262623,lng:131.357272}, default: true},
              { id:3, place_id:"ChIJs3-vWz6hRjUR3g9LwnSoWRo", title: 'うみたまご', group: '水族館', staying:60, discription: '海の生き物とふれあえるテーマパークです。', price: 30, currency:"$", location:{lat:33.258607,lng:131.535934}, default: false},
              { id:4, place_id:"ChIJg03qY32uRjURMT_ayA1n4yE", title: '金鱗湖', group: '湖', staying:120, discription: '大分川の源流のひとつであり、この池に朝霧がかかる風景は由布院温泉を代表する景観となっている。', price: 30, currency:"$", location:{lat:33.266685, lng:131.369048}, default: true},
              { id:5, place_id:"ChIJxWpZw0OvRjUReEV7lBzqj2k", title: '城島高原パーク', group: '宿', staying:240, discription: '国内初の木製ジェット コースターと季節限定の屋外スケートリンクがある遊園地。', price: 120, currency:"$", location:{lat:33.266971,lng:131.426408}, default: false},
              ]
/**
 * ホテルの選択肢の配列（BD化）
 * @type {Array}
 */
var hotels = [{ id:1, place_id:"ChIJO3FL6menRjURgLiDwXzEebU", title: '潮騒の宿　晴海', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.317766, lng: 131.500177}},
              { id:2, place_id:"ChIJvSfzzN2mRjURvtYsFM2Hs8w", title: '山田別荘', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.282059, lng: 131.503630}},
              { id:3, place_id:"ChIJE7scRFymRjURjxfcE67NO80", title: '杉乃井ホテル', group: '温泉', staying:0, discription: '別府温泉郷・観海寺温泉の高台に位置する、３世代で楽しめる温泉リゾートホテルです。', price: 120, currency:"$", location:{lat:33.283696,lng:131.475077}},
              ]

/**
 * googlemapAPIで並び替えられた行先の配列
 * @type {Array}
 */
var planningPlaces = [];

/**
 * googlemapAPIで並び替えられた一日分の行先の配列
 * @type {Array}
 */
var dailyPlanningPlaces = [];

/**
 * googlemapAPIで並び替えられた一日分の行先の配列
 * @type {Array}
 */
var dailyLastPlaces = [];

var dailyFirstPlaces = [];

/**
 * タイムラインを表示するための総計時間の変数
 * @type {integer}
 */
var totalTime = 0

/**
 * mapの初期設定を格納するオブジェクト
 * @type {Object}
 */
var map;

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
            planningPlaces:planningPlaces,
            places:places,
            activeName:'itinerary',
            planDays:[{id:1,day:1},{id:2,day:2},{id:3,day:3}],
            styleObject: {transform: 'translateX(0)'}
        }
    },
    methods: {
      /**
       * 最適ルートを算出するメソッド
       * @param  {Array} selectedPlaces [description]
       */
      parentsMethod: function(selectedPlaces) {
        planningPlaces.length = 0 //選択地点のリセット
        dailyLastPlaces.length = 0
        dailyFirstPlaces.length = 0

        //googlemapAPIの読み込み
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.233358, lng: 131.606644}
        });

       /**
        * waypoints(中継地点)のlocations(緯度経度)の配列
        * @type {Array}
        */
        var selectedPlacesLocations = [];

       /**
        *  waypoints(中継地点)のplace_idの配列
        * @type {Array}
        */
        var selectedPlacesPlace_ids = [];

        // waypoints(中継地点)のlocations(緯度経度)の配列を作成
        for (var selectedPlace of selectedPlaces){
          selectedPlacesLocations.push({
          location: selectedPlace.location,
          stopover: true
        })}

         //place_idだけの配列を作成
        for (var selectedPlace of selectedPlaces){
          selectedPlacesPlace_ids.push(selectedPlace.place_id)};

        //googlemapAPIで最適ルートの算出
        if (selectedPlacesLocations.length != 0) {
          var origin = selectedPlacesLocations[0].location;
          // var destination = selectedPlacesLocations[0].location;//最初に選択した場所に帰ってくるルート
          var destination = selectedPlacesLocations[selectedPlacesLocations.length - 1].location;//最後に選択した場所に帰ってくるルート

          //ルートの検索
          directionsService.route({
            origin:origin,
            destination:destination,
            travelMode: 'DRIVING',
            // waypoints: selectedPlacesLocations.slice(1),//最初に選択した場所に帰ってくるルート
            waypoints: selectedPlacesLocations.slice(1, selectedPlacesLocations.length - 1),//最後に選択した場所に帰ってくるルート
            optimizeWaypoints: true
          },

          function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              directionsDisplay.setMap(map);
              console.log(response);

              //for文の制御用変数
              var i = 0;
              var a = response.geocoded_waypoints.length - 1;
              var totalDuration = 0;
              var durationBetweenPlaces;

              //responseのplace_idをキーに検索して、planningPlacesのインデックスを調べる。
              for (var place_id of response.geocoded_waypoints) {
                var place_idIndex = selectedPlacesPlace_ids.indexOf(place_id.place_id)
                selectedPlaces[place_idIndex].distance = 0;
                durationBetweenPlaces = 0;

                if (place_idIndex != -1) {

                  if (a != 0) { //執着地点には移動時間がないため排除
                    durationBetweenPlaces = Math.ceil(response.routes[0].legs[i].duration.value / 60);
                    a -= 1;
                  }

                console.log(durationBetweenPlaces);
                var durationId = i + 10;
                totalDuration = totalDuration + selectedPlaces[place_idIndex].staying + durationBetweenPlaces;
                dailyPlanningPlaces.push(selectedPlaces[place_idIndex]);

                if (durationBetweenPlaces != 0) {
                  dailyPlanningPlaces.push({id: durationId, duration: durationBetweenPlaces, startTime: totalDuration})
                }

                if(totalDuration >= 240 || i == selectedPlaces.length - 1){
                  planningPlaces.push(dailyPlanningPlaces);
                  // if (i =! 1){ //初日の最初の場所は不要なため
                    dailyFirstPlaces.push(dailyPlanningPlaces[0])
                  // }

                  if (i != selectedPlaces.length - 1 ){ //最終日にはホテルが不要なため（バグ対策でもある）
                    dailyLastPlaces.push(dailyPlanningPlaces[dailyPlanningPlaces.length - 2]);
                  }
                  console.log(dailyLastPlaces);
                  console.log(dailyFirstPlaces);

                  dailyPlanningPlaces = [];
                  totalDuration = 0;
                }
                i += 1;
                }
              }


            //最短距離のホテルの検索
            // DistanceMatrix サービスを生成
            var distanceMatrixService = new google.maps.DistanceMatrixService();

            var dailyLastPlacesLocations = [];

            var dailyFirstPlacesLocations = [];

            var hotelsLocations = [];

            for (var dailyLastPlace of dailyLastPlaces){
              dailyLastPlacesLocations.push(dailyLastPlace.location);
            }

            if(dailyFirstPlaces.length != 0){
              dailyFirstPlaces.shift(); //初日の場所を削除
            }
            for (var dailyFirstPlace of dailyFirstPlaces){
              dailyFirstPlacesLocations.push(dailyFirstPlace.location);
            }

            for (var hotel of hotels){
              hotelsLocations.push(hotel.location);
            }

            console.log(dailyLastPlacesLocations);
            console.log(dailyFirstPlacesLocations);

            // 出発点
            var origns = dailyLastPlacesLocations.concat(dailyFirstPlacesLocations);
            console.log(origns);
            // 到着点
            var destinations = hotelsLocations;

            // DistanceMatrix の実行
            distanceMatrixService.getDistanceMatrix({
            	origins: origns, // 出発地点
            	destinations: destinations, // 到着地点
            	travelMode: google.maps.TravelMode.DRIVING, // 車モード or 徒歩モード
            }, function(response, status) {
            	if (status == google.maps.DistanceMatrixStatus.OK) {
                console.log(response);

            		// 出発地点と到着地点の住所（配列）を取得
            		var origins = response.originAddresses;
            		var destinations = response.destinationAddresses;

            		// 出発地点でループ
            		for (var i=0; i<origins.length / 2; i++) {
                  var lastPlaceToHotelDurations = [];

            			// 出発地点から到着地点への計算結果を取得
            			var results = response.rows[i].elements;

            			// 到着地点でループ
            			for (var j = 0; j<results.length; j++) {
            				// var from = dailyLastPlaces[i].title; // 出発地点の住所
            				// var to = hotels[j].title; // 到着地点の住所
            				var duration = Math.ceil(results[j].duration.value / 60); // 時間
            				var distance = results[j].distance.value; // 距離
                    lastPlaceToHotelDurations.push(duration)
            				// console.log(from,  to, duration, distance);
            			}
                  console.log(lastPlaceToHotelDurations);

                  var nearestHotelIndex = lastPlaceToHotelDurations.indexOf(Math.min.apply(null,lastPlaceToHotelDurations))
                  var nearestHotel = hotels[nearestHotelIndex];
                  console.log(nearestHotel.title);

                  var deletedDuration = planningPlaces[i].pop();
                  console.log("hey", deletedDuration);
                  planningPlaces[i].push({id: deletedDuration.id, duration:lastPlaceToHotelDurations[nearestHotelIndex] , startTime: deletedDuration.startTime});
                  planningPlaces[i].push(nearestHotel);
                  // if (i == 0) {
                    // var hotelToFirstPlaceDuration =  Math.ceil(response.rows[1].elements[nearestHotelIndex].duration.value / 60)
                  // } else {
                    var hotelToFirstPlaceDuration =  Math.ceil(response.rows[i + origins.length / 2].elements[nearestHotelIndex].duration.value / 60)
                  // }
                  planningPlaces[i + 1].unshift({id: deletedDuration.id + 100, duration:hotelToFirstPlaceDuration , startTime:hotelToFirstPlaceDuration});
                  planningPlaces[i + 1].unshift(nearestHotel);
            		}
            	}
            });

            console.log(planningPlaces);
          } else {
            window.alert('Directions request failed due to ' + status);
          }

        });
      }

      this.percentage = 0; //時間の割合をリセット
      totalTime = 0; //合計時間をリセット

      //選択された地点の合計時間の占有割合を算出
      for (var place of selectedPlaces) {
        var staying = place['staying'] + place['distance'];
        totalTime += staying;
        this.percentage = Math.round(totalTime / 480 * 100);
      }
    },

    parentsMethod2: function(schedule){
      this.planDays = [];
      var date_calculate = schedule[1] - schedule[0];
      var planDays = date_calculate / 86400000 + 1;

      for(var i = 1; i <= planDays; i++){
        this.planDays.push({'id':i, 'day':i});
        this.planDays.sort();
      }
      console.log(this.planDays);
    }
  },
  mounted: function(){
    this.parentsMethod(this.$refs.itineraryEdit.selectedPlaces)
  }
}
</script>
