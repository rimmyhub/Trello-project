const express = require('express');
const UsersController = require('../../controllers/users.controller');
const router = express.Router();

const usersController = new UsersController();

router.get('/login', (req, res) => {
  const data = await.usersController.logIn(email, password);
  return res.render('login', { data });
});

module.exports = router;
