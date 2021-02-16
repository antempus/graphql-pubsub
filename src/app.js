
const express = require('express')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const bodyParser = require('body-parser')
const cors = require('cors')
const { execute, subscribe } = require('graphql')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// Initialize the app
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use('/', (req, res) => res.sendStatus(200))

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected')
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    }
  },
  context: ({ req, connection }) => {
    if (connection) { // Operation is a Subscription
      // Obtain connectionParams-provided token from connection.context
      const token = connection.context.authorization || ''
      return { token }
    } else { // Operation is a Query/Mutation
      // Obtain header-provided token from req.headers
      const token = req.headers.authorization || ''
      return { token }
    }
  }
})
apolloServer.applyMiddleware({ app })

const server = createServer(app)
const subscriptionServer = new SubscriptionServer({
  execute,
  subscribe,
  schema: makeExecutableSchema({ typeDefs, resolvers })
}, {
  server: server,
  path: '/subscriptions',
  onConnect: (connectionParams, webSocket, context) => {
    console.log(connectionParams)
    console.log(webSocket)
    console.log(context)
  }
})
server.listen(PORT, () => subscriptionServer)
