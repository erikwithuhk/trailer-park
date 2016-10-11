const jwt = require('jsonwebtoken');

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 10080 });
}

module.exports = createToken;
