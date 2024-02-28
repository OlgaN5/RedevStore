const express = require('express')
const router = express.Router()
const isAuthenticated = require('../utils/authenticate')
const profileController = require('../controllers/profile.controller')
const {
    profileCreateUserValidation,
    profileEditUserValidation,
    profileCreateModeratorValidation,
    profileEditModeratorValidation
} = require('../utils/validations')
const validationHandler = require('../utils/validationHandler')
const tryCatchHandler = require('../controllers/tryCatch.handler')

/**
 * @swagger 
 * /api/user/profile/create:
 *   post:
 *     tags: 
 *       - Profile
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: name
 *               lastName:
 *                 type: string
 *                 default: lastName
 *               address:
 *                 type: string
 *                 default: address
 *               phoneNumber:
 *                 type: string
 *                 default: +75676744777
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
router.post('/create', isAuthenticated(['user', 'moderator', 'admin']), profileCreateUserValidation, validationHandler, tryCatchHandler(profileController.createProfile))
/**
 * @swagger 
 * /api/user/profile/edit:
 *   patch:
 *     tags: 
 *       - Profile
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: name
 *               lastName:
 *                 type: string
 *                 default: lastName
 *               address:
 *                 type: string
 *                 default: address
 *               phoneNumber:
 *                 type: string
 *                 default: +75676744777
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
router.patch('/edit', isAuthenticated(['user', 'moderator', 'admin']), profileEditUserValidation, validationHandler, tryCatchHandler(profileController.editProfile))
/**
 * @swagger 
 * /api/user/profile/create/{id}:
 *   post:
 *     tags: 
 *       - Profile
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         default: 1
 *         in: path
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: name
 *               lastName:
 *                 type: string
 *                 default: lastName
 *               address:
 *                 type: string
 *                 default: address
 *               phoneNumber:
 *                 type: string
 *                 default: +75676744777
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
router.post('/create/:id', isAuthenticated(['moderator', 'admin']), profileCreateModeratorValidation, validationHandler, tryCatchHandler(profileController.createProfile))
/**
 * @swagger 
 * /api/user/profile/edit/{id}:
 *   patch:
 *     tags: 
 *       - Profile
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
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
 *               firstName:
 *                 type: string
 *                 default: name
 *               lastName:
 *                 type: string
 *                 default: lastName
 *               address:
 *                 type: string
 *                 default: address
 *               phoneNumber:
 *                 type: string
 *                 default: +75676744777
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
router.patch('/edit/:id', isAuthenticated(['moderator', 'admin']), profileEditModeratorValidation, validationHandler, tryCatchHandler(profileController.editProfile))

module.exports = router