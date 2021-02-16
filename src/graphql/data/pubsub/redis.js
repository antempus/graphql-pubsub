const { RedisPubSub } = require('graphql-redis-subscriptions')
const Redis = require('ioredis')
const { env: { REDIS_HOST: host, REDIS_PORT: port, REDIS_PASSWORD: password } } = process

const pubsub = new RedisPubSub({
  connection: {
    host,
    port,
    password
  },
  subscriber: new Redis(port, host, {
    password,
    retryStrategy: times => {
      // reconnect after
      return Math.min(times * 50, 2000)
    }
  })
})

module.exports = pubsub
