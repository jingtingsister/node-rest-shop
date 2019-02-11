const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // 去掉 bearer
    const decoded = jwt.verify(token, process.env.JWT_KEY)  // jwt.verify can verify & decoded
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}