/**
 * This file defines a schema for the graph / API
 * which describes the data the API will hold
 *
 * It describes the types of objects in the API,
 * the relationships between them,
 * and how we can interact with them
 */
const { makeExecutableSchema } = require('graphql-tools');

const Book = require('../models/book');
const Author = require('../models/author');

const typeDefs = `
  type Book {
    id: ID
    title: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }

  type Query {
    book(title: String!): Book
    books: [Book]
    author(name: String!): Author
    authors: [Author]
  }

  type Mutation {
    addAuthor (
      name: String!
      age: Int!
    ): Author!

    addBook (
      title: String!
      genre: String
      authorID: String!
    ): Book!
  }
`;

/**
 * All resolvers have the following signature
 * @param obj – the previous object
 * (often unused for root queries bc they're at the top level)
 * @param args – args provided to the field in the query
 * @param context – value which is provided to every resolver
 * and holds important contextual information like
 * the currently logged in user, or access to a database
 * @param info – field-specific info relevant to a query
 * and schema details
 * resolver(obj, args, context, info)
 *
 * _ is often used to denote unused function args
 */
const resolvers = {
  /**
   * Root Queries
   *
   * example queries:
   * {
   *  books {
   *    title
   *    genre
   *  }
   * }
   *
   * {
   *  author(name: "Stephen King") {
   *    name
   *    age
   *  }
   * }
   **/
  Query: {
    /** return a particular book
     *
     * In both resolvers, the obj arg is not needed,
     * bc they're top-level (root) queries
     *
     * We know that we're providing a title for our
     * book, so we'll grab the title prop
     *
     * Then, we ask MongoDB for a Book which
     * has the title we provided
     *
     * Note: mongoose queries return Promises, which is why
     * using async/await is important
     **/
    book: async (_, { title }) => await Book.findOne({ title: title }),
    // return all books
    books: () => Book.find({}),
    // return a particular author
    author: async (_, { name }) => await Author.findOne({ name: name }),
    // return all authors
    authors: () => Author.find({})
  },

  /**
   * Data to return for Book queries
   *
   * We need to handle the case where we want to know
   * a book's author i.e a book which has an authorID
   * that matches an Author's ID
   *
   * All other fields will be returned automatically
   *
   * example query:
   * {
   *  book(title: "Harry Potter") {
   *    author {
   *      name
   *      age
   *    }
   *  }
   * }
   *
   * In our resolver, obj refers to the Book type
   * bc it's above author
   **/
  Book: {
    author: async (obj, _) => {
      // find the Book's author ID
      const { authorID } = obj;
      // return the author with the matching ID
      return await Author.findById(authorID);
    }
  },
  // Data to return for Author queries
  // Similar to Book
  Author: {
    books: async (obj, _) => {
      // find the Book's id
      const { _id } = obj;
      // return the list of Book's with matching author ID's
      return await Book.find({ authorID: _id });
    }
  },
  /** Mutations
   * Allow us to create and edit data in the API
   *
   * example mutation:
   * mutation {
   *  addAuthor(name: "Stephen King", age: 71) {
   *    id
   *    name
   *    age
   *  }
   * }
   **/
  Mutation: {
    addAuthor: async (_, { name, age }) => {
      // create a new Author record
      let author = new Author({
        name: name,
        age: age
      });
      return await author.save();
    },
    addBook: async (_, { title, genre, authorID }) => {
      // create a new Book record
      let book = new Book({
        title: title,
        genre: genre,
        authorID: authorID
      });
      return await book.save();
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { schema, resolvers };
