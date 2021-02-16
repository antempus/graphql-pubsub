const { AMQPPubSub } = require('graphql-amqp-subscriptions')
const container = require('rhea')

// const amqpConnection = container.connect({
//   username: 'sendlistendemo',
//   host: 'antempus-evh-namespace.servicebus.windows.net',
//   password: '+LeGS4ei3FWzRS45r1bvR814ce9Uq13i90oRIPhf82g=',
//   port: '5672',
//   reconnect: true,
//   transport: 'ssl'
// })

const amqpConnection = container.connect({
  username: 'eventHubConsumerGroup',
  host: 'antempus-evh-namespace.servicebus.windows.net',
  password: '2w//6kiIQGRu0mtZmHxmmqwAKWPvQ/LoYBxrbKab8aI=',
  port: '5672',
  transport: 'ssl',
  onerror: (error, ...args) => console.error(error)
})

const pubSub = new AMQPPubSub({
  connection: amqpConnection
})

module.exports = pubSub
