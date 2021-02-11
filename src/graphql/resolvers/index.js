
const books = require('../data')
const resolvers = {
  Query: { books: () => books },
  Book: {
    sequels: (parent, args) => {
      const { minLength } = args
      const { sequels: parentSequels = [] } = parent
      if (minLength) return parentSequels.filter(sequel => sequel.pages >= minLength)
      else return parentSequels
    }
  }
}

module.exports = resolvers
