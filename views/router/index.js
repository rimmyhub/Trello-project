const express = require('express');
const router = express.Router();

router.get('/main', async (req, res) => {
  return res.render('main');
});

router.get('/login', async (req, res) => {
  return res.render('login');
});

router.get('/signup', async (req, res) => {
  return res.render('signup');
});

router.get('/:boardId', async (req, res) => {
  return res.render('column');
});

router.get('/cards/:cardId', async (req, res) => {
  return res.render('card');
});

module.exports = router;
