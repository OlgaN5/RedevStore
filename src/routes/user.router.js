const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const isAuthenticated = require('../utils/authenticate')
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
router.patch('/edit', isAuthenticated(['user', 'moderator', 'admin']), userController.editUser) //add or change pass,change email/first name/last name
/**
 * @swagger 
 * /api/user/profile/:
 *   post:
 *     tags: 
 *       - Profile
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
router.post('/profile/', isAuthenticated(['user', 'moderator', 'admin']), userController.createProfile)
/**
 * @swagger 
 * /api/user/profile/edit:
 *   patch:
 *     tags: 
 *       - Profile
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
router.patch('/profile/edit', isAuthenticated(['user', 'moderator', 'admin']), userController.editProfile)
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
router.patch('/edit/:id', isAuthenticated(['moderator', 'admin']), userController.editUser)
/**
 * @swagger 
 * /api/user/profile/{id}:
 *   post:
 *     tags: 
 *       - Profile
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
router.patch('/profile/edit/:id', isAuthenticated(['moderator', 'admin']), userController.editProfile)

module.exports = router














