// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const router = require('express').Router();
const {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require('./auth-middleware');
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post(
  '/register', checkPasswordLength, checkUsernameFree,

  ({body: {username, password}}, res, next) => {
    const hash = bcrypt.hashSync(password, 8);
    const user = { username, password: hash };
    Users.add(user)
      .then(returnedUser => {
        res.json(returnedUser);
      })
      .catch(next);
});
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


router.post('/login', checkUsernameExists, async (req, res, next) => {
  const {username, password} = req.body;
  const user = await Users.findBy({ username }).first();
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.json(user);
  } else {
    next({
      status: 401,
      message: 'Invalid credentials'
    });
  }
});
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.get('/logout', (req, res, next) => {
  res.json({message: 'logout wired'});
});
/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
