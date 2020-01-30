const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.secret);

    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
}

module.exports = auth;
