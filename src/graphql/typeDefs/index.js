const Query = `
  type Query {
    books: [Book]
  }`

const Book = `type Book {
    title: String,
    author: String,
    chapters: Int,
    pages: Int,
    sequels(minLength: Int): [Book]
  }
`
const BookInput = `input BookInput {
  title: String!,
  author: String!,
  chapters: Int!,
  pages: Int!,
  sequals: [BookInput!]
  id: Int!

}`

const Subscription = `type Subscription {
  bookAdded(id: Int!): Book
  commentRedis: String
  commentEventGrid: String
}`

const EventGridMessage = `type EventGridMessage {
  message: String
}`

const Mutation = `type Mutation {
  addBook(book: BookInput): Book
}`

module.exports = [Query, Book, Subscription, Mutation, BookInput, EventGridMessage]
