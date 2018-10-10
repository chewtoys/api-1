module.exports = {
    apps: [
        {
            name: "kfc",
            script: "./build/index.js",
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
            user: "savin",
            host: "node3.ortant.ru",
            ref: "origin/master",
            repo: "https://github.com/laapl/api.git",
            path: "/home/projects/savin/delivery/kfc/",
            "post-deploy": "yarn install && tsc && yarn build:client && pm2 reload ecosystem.config.js --env production"
        }
    }
};