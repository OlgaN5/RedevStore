const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')
const isAuthenticated = require('../utils/authenticate')
const {
    idValidation,
    cartCreateValidation,
    cartEditValidation
} = require('../utils/validations')

/**
 * @swagger 
 * /api/cart/create:
 *   post:
 *     tags: 
 *       - Cart
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
 *             required: 
 *               - productId
 *               - count
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *                 default: name
 *               count:
 *                 tupe: number
 *                 default: name
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
router.post('/create', isAuthenticated(['user']), cartCreateValidation, cartController.createCart)
/**
 * @swagger 
 * /api/cart/edit/{id}:
 *   patch:
 *     tags: 
 *       - Cart
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         default: 1
 *         in: path
 *         required: true
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: 
 *               - productId
 *               - count
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *                 default: name
 *               count:
 *                 tupe: number
 *                 default: name
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
router.patch('/edit', isAuthenticated(['user']), cartEditValidation, cartController.editCart)
/**
 * @swagger 
 * /api/cart/delete:
 *   delete:
 *     tags: 
 *       - Cart
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         default: 1
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
router.delete('/delete', isAuthenticated(['user']), idValidation, cartController.deleteCart)

module.exports = router