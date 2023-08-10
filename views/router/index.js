const express = require('express');
const UsersController = require('../../controllers/users.controller');
const BoardsController = require('../../controllers/boards.controller');
const router = express.Router();

const usersController = new UsersController();
const boardsController = new BoardsController();

router.get('/');

router.get('/login', async (req, res) => {
  const { email, password } = req.body;
  return res.render('login');
});

module.exports = router;
