const express = require('express');
const router = express.Router();

router.get('/main', async (req, res) => {
  return res.render('main');
});

router.get('/login', async (req, res) => {
  return res.render('login');
});

module.exports = router;
