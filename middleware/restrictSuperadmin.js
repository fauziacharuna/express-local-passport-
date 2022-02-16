const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const salt = "Ini rahasia";
    const tokenJWT = req.headers.authorization;
    var tokenDecoded = await jwt.verify(tokenJWT, salt);
    console.log(tokenDecoded)
    if(tokenDecoded.isAdmin !== 1){
        return res.status(401).json({
            status: "Unauthorized!"
        })
    }
    next()
};
