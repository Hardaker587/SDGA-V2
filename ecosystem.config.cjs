module.exports = {
  apps: [
    {
      name: 'SDGA',
      script: './.output/server/index.mjs',
      env: {
        PORT: 5111,
        NITRO_PORT: 5111,
        FIREBASE_API_KEY: 'AIzaSyDsQcXzjkGjOmASG0660I-jKjb-7_cDLZU',
        FIREBASE_AUTH_DOMAIN: 'sdga-ce4cd.firebaseapp.com',
        FIREBASE_DATABASE_URL: 'https://sdga-ce4cd.firebaseio.com',
        FIREBASE_PROJECT_ID: 'sdga-ce4cd',
        FIREBASE_STORAGE_BUCKET: 'sdga-ce4cd.appspot.com',
        FIREBASE_MESSAGING_SENDER_ID: '269949292227',
        FIREBASE_APP_ID: '1:269949292227:web:93cf43a7b6df092559dc76',
        FIREBASE_MEASUREMENT_ID: 'G-07E7BVZ9R6',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['102.130.116.19'],
      ref: 'origin/main',
      repo: 'git@github.com:Hardaker587/SDGA-V2.git',
      path: '/root/sdga',
      'post-deploy':
        'yarn && yarn run build && pm2 startOrRestart ecosystem.config.cjs --env production',
    },
  },
}
