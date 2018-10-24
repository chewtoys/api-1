require('dotenv').config()
let redis = require('redis')

const RedisClient = redis.createClient({
    host: 'node3.ortant.ru',
    port: 6379,
    password: process.env.REDIS_PASSWORD
});