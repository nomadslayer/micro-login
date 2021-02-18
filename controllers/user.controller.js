const db = require('../configuration/database');
const rdClient = require('../configuration/redis');

const getUser = (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    rdClient.get(token, (error, reply) => {
      if (error || !reply) {
        return res.status(400).send('unauthorized');
      }

      return db.from('profiles')
        .select('*')
        .where({ id: reply })
        .then((data) => {
          if (data) {
            data.hashed_password = undefined;
            return res.json(data[0]);
          }
          return res.status(400).json('could not get user');
        })
        .catch((error) => res.status(400).json('could not get user'));
    });
  } else {
    return res.status(400).json('unauthorized');
  }
};

const getAllUsers = (req, res) => {
    const { authorization } = req.headers;
  
    if (authorization) {
      const token = authorization.split(' ')[1];
  
      rdClient.get(token, (error, reply) => {
        if (error || !reply) {
          return res.status(400).send('unauthorized');
        }
  
        return db.from('profiles')
          .select('name')
          .then((data) => {
              return res.json(data);
          })
          .catch((error) => res.status(400).json('could not get user'));
      });
    } else {
      return res.status(400).json('unauthorized');
    }
  };

module.exports = {getUser, getAllUsers};
