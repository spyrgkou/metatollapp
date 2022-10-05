const router = require('express').Router();
const AuthController = require('../controllers/auth');
const checkAuth = require('../middleware/checkauth');
const permissionAuth = require('../middleware/permissionAuth');

router.post('/signup', [checkAuth, permissionAuth('admin')], AuthController.signup);
router.get('/login', AuthController.login_get);
router.post('/login', AuthController.login_post);
router.get('/logout', AuthController.logout);

module.exports = router;