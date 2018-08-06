<template>
  <div class="schedule-wrapper">
    <div class="block schedule-select">
          <el-date-picker
            v-model="schedule"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date" class="inine-block"
            :clearable=clearable
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
import moment from 'moment';

  export default {
    props: ['percentage'],
    data() {
      return {
        schedule: [moment().add(7, 'days'),moment().add(9, 'days')],
        clearable:false
      };
    },
    methods:{
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
