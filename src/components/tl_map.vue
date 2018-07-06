<template>
  <div class="map-container" id="map">
    here will be map area
    <div id="map"></div>

  </div>

</template>
<style scoped>
  .map-container{
    background-color: #FCDDBC;
    height:150px;
  }
</style>

<script>
import axios from 'axios'
var map;


export default {
  props: ['planningPlaces'],
  data() {
    return {
       info: null
    };
  },

  methods:{

      initMap: function() {
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          // var myLatLng ={lat: 33.233358, lng: 131.606644};

          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 33.233358, lng: 131.606644}
            // zoom: 8
          });
          console.log(this.planningPlaces)
          // directionsDisplay.setMap(map);

          this.calculateAndDisplayRoute(directionsService, directionsDisplay)
        },

      calculateAndDisplayRoute: function(directionsService, directionsDisplay) {
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({
              // suppressMarkers: true
          });

          var spots =[];
          // console.log(spots);
          var ordered_places=[];
          // var place_ids=[];
          // var response_place_ids=[];

          // for (var test of this.planningPlaces){//place_idだけの配列を作成
          //     place_ids.push(test.place_id)}


          for (var planningPlace of this.planningPlaces){
              spots.push({
              location: planningPlace.location,
              stopover: true
            })}
            if(spots.length!=0){
            var origin = spots[0].location;
            // var destination = spots[0].location;//最初に選択した場所に帰ってくるルート
            var destination = spots[spots.length-1].location;


          directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
          // waypoints: spots.slice(1//最初に選択した場所に帰ってくるルート),
            waypoints: spots.slice(1,spots.length-1),
            optimizeWaypoints: true
          }, function(response, status) {
            if (status === 'OK') {

              directionsDisplay.setDirections(response);




              // for (var response_place_id of response.geocoded_waypoints){//responseのplace_idのみの配列を作る
              //     response_place_ids.push(response_place_id.place_id)}
              // console.log(response_place_ids)
              // ordered_places.length =0;
              //
              // for(var place_id of response_place_ids){//responseのplace_idをキーに検索して、planningPlacesのインデックスを調べる。
              //   var place_id_index = place_ids.indexOf(place_id)
              //   // console.log(place_id_index)
              //   if(place_id_index != -1){
              //   ordered_places.push(this.planningPlaces[place_id_index])
              //   // console.log(ordered_places)
              // }else{
              //
              // }
              //
              // }

              // for(var i of spots ){
              var marker = new google.maps.Marker({
                position: origin ,
                map: map,
                title: 'Start!'
              })
            // };

            // // for(var i of ordered_places ){
            // var marker = new google.maps.Marker({
            //   position: ordered_places.location ,
            //   map: map,
            //   title: 'Start!'
            // })
          // };

              console.log(response)
              // console.log(response)
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
          directionsDisplay.setMap(map);
        }
        }
      },

  mounted: function () {
    this.initMap();
  }

}



</script>
