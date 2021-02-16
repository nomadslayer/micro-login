const express = require('express');
const authCtrl = require('../controllers/authenticate.controller');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Register
 *   description: Register
 */

/**
 * @swagger
 * paths:
 *  /auth/register:
 *    post:
 *      summary:  Endpoint for registering user
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/register'
 *      responses:
 *         "200":
 *            description: A successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/register'    
 */

router.route('/register')
  .post(authCtrl.register);

/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *      summary:  Endpoint for registering user
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/login'
 *      responses:
 *         "200":
 *            description: A successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/login'     
 */

router.route('/login')
  .post(authCtrl.login);



router.route('/logout')
  .post(authCtrl.logout);

module.exports = router;
