const express = require('express');
const router = express.Router();

// router.get();

router.get('/login', async (req, res) => {
  const { email, password } = req.body;
  return res.render('login');
});

module.exports = router;
