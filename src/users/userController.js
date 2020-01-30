/* eslint-disable no-return-assign */
/* eslint-disable no-throw-literal */
/* eslint-disable comma-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../config/config.json');
const userDal = require('./userDal');

// login an existing user by providing username and password
async function login(req, res, next) {
  const { username } = req.body;
  const { password } = req.body;

  await userDal.findOne({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.J_SECRET || config.secret);
        res.status(201).json({
          ...userWithoutHash,
          token
        });
      } else { throw 'username or password incorrect'; }
    }).catch((err) => next(err));
}

// create a new user and empty profile on the fly using phone number, username, and password
async function signup(req, res, next) {
  const { username } = req.body;
  const { phone } = req.body;
  const { password } = req.body;

  await userDal.findOne({ username })
    .then((found) => {
      if (found) throw 'username is already taken';
      else return userDal.findOne({ phone });
    })
    .then((found) => {
      if (found) throw 'phone number is registered to a different account';
      // eslint-disable-next-line no-undef
      else { return hash = bcrypt.hashSync(password, 10); }
    })
    .then((hash) => userDal.create({ username, phone, hash }))
    .then((user) => {
      // eslint-disable-next-line no-param-reassign
      user.hash = '####';
      res.status(201).json({ message: 'registration successful', user });
    })
    .catch((err) => next(err));
}

// gets a registered user by userId
async function getById(req, res, next) {
  const { id } = req.params;
  await userDal.findOne({ _id: id })
    .then((user) => {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        user.hash = '####';
        res.status(200).json(user);
      } else {
        throw 'user not found';
      }
    })
    .catch((err) => next(err));
}

// gets all registered users information
async function getAll(req, res, next) {
  await userDal.findAll()
    .then((users) => {
      users.forEach((user) => {
        // eslint-disable-next-line no-param-reassign
        user.hash = '####';
      });
      res.status(200).json(users);
    })
    .catch((err) => next(err));
}

module.exports = {
  login,
  signup,
  getById,
  getAll
};
