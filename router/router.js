const router = require('express').Router()
const passport = require("../lib/passport");

const auth = require('../controllers/authController')
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login',(req, res) => {
    res.render('login')
})
router.post('/register', auth.register)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;