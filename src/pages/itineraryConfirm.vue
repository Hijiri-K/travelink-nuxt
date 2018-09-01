<template>
  <div class="itinerary-confirm-wrapper">
    <div class="itinerary-confirm__header">
      <h3>Your Plan</h3>
    </div>
    <div class="itinerary-confirm__contents">

    </div>
  </div>
</template>

<script>
import moment from 'moment';

  export default {
    // props: ['planningPlaces'],
    name:"tl_itinerary_confirm",
    data() {
      return {

      };
    },
    methods:{
    },
    mounted:function(){
      console.log(this.$route.params.planningPlaces);
    }
}
</script>

<style scoped>
.itinerary-confirm-wrapper{
  margin-top: 60px;
}
</style>
