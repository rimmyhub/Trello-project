const express = require('express');
const UsersController = require('../../controllers/users.controller');
const BoardsController = require('../../controllers/boards.controller');
const router = express.Router();

const usersController = new UsersController();
const boardsController = new BoardsController();

router.get('/');

router.get('/login', (req, res) => {
  const data = await.usersController.logIn(email, password);
  return res.render('login', { data });
});

module.exports = router;
