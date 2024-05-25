import express from 'express'
import authController from '../controllers/authController.js'
import passport from 'passport';

const router = express.Router()

router.post('/register', authController.register);
router.post('/verify', authController.verifyRegister);
router.post('/login', authController.login);

router.get('/google', function (req, res, next) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: req.query.role
  })(req, res, next)
})

router.get('/google/redirect', passport.authenticate('google', {
  session: false
}), authController.loginGoogle)

router.post('/forget-password', authController.forgetPassword)

router.post('/change-password', authController.protect, authController.changePassword);

export default router;