
const { books, pubSub: { redis, servicebus } } = require('../data')
const { withFilter } = require('graphql-subscriptions')
const { env: { SB_TOPIC, SB_SUBSCRIPTION } } = process
const commentAddedResolver = function (payload, args) {
  console.log(payload)
  return payload
}

const commentAddedSubscribe = function (_, args) {
  console.log(_)
  return redis.asyncIterator('comment')
}

const resolvers = {
  Query: { books: () => books },
  Book: {
    sequels: (parent, args) => {
      const { minLength } = args
      const { sequels: parentSequels = [] } = parent
      if (minLength) return parentSequels.filter(sequel => sequel.pages >= minLength)
      else return parentSequels
    }
  },
  Mutation: {
    addBook: async (parent, args) => {
      const { book } = args
      books.push(book)
      await redis.publish('bookAdded', { bookAdded: book })
      return book
    }
  },
  Subscription: {
    bookAdded: {
      resolve: (payload, args) => {
        const { bookAdded } = payload
        if (bookAdded.id === args.id) return bookAdded
      },
      subscribe: withFilter(() => redis.asyncIterator('bookAdded'), (payload, variables) => {
        return payload.bookAdded.id === variables.id
      })
    },
    commentRedis: {
      resolve: commentAddedResolver,
      subscribe: commentAddedSubscribe
    },
    commentEventGrid: {
      resolve: ({ body }, args) => {
        const payload = body.toString()
        return payload
      },
      subscribe: (_, args) => servicebus.createReceiver(SB_TOPIC, SB_SUBSCRIPTION).getMessageIterator()
    }
  }
}

module.exports = resolvers
