/* eslint-disable comma-dangle */
const { User } = require('../../config/db');

async function create(data) {
  return User(data).save();
}

async function update(user, data) {
  Object.assign(user, data);
  return user.save();
}

async function findOne(query) {
  return User.findOne(query).populate('profile').exec();
}

async function findAll(query) {
  return User.find(query).exec();
}

module.exports = {
  create,
  update,
  findOne,
  findAll
};
