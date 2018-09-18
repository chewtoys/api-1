module.exports = {
    apps: [{
        name: "app",
        script: "./build/index.js",
        watch: ["build", "static"],
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}