const express = require('express');
const authMiddleware = require('../middlewares/authenticate.middleware');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(authMiddleware.requireAuth);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * paths:
 *  /user/getAllUsers:
 *    get:
 *      summary:  Endpoint for get all users
 *      tags: [User]
 *      security:
 *        - jwt: []
 *      responses:
 *         "200":
 *            description: A successful response
 */

router.route('/getAllUsers')
  .get(userCtrl.getAllUsers);


/**
 * @swagger
 * paths:
 *  /user/:
 *    get:
 *      summary:  Endpoint for get user
 *      tags: [User]
 *      security:
 *        - jwt: []
 *      responses:
 *         "200":
 *            description: A successful response
 */
router.route('/')
  .get(userCtrl.getUser);

module.exports = router;
