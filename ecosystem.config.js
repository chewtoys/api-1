module.exports = {
  apps: [
    {
      name: "server",
      script: "./build/server.js",
      watch: ["build", "static"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      output: "./logs/out.log",
      error: "./logs/error.log",
      log: "./logs/combined.outerr.log"
    },
    {
      name: "client",
      script: "./build/client.js",
      watch: ["build", "static"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      output: "./logs/out.log",
      error: "./logs/error.log",
      log: "./logs/combined.outerr.log"
    }
  ],
  deploy: {
    production: {
      user: "laapl",
      host: "laapl.ru",
      ref: "origin/master",
      repo: "https://github.com/laapl/api.git",
      path: "/home/laapl/delivery/",
      "post-deploy":
        "yarn && yarn tsc && yarn build:client && pm2 reload ecosystem.config.js --env production"
    }
  }
};
