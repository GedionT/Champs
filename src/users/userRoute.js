const router = require('express').Router();

const userController = require('./userController');
const auth = require('../../services/authMiddleware');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/:id', auth, userController.getById);
router.get('/', auth, userController.getAll);

module.exports = router;
