const router = require('express').Router();
const authMiddleware = require('./authMiddleware');

router.post('/register');
router.post('/login');
router.get('/getUsers', authMiddleware)

module.exports = router;
