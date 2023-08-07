const BoardsRepository = require('../repositories/boards.repository');

class BoardsService {
  boardsRepository = new BoardsRepository();
}

module.exports = BoardsService;
