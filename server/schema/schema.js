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
  GraphQLID,
  GraphQLNonNull
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

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
        // parent contains our book
        return Author.findById(parent.authorID);
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
        return Book.find({ authorID: parent.id });
      }
    }
  })
});

/**
 * Root Queries
 * Describe how we initially access the graph 
 */

/** Example Root Query for a Book
 * book(id: 1) {
    title
    genre
  }
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
         return Book.findById(args.id);
       }
     },
     // Return an author
     author: {
       type: AuthorType,
       args: {name: {type: GraphQLString}},
       resolve(parent, args) {
         // findOne takes two args
         // the first is a query
         // the second is a callback that will be
         // executed after the query is finished
        return Author.findOne({name: args.name}, (err, doc) => {
           if (err || !doc) console.log('No Author Found');
         });
       }
     },
     // Return all books
     books: {
        type: new GraphQLList(BookType),
        resolve() {
          return Book.find({});
        }
     },
     // Return all authors
     authors: {
       type: new GraphQLList(AuthorType),
       resolve() {
         return Author.find({})
       }
     }
   }
 });

 /**
  * Mutations allow us to add, edit, and delete data
  * We define mutations to tell GraphQL how our data
  * can change
  */
 const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   // types of mutations
   fields: {
     // creating a new author
     addAuthor: {
       type: AuthorType,
       args: {
         // require a name and age to be provided
         // when adding a new author
         name: {type: new GraphQLNonNull(GraphQLString)},
         age: {type: new GraphQLNonNull(GraphQLInt)}
       },
       // do the work to create an author...
       resolve(parent, args) {
         const {name, age} = args;
          // use our mongoose author model
          let author = new Author({
            name: name,
            age: age
          });
          // save the author in the db
          return author.save();
       }
     }, 
     addBook: {
      type: BookType,
      args: {
        // require title, genre, and authorID 
        // when creating new books
        title: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorID: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        const {title, genre, authorID} = args;
         let book = new Book({
           title: title,
           genre: genre,
           authorID: authorID
         });
         return book.save();
      }
     }
   }
 })

 // Export a new schema with info about 
 // what queries and mutations can be performed
 module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
 });