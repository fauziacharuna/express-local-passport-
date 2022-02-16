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
    register: (req, res, next) => {
        // Kita panggil static method register yang sudah kita buat tadi
        User
            .register(req.body)
            .then(() => {
                res.redirect("/login");
            })
            .catch((err) => next(err));
    },

    whoami: (req, res) => {
        res.render('profile', req.user.dataValues)
    },

    login: (req, res) => {
        console.log(req.body)
        User.authenticateJWT(req.body)
            .then(user => {
                res.json(
                    format(user)
                )
            })

    },
    whoamiJwt: (req, res) => {
        const currentUser = req.user;
        console.log(currentUser)
        res.json(currentUser)
    },
    registerJWT: async (req, res, next) => {
        // const salt = "binar";
        // const tokenJWT = req.headers.authorization;
        // var tokenDecoded = await jwt.verify(tokenJWT, salt);
        // console.log(tokenDecoded)
        // if(tokenDecoded.isAdmin !== 1){
        //   return res.status(401).json({
        //     status: "unathorized"
        //   })
        // }
        User.register(req.body)
            .then(() => {
                res.json({
                    status: "success"
                })
            })
            .catch((err) => next(err));
    }
}