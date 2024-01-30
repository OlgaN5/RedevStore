const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const isAuthenticated = require('../utils/authenticate')
/**
 * @swagger 
 * /api/category/add:
 *   post:
 *     tags: 
 *       - Category
 *     security:
 *       - cookieAuth: []
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: 
 *               - name
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: name
 *               describe:
 *                 type: string
 *                 default: describe
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

router.post('/add', isAuthenticated(['admin', 'moderator']), categoryController.createCategory)
/**
 * @swagger 
 * /api/category/edit/{id}:
 *   post:
 *     tags: 
 *       - Category
 *     security:
 *       - cookieAuth: []
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
 *               name:
 *                 type: string
 *                 default: name
 *               describe:
 *                 type: string
 *                 default: describe
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

router.post('/edit/:id', isAuthenticated(['admin', 'moderator']), categoryController.editCategory)
/**
 * @swagger 
 * /api/category/delete/{id}:
 *   post:
 *     tags: 
 *       - Category
 *     security:
 *       - cookieAuth: []
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
router.post('/delete/:id', isAuthenticated(['admin', 'moderator']), categoryController.deleteCategory)

module.exports = router