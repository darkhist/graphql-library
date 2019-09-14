const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const db = require('./db');

const app = express();
app.use(cors());

app.use('/api', graphqlHTTP({
  schema: schema,
  // use the graphiql IDE
  graphiql: true
}));

app.listen(9000, () => {
  console.log('Listening on port 9000');
});