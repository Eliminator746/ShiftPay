import jwt from "jsonwebtoken";
import jwtSecretPassword from "../config.js";

function authMiddleware(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Authentication denied!",
    });
  }

  //----------------------------------------------------------------------------------------
  //                        Verify token with secret key
  //----------------------------------------------------------------------------------------
  try {
    const decoded = jwt.verify(token, jwtSecretPassword);
    req.userId = decoded.userId; // userId we can fetch later via request itself
    
    next();
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
}

export { authMiddleware };
