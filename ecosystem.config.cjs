module.exports = {
  apps: [
    {
      name: "SDGA",
      script: "./.output/server/index.mjs",
      env: {
        PORT: 5111,
        NITRO_PORT: 5111,
      },
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: ["102.130.116.19"],
      ref: "origin/main",
      repo: "git@github.com:Hardaker587/SDGA-V2.git",
      path: "/root/sdga",
      "post-deploy":
        "yarn && yarn run build && pm2 startOrRestart ecosystem.config.cjs --env production",
    },
  },
};
