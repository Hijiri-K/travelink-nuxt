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
      <!-- <el-row class="hidden-sm-and-up">
        <el-col :span=24>
          <el-tabs class="smartphone-view"  v-model="activeName">
            <el-tab-pane label="Itinerary" name="itinerarySp">
              <tl-schedule v-bind:percentage="percentage" class="schedule-wrapper"></tl-schedule>
              <tl-itinerary ref="itinerary" v-bind:planningPlaces="planningPlaces" v-bind:planDays="planDays" @tabClick="changeTab"></tl-itinerary>
            </el-tab-pane>
            <el-tab-pane label="Edit"  name="editSp">
              <tl-schedule v-bind:percentage="percentage" class="schedule-wrapper"  @childs-event="parentsMethod2"></tl-schedule>
              <tl-itinerary-edit ref="itineraryEdit" v-bind:places="places" @childs-event="calculateRoute" class="itinerary-edit-wrapper"></tl-itinerary-edit>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <div id="switch-buttons">
          <div class="switch-button" v-on:click="activeName='itinerary', styleObject.transform='translateX(0)'">itinerary</div>
          <div class="switch-button" v-on:click="activeName='edit', styleObject.transform='translateX(100%)'">edit</div>
          <span id="active-bar" v-bind:style="styleObject"></span>
        </div>
      </el-row> -->

<!-- PC,iPad用 -->
      <el-row :gutter="20">
        <tl-schedule v-bind:percentage="percentage" @childs-event="calculateSchedule">
        </tl-schedule>

        <el-col :sm=12 :xs=24 id="itinerary-box">
          <div id="itinerary-btns-wrapper" class="hidden-xs-only">
            <el-checkbox　id="optimize-itinerary" v-model="optimizeItinerary" @change='clickOptimizeBtn' border>Optimize</el-checkbox>
            <span id="edit-itinerary-btn" @click='editItinerary'>Edit</span>
          </div>
          <tl-itinerary class="tl-itinerary" ref="itinerary" v-bind:planningPlaces="planningPlaces"　v-bind:planDays="planDays" @tabClick="changeTab" @editItinerary="editItinerary" @calculateRoute="calculateRoute" @setAlertMessage="setAlertMessage">
          </tl-itinerary>
        </el-col>

        <el-col :sm=12 :xs=24 id="itinerary-edit-box">
          <tl-itinerary-edit class="tl-itinerary-edit hidden-xs-only" ref="itineraryEdit" v-bind:places="places" @calculateRoute="calculateRoute" >
          </tl-itinerary-edit>
        </el-col>

        <div id="switch-buttons" class="hidden-sm-and-up">
          <div class="switch-button" @click="changeSpTab('itinerary'), styleObject.transform='translateX(0)'">itinerary</div>
          <div class="switch-button" @click="changeSpTab('itineraryEdit'), styleObject.transform='translateX(100%)'">edit</div>
          <span id="active-bar" v-bind:style="styleObject"></span>
        </div>
      </el-row>

    </el-main>
    <el-alert v-if="alertMessage != null " :title="alertMessage" type="warning">
</el-alert>
  </el-container>
</template>

<style>
/* 全体のレイアウト */
body{
  margin:0;
  /* background-color: #f8f8ff; */
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

#itinerary-box{
  position: fixed;
  height: calc(100%-250px);
  transition: width .3s;
}

#itinerary-edit-box{
  position: fixed;
  height: calc(100%-250px);
  left:50%;
  transition: left .3s;
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
.itinerary-edit-checkbox > .el-checkbox__label{
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

.el-range-editor{
  width:230px !important;
  margin-right: 10px;
}

.el-tab-pane{
  display: block !important;
  float:left !important;
  width:100%;
  height:100%;
  overflow-y: auto;
}

.el-tabs__content{
  transition: left .3s;
  margin-top:50px;
  height:calc(100% - 50px);
  width:100%;
}

.el-tabs{
  overflow-x:hidden !important;
  top:100px;
  height:100%;
}

.el-tabs__header {
  width: calc(50% - 170px);
  position: fixed;
  z-index: 10;
  background-color: #fff;
}

#itinerary-btns-wrapper{
  position:fixed;
  left:calc(50% - 170px);
  display: inline-block;
  height: 41px;
  width:195px;
  margin-left: 5px;
  background-color: white;
  z-index: 12;
  transition: left .3s;
}

