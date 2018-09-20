var express = require("express");
var graphqlHTTP = require("express-graphql");
var { execute, subscribe } = require("graphql");
var { SubscriptionServer } = require("subscriptions-transport-ws");
var { makeExecutableSchema } = require("graphql-tools");
var cors = require("cors");
var { filter, find, findIndex } = require("lodash");
// Construct a schema, using GraphQL schema language
var typeDefs = `
  type Author {
    id: Int!
    name: String
    books: [Book]
  }

  type Book {
    id: Int!
    title: String
    author: Author
    quantity: Int!
  }

  type Query {
    books: [Book]
    authors: [Author]
    author(id: Int!): Author
  }

  type Mutation {
    addBookQuantity(id: Int!): Book
    removeBookQuantity(id: Int!): Book
  }
`;

var books = [
  { id: 0, title: "The Art Of War", authorId: 0, quantity: 1 },
  { id: 1, title: "A Room of One’s Own", authorId: 1, quantity: 2 },
  { id: 2, title: "The Elements of Style", authorId: 2, quantity: 1 },
  { id: 3, title: "The Heart of Haiku", authorId: 3, quantity: 3 },
  { id: 4, title: "Poke the Box", authorId: 4, quantity: 2 },
  { id: 5, title: "Lifeboat No. 8", authorId: 5, quantity: 1 },
  { id: 6, title: "The Season", authorId: 5, quantity: 1 },
  { id: 7, title: "The Dip", authorId: 4, quantity: 3 },
  { id: 8, title: "Meatball Sundae", authorId: 4, quantity: 12 }
];

var authors = [
  { id: 0, name: "Sun Tzu" },
  { id: 1, name: "Virginia Woolf" },
  { id: 2, name: "William Strunk" },
  { id: 3, name: "Jane Hirshfield" },
  { id: 4, name: "Seth Godin" },
  { id: 5, name: "Elizabeth Kaye" }
];

var resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  },
  Mutation: {
    addBookQuantity: (_, { id }) => {
      const idx = books.findIndex(book => book.id === id);
      if (idx !== -1) {
        books[idx].quantity++;
        return books[idx];
      }
      return undefined;
    },
    removeBookQuantity: (_, { id }) => {
      const idx = books.findIndex(book => book.id === id);
      if (idx !== -1) {
        books[idx].quantity--;
        return books[idx];
      }
      return undefined;
    }
  },
  Author: {
    books: author => filter(books, { authorId: author.id })
  },
  Book: {
    author: book => find(authors, { id: book.authorId })
  }
};

var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

var app = express();
app.use(
  "/api/gql",
  cors(),
  graphqlHTTP({
    schema: schema,
    graphiql: false
  })
);

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: app,
    path: "/api/ws"
  }
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/api/gql");
console.log("Running a GraphQL WS server at localhost:4000/api/ws");
