/**
 * This file defines a schema for our graph / API
 * which describes the data our API will hold
 * 
 * It describes the types of objects in our API, 
 * the relationships between them,
 * and how we can interact with them
 */
const graphql = require('graphql');
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;

// Fake Data Store
const books = [
  {id: 1, authorID: 1, title: 'Born A Crime', genre: 'Biography'},
  {id: 2, authorID: 2, title: 'Harry Potter', genre: 'Fantasy'},
  {id: 3, authorID: 3, title: 'The Soul of a New Machine', genre: 'Tech'},
  {id: 4, authorID: 4, title: 'Hatching Twitter', genre: 'Tech'},
  {id: 5, authorID: 5, title: 'Crushing It', genre: 'Self Improvement'},
  {id: 6, authorID: 2, title: 'Lethal White', genre: 'Mystery'},
  {id: 7, authorID: 5, title: '#AskGaryVee', genre: 'Self Improvement'},
];

const authors = [
  {id: 1, name: 'Trevor Noah', age: 35},
  {id: 2, name: 'J.K. Rowling', age: 53},
  {id: 3, name: 'Tracy Kidder', age: 73},
  {id: 4, name: 'Nick Bilton', age: 40},
  {id: 5, name: 'Gary Vaynerchuck', age: 43}
]

// Define a Book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  // Fields is a function that returns an object
  // which contains all the properties that a Book has
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // parent holds the book we've asked for

        // look through the authors
        // check to see if the author id matches the book's
        // authorID -- meaning an author has written that book
        for (let author of authors) {
          if (author.id === parent.authorID) return author
        }
      }
    }
  })
});

// Define an Author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  // Fields is a function that returns an object
  // which contains all the properties that a Book has
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // parent holds the author
        
        // We want to return every book
        // where the book's authorID matches 
        // an author id
        return books.filter(book => book.authorID === parent.id);
      }
    }
  })
});

/**
 * Root Queries
 * Describe how we initially access the graph 
 */

/** Example Root Query for a Book
 * book(id: '123') {
 * title
 * genre
 * }
 */

 const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
     // Return a single book
     book: {
       // The type of thing we're looking for
       type: BookType,
       // The args that should be passed in the query
       args: {id: {type: GraphQLID}},
       // The code that is used to retrieve what we're
       // looking for (from a DB / Other Source)
       resolve(parent, args) {
        for (let book of books) {
          if (book.id.toString() === args.id) return book
        }
       }
     },
     // Return an author
     author: {
       type: AuthorType,
       args: {name: {type: GraphQLString}},
       resolve(parent, args) {
        for (let author of authors) {
          if (author.name === args.name) return author;
        }
       }
     },
     // Return all books
     books: {
        type: new GraphQLList(BookType),
        resolve() {
          return books;
        }
     },
     // Return all authors
     authors: {
       type: new GraphQLList(AuthorType),
       resolve() {
         return authors;
       }
     }
   }
 })

 // Export a new schema with our initial root query
 module.exports = new GraphQLSchema({
  query: RootQuery
 });