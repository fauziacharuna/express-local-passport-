const router = require('express').Router()
const passport = require("../lib/passport");

const restrict = require('../middleware/restrict')
const restrictJwt = require('../middleware/restrictJWT')


const auth = require('../controllers/authController')

router.get('/api/v1/auth/whoami', restrictJwt, auth.whoamiJwt)



//Register
router.post('/api/v1/auth/register', auth.register)
//Login
router.post('/api/v1/auth/login', auth.login)



module.exports = router;