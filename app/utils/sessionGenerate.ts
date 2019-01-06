import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

const RedisClient = redis.createClient({
  host: "localhost",
  port: 6379
});

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({
    client: RedisClient,
  }),
  secret: process.env.SESSION_SALT,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true },
});