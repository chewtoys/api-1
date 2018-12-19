module.exports = {
  apps: [
    {
      name: "server",
      script: "./build/index.js",
      watch: ["build"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      output: "./logs/out.log",
      error: "./logs/error.log",
      log: "./logs/combined.outerr.log",
    },
  ],
  deploy: {
    production: {
      user: "laapl",
      host: "laapl.ru",
      ref: "origin/master",
      repo: "https://github.com/laapl/api.git",
      path: "/home/laapl/delivery/",
      "post-deploy": "yarn && yarn tsc && pm2 reload ecosystem.config.js --env production",
    },
  },
};
