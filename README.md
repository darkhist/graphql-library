# 📚 GraphQL Library

## Overview

GraphQL Library is a full stack web application which allows users to make reading lists, and serves as an introduction to creating and interacting with a GraphQL API

This project is basically a fork of [graphql-playlist](https://github.com/iamshaunjp/graphql-playlist) and, thus, closely follows the [GraphQL with React](https://www.youtube.com/watch?v=ed8SzALpx1Q&list=WL&index=5&t=0s) course from freeCodeCamp – except I'm using newer GraphQL Schema syntax, etc

Consider supporting the creator of this course, [@TheNetNinja](https://twitter.com/thenetninjauk) by:

- [Subscribing on YouTube](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
- [Making a PayPal Donation](https://www.paypal.me/thenetninja)
- [Becoming a Supporter on Patreon](https://www.patreon.com/thenetninja)

This is mostly just a personal exploratory project, but if you'd like to use it as a guide, boilerplate, etc, then continue reading :~)

## Getting Started

1. Install [Git](https://git-scm.org)
2. Install [Node.js](https://nodejs.org)
3. Install [Yarn](https://yarnpkg.com/en/)
4. Install [MongoDB](https://www.mongodb.com/) and, optionally, the MongoDB GUI, [Compass](https://www.mongodb.com/products/compass)
5. Clone this repository by running `git clone https://github.com/darkhist/graphql-library.git`
6. `cd graphql-library`

## Client Development

The frontend for this project was scaffolded with [Create React App](https://github.com/facebook/create-react-app)

See [here](client/README.md) for details!

_I'm using Prettier for code formatting, so if you hate that just remove the Prettier development dependency_

## Server Development

1. In a fresh Terminal tab, run `mongod` to start MongoDB
2. Switch to a new tab
3. `cd server`
4. Install dependencies by running `yarn`
5. Start the server with `yarn start`
6. Visit http://localhost:9000/api

_GraphiQL is an interactive GraphQL IDE, and it's great for testing queries and exploring your API documentation_

_I'm using Nodemon to automatically reload the server when files change, so if you hate that too just remove the Nodemon development dependency_

## Resources

- [Intro to GraphQL](https://graphql.org/learn/)
- [Apollo Docs](https://www.apollographql.com/docs/)
- [GraphQL Concepts I Wish Someone Explained to Me a Year Ago](https://medium.com/naresh-bhatia/graphql-concepts-i-wish-someone-explained-to-me-a-year-ago-514d5b3c0eab) by Naresh Bhatia
- [Dive Into GraphQL Part III: Building a GraphQL Server with Node.js](https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html) by François Zaninotto
- [Mongoose Query Docs](https://mongoosejs.com/docs/queries.html)
- Potentially helpful comments in `server/schema/schema.js` – written by yours truly :~)

## License

This project is licensed under the MIT License – see [LICENSE](LICENSE) for details
