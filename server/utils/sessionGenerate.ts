import Session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

const RedisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

const RedisStore = connectRedis(Session);

const session = Session({
  store: new RedisStore({
    client: RedisClient,
  }),
  secret: process.env.SESSION_SALT,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true },
});

export default session;
