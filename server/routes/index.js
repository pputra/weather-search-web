const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json('home');
});

module.exports = router;