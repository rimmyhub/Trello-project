const express = require('express');
const ColumnsController = require('../controllers/columns.controller.js');
const columnsController = new ColumnsController();

const ColumnsRouter = express.Router();

ColumnsRouter.post('/', columnsController.createColumn);
ColumnsRouter.get('/:columnId', columnsController.getColumnById);
ColumnsRouter.get('/', columnsController.getAllColumns);
ColumnsRouter.put('/:columnId', columnsController.updateColumn);
ColumnsRouter.delete('/:columnId', columnsController.deleteColumn);

module.exports = ColumnsRouter;