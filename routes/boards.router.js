const express = require('express');
const BoardsController = require('../controllers/boards.controller');
const BoardsRouter = express.Router();

const boardController = new BoardsController();

module.exports = BoardsRouter;
