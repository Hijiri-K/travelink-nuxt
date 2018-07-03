<!-- ここのファイルでコンポーネントをまとめると、変数の受け渡しに不便が生じるので、コンポーネントをplanning.jsで読み込む形式に変更 -->

<template>
  <div class="">
    <h1>Travelink</h1>
    <p>Travel cordinate app</p>
    <p>ここはtop画面なので、椎野よろしく。</p>
    <p>pages\top.vue</p>

    <div id="app">
        <router-link to="/planning">Go to planning</router-link>
    </div>

  </div>

</template>

<style>

</style>
<script>
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Planning from '../pages/planning.vue'
//
// // const Foo = { template: '<div>foo</div>' }
// // const Bar = { template: '<div>bar</div>' }
//
// // 2. ルートをいくつか定義します
// // 各ルートは 1 つのコンポーネントとマッピングされる必要があります。
// // このコンポーネントは実際の `Vue.extend()`、
// // またはコンポーネントオプションのオブジェクトでも構いません。
// // ネストされたルートに関しては後で説明します
// const routes = [
//   { path: '/planning', component: Planning },
// ]
//
// const router = new VueRouter({
//   routes // `routes: routes` の短縮表記
// })
//
// const app = new Vue({
//   router
// }).$mount('#app')

</script>
