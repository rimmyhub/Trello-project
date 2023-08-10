const express = require('express');
const ColumnsController = require('../controllers/columns.controller.js');
const columnsController = new ColumnsController();

const AuthMiddleware = require('../middleware/auth.middleware.js');

const columnsRouter = express.Router();
const authMiddleware = new AuthMiddleware();

columnsRouter.post('/:boardId/column', authMiddleware.verifyAccessToken, columnsController.createColumn);
columnsRouter.get('/:boardId/column/:columnId', authMiddleware.verifyAccessToken, columnsController.getColumnById);
columnsRouter.get('/column', authMiddleware.verifyAccessToken, columnsController.getAllColumns);
columnsRouter.put('/:boardId/column/:columnId', authMiddleware.verifyAccessToken, columnsController.updateColumn);
columnsRouter.delete('/:boardId/column/:columnId', authMiddleware.verifyAccessToken, columnsController.deleteColumn);
columnsRouter.get('/:boardId/column', authMiddleware.verifyAccessToken, columnsController.getAllColumnsForBoard);

module.exports = columnsRouter;
