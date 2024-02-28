const express = require('express')
const router = express.Router()
const statusController = require('../controllers/status.controller')
const isAuthenticate = require('../utils/authenticate')
const {
    idValidation,
    statusCreateValidation,
    statusEditValidation
} = require('../utils/validations')
const validationHandler = require('../utils/validationHandler')
const tryCatchHandler = require('../controllers/tryCatch.handler')
/**
 * @swagger 
 * /api/status/add:
 *   post:
 *     tags: 
 *       - Status
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
 *               - name
 *             type: object
 *             properties:
 *               name:
 *                 type: string
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
router.post('/add', isAuthenticate(['admin', 'moderator']), statusCreateValidation, validationHandler, tryCatchHandler(statusController.createStatus))
/**
 * @swagger 
 * /api/status/edit/{id}:
 *   patch:
 *     tags: 
 *       - Status
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
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
router.patch('/edit/:id', isAuthenticate(['admin', 'moderator']), statusEditValidation, validationHandler, tryCatchHandler(statusController.editStatus))
/**
 * @swagger 
 * /api/status/delete/{id}:
 *   delete:
 *     tags: 
 *       - Status
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
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
router.delete('/delete/:id', isAuthenticate(['admin', 'moderator']), idValidation, validationHandler, tryCatchHandler(statusController.deleteStatus))

module.exports = router