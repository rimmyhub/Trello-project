const BoardsService = require('../services/boards.service');

class BoardsController {
  boardsService = new BoardsService();
}
module.exports = BoardsController;
