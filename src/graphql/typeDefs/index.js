const typeDefs = `
  type Query {
    books: [Book]
  }
  type Book {
    title: String,
    author: String,
    chapters: Int,
    pages: Int,
    sequels(minLength: Int): [Book]
  }
`

module.exports = typeDefs
