const router = require('express').Router();

router.use('/users', require('../src/users/userRoute'));
// router.use('/items', require('../src/items/itemRoute'));

module.exports = router;
