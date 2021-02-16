const bcrypt = require('bcrypt');
const emailValidate = require("email-validator")
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const db = require('../configuration/database');
const rdClient = require('../configuration/redis');

let schema = new passwordValidator();
schema
.is().min(12)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().symbols(1)
.has().not().spaces()

let register = (req, res) => {
    let { name, email, password } = req.body;
  
    if (!name || !email || !password) {
        console.log(name);
        console.log(email);
        console.log(password);
      return res.status(400).json('Please provide valid name, email and password');
    }
    else if(!emailValidate.validate(email)) {
        return res.status(400).json('Please provide a valid email');
    }
    else if(!schema.validate(password)) {
        return res.status(400).json('Please provide a password with min 12 characters, 1 uppercase, and one symbol');
    }
  
    const hash = bcrypt.hashSync(password, 10);
  
    return db.transaction((trans) => {
        trans('login')
        .returning(['id', 'email'])
        .insert({ email, password: hash, created: new Date()})
        .then((data) => {
          const { id, email } = data[0];
  
          return trans('profiles')
            .returning('*')
            .insert({ id, name, email, created: new Date() })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trans.commit)
        .catch(trans.rollback);
    }).catch((error) => {
      console.log(error);
      res.status(400).json('could not register user');
    });
  };

  
let login =  (req, res) => {
    let { authorization } = req.headers;
  
    if (authorization) {
      return getTokenId(req, res);
    } else {
      return loginUser(req, res)
        .then((userData) => {
          if (userData.id && userData.email) {
            return createSession(userData);
          } else {
            return Promise.reject(userData);
          }
        })
        .then((session) => res.json(session))
        .catch((error) => res.status(400).json(error));
    }
  };

let logout = (req, res) => {
    let { authorization } = req.headers;
    
    if (authorization) {
        let id = removeToken(req, res);
        return true;
    }
}

let removeToken = (req, res) => {
    let { authorization } = req.headers;
    let token = authorization.split(' ')[1];
  
    return rdClient.del(token, (error, reply) => {
      if (error || !reply) {
        return res.status(401).send('Unauthorized');
      }
      console.log('From redis', reply);
      return res.status(200).json(true);
    });
}

let getTokenId = (req, res) => {
    let { authorization } = req.headers;
    let token = authorization.split(' ')[1];
  
    return rdClient.get(token, (error, reply) => {
      if (error || !reply) {
        return res.status(401).send('Unauthorized');
      }
      console.log('From redis', reply);
      return res.json({ id: reply });
    });
  };

  
let loginUser = (req, res) => {
    let { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json('Email and Password are required');
    }
  
    return db.from('login')
      .select('email', 'password')
      .where({ email })
      .then((data) => {
        const passwordMatches = bcrypt.compareSync(
          password,
          data[0].password,
        );
  
        if (passwordMatches) {
          return db.from('profiles')
            .select('*')
            .where({ email })
            .then((user) => user[0])
            .catch((error) => res.status(400).json('Unable get user info'));
        } else {
          return res.status(400).json('Invalid email or password');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

let createSession = (user) => {
    let { id, email } = user;
    let token = generateToken(email);
    return setToken(token, id)
      .then(() => {
        return {
          success: 'true',
          userId: id,
          user,
          token,
        };
      })
      .catch((error) => console.log(error));
  };

let generateToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '1 days' });
  };
  
let setToken = (key, value) => Promise.resolve(rdClient.set(key, value));


module.exports = { register, login, logout };
  