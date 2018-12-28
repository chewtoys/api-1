import redis from 'redis';
import connectRedis from "connect-redis";
import session from "express-session";

const RedisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD
});

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({
    client: RedisClient
  }),
  secret: process.env.SESSION_SALT,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
});