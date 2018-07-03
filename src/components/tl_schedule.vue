<template>
  <div class="schedule-wrapper">
    <div class="block schedule-select">
          <el-date-picker
            v-model="schedule"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date" class="inine-block"
            @change='$emit("childs-event", schedule)'
            >
          </el-date-picker>
    </div>

    <div class="progress-bar">
          <el-progress :text-inside="true" :stroke-width="20" :percentage=percentage class="inline-block"></el-progress>

    </div>

  </div>
</template>

<script>

  export default {
    props: ['percentage'],
    data() {
      return {
        schedule: '',
        stay_nights: 0
      };
    },
    methods:{
      show: function(){
        var date_calcrate = this.schedule[1]-this.schedule[0]
        var stay_nights = date_calcrate/86400000
        console.log(stay_nights)
        console.log(this.schedule)

      }
    }
}
</script>

<style scoped>
.schedule-wrapper{
  padding-top:5px;
}

.schedule-select, .progress-bar{
  margin-bottom: 5px;
  height: 35px;
  line-height: 40px;
}

.el-progress{
  /* width: calc(100%-120px); */
    width: 100%;
  display: inline-block;
}

.inline-block{
  display: inline-block;
}

.schedule-label{
  height:40px;
  width:100px;
}






</style>
