/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const config = require('./config.json');

const User = require('../src/users/userModel');
const Items = require('../src/items/itemModel');

// eslint-disable-next-line max-len
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Get current connected Database
const db = mongoose.connection;

// Notify on error or success
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error: '));
// eslint-disable-next-line no-console
db.once('open', () => console.log('Connected to the Database'));

module.exports = {
  User,
  Items
};
