const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-firebsae-auth-ex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js and Firebase Authentication Example Application' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic' },
      { rel: 'stylesheet', href: 'https://cdn.rawgit.com/necolas/normalize.css/master/normalize.css' },
      { rel: 'stylesheet', href: 'https://cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css' }
    ]
  },
  env: {
    FIREBASE: {
      API_KEY: 'AIzaSyApB_tw8EabiOtZ193fu4VazZbM00jlPBA',
      DATABASE_NAME: 'fire-tests',
      PROJECT_ID: 'fire-tests',
      SENDER_ID: '662037186260'
    }
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  // css: [
  //   '@/assets/styles/main.css'
  // ],
  build: {
    /*
    ** Run ESLint on save
    */
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (isDev) {
        config.resolve.alias['config'] = '~/config/development'
      } else {
        config.resolve.alias['config'] = '~/config/production'
      }
    }
  },

  plugins: [],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    debug: true,
    proxy: {
      'api': 'https://nuxt-fireauth-v5.now.sh'
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'davlaroykash',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000, secure: false }
    }),
    '~/api'
  ]
}
