const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { userCreateIndex: true, userNewUrlParse: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

// Get current connected Database
var db = mongoose.connection;

// Notify on error or succes
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected to the Database'));

module.exports = {
    User    : require('../src/users/userModel'),
    Items   : require('../src/items/itemModel')
}
var app = express();

// view engine setup