const router = require('express').Router();
const authMiddleware = require('./authMiddleware');
const { register, login, getAllUsers } = require('./controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/getUsers', authMiddleware, getAllUsers);

module.exports = router;
