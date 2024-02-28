const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const isAuthenticated = require('../utils/authenticate')
const {
    userEditUserValidation,
    userEditModeratorValidation
} = require('../utils/validations')
const tryCatchHandler = require('../controllers/tryCatch.handler')
const validationHandler = require('../utils/validationHandler')
/**
 * @swagger 
 * /api/user/edit:
 *   patch:
 *     tags: 
 *       - Users
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: name
 *               password:
 *                 type: string
 *                 default: password
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.patch('/edit', isAuthenticated(['user', 'moderator', 'admin']), userEditUserValidation, validationHandler, tryCatchHandler(userController.editUser)) //add or change pass,change email/first name/last name

/**
 * @swagger 
 * /api/user/edit/{id}:
 *   patch:
 *     tags: 
 *       - Users
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: name
 *               role:
 *                 type: string
 *                 default: password
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.patch('/edit/:id', isAuthenticated(['moderator', 'admin']), userEditModeratorValidation, validationHandler, tryCatchHandler(userController.editUser))


module.exports = router