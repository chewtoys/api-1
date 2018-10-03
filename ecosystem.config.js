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
            'user': "savin",
            'host': "node3.ortant.ru",
            'ref': "origin/master",
            'repo': "https://github.com/laapl/kfc.git",
            'path': "/home/projects/savin/delivery/kfc/",
            // Pre-setup command or path to a script on your local machine
            // 'pre-setup': "ls -la",
            // Post-setup commands or path to a script on the host machine
            // eg: placing configurations in the shared dir etc
            // 'post-setup': "ls -la",
            // 'pre-deploy-local': "yarn build",
            // 'pre-deploy': "", 
            'post-deploy': "yarn install && tsc && node client/desktop/scripts/build.js && pm2 reload ecosystem.config.js --env production"
        }
    }
};