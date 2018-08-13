module.exports = {
  /*
  ** Headers of the page
  */
  // mode:"spa",

  head: {
    title: 'travelink',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'travel cordinate app' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAyhGYfqVCJlu4nw3oBC8BQgHgUdpKyoLs' },
      { src: "https://togetherjs.com/togetherjs-min.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"},
      { src: "https://cdn.jsdelivr.net/npm/sortablejs@1.7.0/Sortable.min.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.16.0/vuedraggable.min.js"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },//kokokara


  modules: [
    '@nuxtjs/pwa'
  ],
  manifest: {
    name: 'travelink',
    lang: 'ja'
  },
  build: {
    vendor: ['element-ui']
  },
  plugins: [
    '~plugins/element-ui'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css'
  ]


};
