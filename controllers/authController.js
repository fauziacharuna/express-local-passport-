const {User} = require('../models')
const passport = require('../lib/passport')

function format(user) {
    const {id, username, isAdmin} = user
    return {
        id, username, accessToken: user.generateToken(),
        isAdmin
    }
}

module.exports = {


    login: (req, res) => {
        console.log(req.body)
        User.authenticateJWT(req.body)
            .then(user => {
                res.json(
                    format(user)
                )
            })

    },
    whoamiJwt: (req, res)=> {
        const currentUser = req.user;
        res.json(currentUser)
    }
}