#edit-itinerary-btn {
  display: inline-block;
  height:34.5px;
  width:50px;
  line-height: 31px;
  padding:0;
  margin: 2.5px;
  color: #fff;
  font-weight: 450;
  background-color: #409eff;
  border: 1px solid #409eff;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  transition: background-color .4s;
}

#optimize-itinerary{
  padding:3px 5px 3px 5px;
  height:35px;
  margin: 2.5px;
  margin-left: 7px;
  line-height: 26px;
}

.el-checkbox__label{
  padding-left:4px;
}

.el-alert{
  position: fixed !important;
  bottom:8px !important;
  left:20px;
  width:calc(100%-40px);
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


var windowWidth = 768;
/**
 * 観光地の選択肢の配列（BD化）
 * @type {Array}
 */
var places = [{ id:1, place_id:"ChIJoa3m8WSfRjUReaWY4_9UohE", type:'place',title: '別府駅', group: '駅', staying:30, discription: '別府駅です。', price: 120, currency:"$", location:{lat:33.233358, lng:131.606644}, default: true},
              { id:2, place_id: "ChIJ3xRR5tmtRjURfacmU4XGHvQ", type:'place', title: '湯布院', group: '食べ歩き', staying:180, discription: '豊後富士と呼ばれる美しい由布岳の山麓に広がり、全国2位の湯量を誇る人気温泉地。', price: 60, currency:"$", location:{lat:33.262623,lng:131.357272}, default: true},
              { id:3, place_id:"ChIJs3-vWz6hRjUR3g9LwnSoWRo", type:'place', title: 'うみたまご', group: '水族館', staying:60, discription: '海の生き物とふれあえるテーマパークです。', price: 30, currency:"$", location:{lat:33.258607,lng:131.535934}, default: false},
              { id:4, place_id:"ChIJg03qY32uRjURMT_ayA1n4yE", type:'place', title: '金鱗湖', group: '湖', staying:120, discription: '大分川の源流のひとつであり、この池に朝霧がかかる風景は由布院温泉を代表する景観となっている。', price: 30, currency:"$", location:{lat:33.266685, lng:131.369048}, default: true},
              { id:5, place_id:"ChIJxWpZw0OvRjUReEV7lBzqj2k", type:'place', title: '城島高原パーク', group: '宿', staying:180, discription: '国内初の木製ジェット コースターと季節限定の屋外スケートリンクがある遊園地。', price: 120, currency:"$", location:{lat:33.266971,lng:131.426408}, default: false},
              ]
/**
 * ホテルの選択肢の配列（BD化）
 * @type {Array}
 */
var hotels = [{ id:1, place_id:"ChIJO3FL6menRjURgLiDwXzEebU", type:'hotel', title: '潮騒の宿　晴海', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.317766, lng: 131.500177}},
              { id:2, place_id:"ChIJvSfzzN2mRjURvtYsFM2Hs8w", type:'hotel', title: '山田別荘', group: '宿', staying:0, discription: '晴海で世界最高峰のサービスを体験。', price: 120, currency:"$", location:{lat:33.282059, lng: 131.503630}},
              { id:3, place_id:"ChIJE7scRFymRjURjxfcE67NO80", type:'hotel', title: '杉乃井ホテル', group: '温泉', staying:0, discription: '別府温泉郷・観海寺温泉の高台に位置する、３世代で楽しめる温泉リゾートホテルです。', price: 120, currency:"$", location:{lat:33.283696,lng:131.475077}},
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
 * 各日程の最初の行先の配列
 * @type {Array}
 */
var dailyFirstPlaces = [];

/**
 * 各日程の最後の行先の配列
 * @type {Array}
 */
var dailyLastPlaces = [];


/**
 * 引数が無しの場合用の選択行先配列
 * @type {Array}
 */
var altSelectedPlaces = [];

/**
 * mapの初期設定を格納するオブジェクト
 * @type {Object}
 */
var map;

const DAILY_MAX_TOTAL_TIME = 240;

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
          styleObject: {transform: 'translateX(0)'},
          editItineraryBtn:false,
          optimizeItinerary:true,
          alertMessage:null
      }
    },
    methods: {
      /**
       * 最適ルートを算出するメソッド
       * @param  {Array} selectedPlaces [description]
       */
      calculateRoute: function(selectedPlaces, numsOfDailyPlaces) {
        altSelectedPlaces = selectedPlaces;　
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
            optimizeWaypoints: this.optimizeItinerary
          },

          function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              directionsDisplay.setMap(map);

              //for文の制御用変数
              var i = 0;
              var a = response.geocoded_waypoints.length - 1;
              var totalDuration = 0;
              var durationBetweenPlaces;
              var numOfDailyPlacesIndex = 0;
              var i2 = 1;

              //responseのplace_idをキーに検索して、planningPlacesのインデックスを調べる。
              for (var place_id of response.geocoded_waypoints) {
                var place_idIndex = selectedPlacesPlace_ids.indexOf(place_id.place_id)
                durationBetweenPlaces = 0;

                if (place_idIndex != -1) {

                  if (a != 0) { //執着地点には移動時間がないため排除
                    durationBetweenPlaces = Math.round(response.routes[0].legs[i].duration.value / 60);
                    a -= 1;
                  }

                var durationId = i + 200; //IDが被らないように
                totalDuration = totalDuration + selectedPlaces[place_idIndex].staying + durationBetweenPlaces;
                dailyPlanningPlaces.push(selectedPlaces[place_idIndex]);

                if (durationBetweenPlaces != 0) {
                  dailyPlanningPlaces.push({id: durationId, duration: durationBetweenPlaces, startTime: totalDuration})
                }

                //numsOfDailyPlacesがundefinedの場合（itineraryのcalcurateRouteAfterDragging以外から呼び出された場合）
                if (numsOfDailyPlaces == undefined) {

                  if(totalDuration >= DAILY_MAX_TOTAL_TIME || i == selectedPlaces.length - 1){
                    planningPlaces.push(dailyPlanningPlaces);
                    // if (i =! 1){ //初日の最初の場所は不要なため
                      dailyFirstPlaces.push(dailyPlanningPlaces[0])
                    // }

                    if (i != selectedPlaces.length - 1 ){ //最終日にはホテルが不要なため（バグ対策でもある）
                      dailyLastPlaces.push(dailyPlanningPlaces[dailyPlanningPlaces.length - 2]);
                    }

                    dailyPlanningPlaces = [];
                    totalDuration = 0;
                  }

                } else {
                  var numOfDailyPlaces = numsOfDailyPlaces[numOfDailyPlacesIndex];
                  console.log("numOfDailyPlaces: " + numOfDailyPlaces);
                    if (numOfDailyPlaces == i2 || i == selectedPlaces.length - 1 ) {
                      planningPlaces.push(dailyPlanningPlaces);
                      dailyPlanningPlaces = [];
                      numOfDailyPlacesIndex++;
                      console.log("push");
                      i2 = 0;
                    }
                }
                i += 1;
                i2 += 1;
                }
              }

            if (numsOfDailyPlaces == undefined) {

            //最短距離のホテルの検索
            // DistanceMatrix サービスを生成
            var distanceMatrixService = new google.maps.DistanceMatrixService();

            /**
             * 各日程の最初の行先の緯度経度の配列
             * @type {Array}
             */
            var dailyFirstPlacesLocations = [];

            /**
             * 各日程の最後の行先の緯度経度の配列
             * @type {Array}
             */
            var dailyLastPlacesLocations = [];

            /**
             * ホテルの緯度経度の配列
             * @type {Array}
             */
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

            // 出発点
            var origns = dailyLastPlacesLocations.concat(dailyFirstPlacesLocations); //最終行先の配列に最初行先の配列を追加

            // 到着点
            var destinations = hotelsLocations;

            // DistanceMatrix の実行
            distanceMatrixService.getDistanceMatrix({
            	origins: origns, // 出発地点
            	destinations: destinations, // 到着地点
            	travelMode: google.maps.TravelMode.DRIVING, // 車モード or 徒歩モード
            }, function(response, status) {
            	if (status == google.maps.DistanceMatrixStatus.OK) {

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
            				var duration = Math.round(results[j].duration.value / 60); // 時間
            				var distance = results[j].distance.value; // 距離
                    lastPlaceToHotelDurations.push(duration)
            			}

                  //一番近いホテルの取得
                  var nearestHotelIndex = lastPlaceToHotelDurations.indexOf(Math.min.apply(null,lastPlaceToHotelDurations))
                  var nearestHotel = hotels[nearestHotelIndex];

                  //宿泊先とそこまでの移動時間を追加
                  var deletedDuration = planningPlaces[i].pop();
                  planningPlaces[i].push({id: deletedDuration.id, duration:lastPlaceToHotelDurations[nearestHotelIndex] , startTime: deletedDuration.startTime - deletedDuration.duration + lastPlaceToHotelDurations[nearestHotelIndex]});
                  planningPlaces[i].push(nearestHotel);

                  //宿泊の次の日の予定の最初にホテルと移動時間を追加
                  var hotelToFirstPlaceDuration =  Math.round(response.rows[i + origins.length / 2].elements[nearestHotelIndex].duration.value / 60);
                  planningPlaces[i + 1].unshift({id: deletedDuration.id + 100, duration:hotelToFirstPlaceDuration , startTime:hotelToFirstPlaceDuration});//IDが被らないように100を足す
                  planningPlaces[i + 1].unshift(nearestHotel);

                  //最初にホテルを追加したことによるタイムラインのずれを修正
                  if (planningPlaces[i + 1].length >= 5){
                    for (var i2 = 3; i2 < planningPlaces[i + 1].length; i2 += 2){
                    planningPlaces[i + 1][i2].startTime += hotelToFirstPlaceDuration;
                    }
                  }
            		}
            	}
            });

          }//テスト用

          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      // console.log(this.planningPlaces)
      // this.$refs.itinerary.durationCardsStyle.display = 'block';
      this.calcPercentage();
      // }
    },

    /**
     * 旅行の日数を配列に入れるメソッド
     * @param  {Array} schedule [description]
     */
    calculateSchedule: function(schedule){
      console.log("called");
      this.planDays = [];
      var date_calculate = schedule[1] - schedule[0];
      var planDays = date_calculate / 86400000 + 1; //秒から日に変換
      for(var i = 1; i <= planDays; i++){
        this.planDays.push({'id':i, 'day':i});
        this.planDays.sort();
      }
    // this.changeTab();
    this.calcPercentage();
    },

    /**
     * パーセンテージの計算をおこなうメソッド
     *
     */
    calcPercentage: function(){
      //選択された地点の合計時間の占有割合を算出
      this.percentage = 0; //時間の割合をリセット
      var totalTime = 0; //合計時間をリセット
      for (var place of altSelectedPlaces) {
        var staying = place['staying'];
        var stayNights = this.planDays.length;
        var maxTime = DAILY_MAX_TOTAL_TIME * stayNights;
        totalTime += staying;
        this.percentage = Math.round(totalTime / maxTime * 100);
      }
      if (this.percentage > 100) {
        this.setAlertMessage("Too many schedules. Please add more days.")
      }
    },

    changeTab: function(){
      var tabIndex = this.$refs.itinerary.tabIndex;
      var elTabs = document.getElementsByClassName("el-tabs__content");
      // var widthDevide = 2;
      // if (windowWidth < 768) {
      //   widthDevide = 1;
      // }
      var elTabPane = document.getElementsByClassName("el-tab-pane tlItinerary");
      //日数で必要なwidthを計算
      // var elTabPaneWidth = (windowWidth / widthDevide - 20) + "px";
      var elTabPaneWidth = 100 / this.planDays.length + "%";
      for (var i = 0; i <= this.planDays.length - 1; i++ ) {
        elTabPane[i].style.width =  elTabPaneWidth;
      }

      var elTabsLeftPx = tabIndex * -100 + '%'
      elTabs[0].style.width =  100 * this.planDays.length  + "%" ;
      elTabs[0].style.left = elTabsLeftPx;
      },

    changeSpTab:function(tabName){
      var itineraryBox = document.getElementById("itinerary-box");
      var itineraryEditBox = document.getElementById("itinerary-edit-box");
      if (tabName == "itinerary"){
        itineraryBox.style.display = "block"
        itineraryEditBox.style.display = "none"
      } else if (tabName == "itineraryEdit") {
        itineraryBox.style.display = "none"
        itineraryEditBox.style.display = "block"
      }
    },
    editItinerary: function(){
      var itineraryBox = document.getElementById("itinerary-box");
      var itineraryEditBox = document.getElementById("itinerary-edit-box");
      var elTabsHeader = document.getElementsByClassName("el-tabs__header");
      var editItineraryBtn = document.getElementById("edit-itinerary-btn");
      var itineraryBtnsWrapper = document.getElementById("itinerary-btns-wrapper");

      console.log(elTabsHeader);

      if (this.editItineraryBtn == false) {
        console.log("edit");
        itineraryEditBox.style.left = "100%";
        itineraryBox.style.width = "100%";
        elTabsHeader[0].style.width = "calc(100% - 170px)";
        itineraryBtnsWrapper.style.left = "calc(100% - 170px)";
        editItineraryBtn.style.backgroundColor =  "#f56c6c";
        editItineraryBtn.style.border =  "solid 1px #f56c6c";
        editItineraryBtn.textContent = "close";
        this.editItineraryBtn = true;
        this.optimizeItinerary = false;
        this.$refs.itinerary.draggableOptions.disabled = false;
        this.$refs.itinerary.disableTrandition = true;
      } else {
        console.log("close");
        itineraryEditBox.style.left = "50%"
        itineraryBox.style.width = "50%"
        elTabsHeader[0].style.width = "calc(50% - 170px)";
        itineraryBtnsWrapper.style.left = "calc(50% - 170px)";
        editItineraryBtn.style.backgroundColor =  "#409eff";
        editItineraryBtn.style.border =  "solid 1px #409eff";
        editItineraryBtn.textContent = "edit";
        this.editItineraryBtn = false;
        this.$refs.itinerary.draggableOptions.disabled = true;
        this.$refs.itinerary.disableTrandition = false;
      }
    },
    setAlertMessage: function(message) {
      this.alertMessage = message;
      setTimeout(this.removeAlertMessage,3000)
    },
    removeAlertMessage: function(){
      this.alertMessage = null;
    },
    clickOptimizeBtn: function(){
      if (this.optimizeItinerary == true) {
        this.calculateRoute(this.$refs.itineraryEdit.selectedPlaces);
      }
    }
  },

  mounted: function(){
    console.log("mounted");
    this.calculateRoute(this.$refs.itineraryEdit.selectedPlaces, false)
  },

  beforeMount: function(){
    console.log("boforeMount");
  },
  beforeDestroy: function () {

 }
}
</script>
