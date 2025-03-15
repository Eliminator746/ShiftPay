const jwt = require("jsonwebtoken");
const jwtSecretPassword = require("../config");

function authMiddleware(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  //verify token with secret key
  try {
    const decoded = jwt.verify(token, jwtSecretPassword);

    if (decoded.userId) {
      //Learnt where this userId is coming from. jwt sign takes user info, so we provided userId there, jwt.sign({ userId}, jwtSecretPassword);. So we're retrieving this
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    res.status(403).json({});
  }
}

module.exports = { authMiddleware };
