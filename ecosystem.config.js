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
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: "savin",
            host: "node3.ortant.ru",
            ref: "origin/master",
            repo: "https://github.com/laapl/kfc.git",
            path: "/home/projects/delivery/kfc/",
            "post-deploy":
                "yarn install && tsc && node client/desktop/scripts/start.js && pm2 reload ecosystem.config.js --env production"
        }
        // dev: {
        //     user: 'node',
        //     host: '212.83.163.1',
        //     ref: 'origin/master',
        //     repo: 'git@github.com:repo.git',
        //     path: '/var/www/development',
        //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
        //     env: {
        //         NODE_ENV: 'dev'
        //     }
        // }
    }
};