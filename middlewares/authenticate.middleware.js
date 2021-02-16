const rdClient = require('../configuration/redis');

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  let token = authorization.split(' ')[1];

  return rdClient.get(token, (error, reply) => {
    if (error || !reply) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  });
};

module.exports = { requireAuth };
