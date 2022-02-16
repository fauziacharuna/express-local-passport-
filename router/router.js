const router = require('express').Router()
const passport = require("../lib/passport");

const restrict = require('../middleware/restrict')
const restrictJwt = require('../middleware/restrictJWT')


const auth = require('../controllers/authController')
router.get('/',  restrict, (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login',(req, res) => {
    res.render('login')
})
router.get('/whoami', restrict,auth.whoami)
router.get('/api/v1/auth/whoami', restrictJwt, auth.whoamiJwt)

router.post('/register', restrict, auth.register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/whoami',
    failureRedirect: '/login',
    failureFlash: true
}))

//Register
router.post('/api/v1/auth/register', auth.register)
//Login
router.post('/api/v1/auth/login', auth.login)



module.exports = router;