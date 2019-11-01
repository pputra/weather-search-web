const router = require('express').Router();
const weather = require('./weather.router');

router.get('/', (req, res) => {
  res.status(200).json('home');
});

router.use('/weather', weather);

module.exports = router;
