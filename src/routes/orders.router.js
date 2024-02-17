const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const isAuthenticated = require('../utils/authenticate')
const {
    idValidation,
    orderCreateModeratorValidation,
    orderEditValidation,
    orderCreateUserValidation
} = require('../utils/validations')
/**
 * @swagger 
 * /api/user/order/getOrders:
 *   get:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
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
router.get('/getOrders', isAuthenticated(['user']), orderController.getOrders)

/**
 * @swagger 
 * /api/user/order/{id}:
 *   get:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         default: 1
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
router.get('/:id', isAuthenticated(['moderator', 'user', 'admin']), idValidation, orderController.getOrder)

/**
 * @swagger 
 * /api/user/order/getUserOrders/{id}:
 *   get:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         default: 1
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
router.get('/getUserOrders/:id', isAuthenticated(['moderator', 'admin']), idValidation, orderController.getOrders) //moder

/**
 * @swagger 
 * /api/user/order/add:
 *   post:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: 
 *               - productId
 *               - deliverStatus
 *               - statusId
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 default: 1
 *               count:
 *                 type: integer
 *                 default: 1
 *               deliverStatus:
 *                 type: string
 *                 default: status
 *               statusId:
 *                 type: integer
 *                 default: 1
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
router.post('/add', isAuthenticated(['user']), orderCreateUserValidation, orderController.createOrder)
/**
 * @swagger 
 * /api/user/order/add/{id}:
 *   post:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         default: 1
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: 
 *               - productId
 *               - deliverStatus
 *               - statusId
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 default: 1
 *               count:
 *                 type: integer
 *                 default: 1
 *               deliverStatus:
 *                 type: string
 *                 default: status
 *               statusId:
 *                 type: integer
 *                 default: 1
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
router.post('/add/:id', isAuthenticated(['moderator', 'admin']), orderCreateModeratorValidation, orderController.createOrder) //moder

/**
 * @swagger 
 * /api/user/order/edit/{id}:
 *   patch:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         default: 1
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 default: 1
 *               count:
 *                 type: integer
 *                 default: 1
 *               deliverStatus:
 *                 type: string
 *                 default: status
 *               statusId:
 *                 type: integer
 *                 default: 1
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
router.patch('/edit/:id', isAuthenticated(['moderator', 'user', 'admin']), orderEditValidation, orderController.editOrder)
/**
 * @swagger 
 * /api/user/order/delete/{id}:
 *   delete:
 *     tags: 
 *       - Order
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         default: 1
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
router.delete('/delete/:id', isAuthenticated(['moderator', 'user', 'admin']), idValidation, orderController.deleteOrder)




module.exports = router