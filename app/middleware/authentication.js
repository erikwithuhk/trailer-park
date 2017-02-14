const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const { token } = req.cookies;

  const nonRestrictedRoutes = [
    '/signup',
    '/login',
    '/signout',
    '/trailers',
    '/trailers/search',
    '/trailers/popular',
  ];

  if (nonRestrictedRoutes.includes(req.path)) { return next(); }
  if (token && req.session.currentUser) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).end();
      }
      req.decoded = decoded;
      return next();
    });
  }
  res.clearCookie('token');
  return res.status(403).end();
}

module.exports = authenticate;
