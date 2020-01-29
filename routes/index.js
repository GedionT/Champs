const router = require('express').Router();

router.use('/users', require('../src/users/userRoutes'));
router.use('/items', require('../src/items/itemRoutes'));

module.exports = router;
