<template>
<div class="header-wrapper">
  <router-link tag="span" class="header__logo" to="/top">Travelink</router-link>
  <ul class="header__menu">
    <!-- <li class="header__menu">about</li>
    <li class="header__menu">mypage</li> -->
  </ul>
</div>
</template>

<style scoped>
.header-wrapper{
  height:100%;
}

.header__logo{
  display: inline-block;
  color:#fff;
  font-size: 24px;
  height:100%;
  line-height: 40px;
  opacity: .9;
}

.header__menu{
  display: inline-block;
  font-size: 18px;
  height:100%;
  line-height: 40px;
  vertical-align: top;
}

.header__menu li{
margin: 0 10px;
}

ul{
  margin-bottom:0;
  margin-top: 0;
}



</style>
