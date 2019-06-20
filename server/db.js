const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/gql-lib',
  { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB 🎉');
});

mongoose.connection.on('error', () => {
  console.log('Failed to connect to MongoDB!');
  process.exit(1);
});