const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers["authentication"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided.",
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized",
      });
    }
    next();
  });
};

module.exports = authorization;
