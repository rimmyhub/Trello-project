const express = require('express');
const ColumnsController = require('../controllers/columns.controller.js');
const columnsController = new ColumnsController();

const AuthMiddleware = require('../middleware/auth.middleware.js');

const columnsRouter = express.Router();
const authMiddleware = new AuthMiddleware();

columnsRouter.post('/column', authMiddleware.verifyAccessToken, columnsController.createColumn);
columnsRouter.get('/column/:columnId', authMiddleware.verifyAccessToken, columnsController.getColumnById);
columnsRouter.get('/column/', authMiddleware.verifyAccessToken, columnsController.getAllColumns);
columnsRouter.put('/column/:columnId', authMiddleware.verifyAccessToken, columnsController.updateColumn);
columnsRouter.delete('/column/:columnId', authMiddleware.verifyAccessToken, columnsController.deleteColumn);

module.exports = columnsRouter;