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

router.get('/column/:boardId', async (req, res) => {
  return res.render('column');
});

router.get('/card/:cardId', async (req, res) => {
  return res.render('card');
});

router.get('/card-edit/:cardId', async (req, res) => {
  return res.render('card-edit');
});

router.get('/comment/:cardId', async (req, res) => {
  return res.render('comment');
});

router.get('/comment-edit/:commentId', async (req, res) => {
  return res.render('comment-edit');
});

module.exports = router;
