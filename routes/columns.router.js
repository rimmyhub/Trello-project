const express = require('express');
const ColumnsController = require('../controllers/columns.controller.js');
const columnsController = new ColumnsController();

const AuthMiddleware = require('../middleware/auth.middleware.js');

const columnsRouter = express.Router();
const authMiddleware = new AuthMiddleware();

columnsRouter.post('/', authMiddleware.verifyAccessToken, columnsController.createColumn);
columnsRouter.get('/:columnId', authMiddleware.verifyAccessToken, columnsController.getColumnById);
columnsRouter.get('/', authMiddleware.verifyAccessToken, columnsController.getAllColumns);
columnsRouter.put('/:columnId', authMiddleware.verifyAccessToken, columnsController.updateColumn);
columnsRouter.delete('/:columnId', authMiddleware.verifyAccessToken, columnsController.deleteColumn);

module.exports = columnsRouter;