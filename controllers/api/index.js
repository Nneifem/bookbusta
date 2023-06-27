const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const seedDbRoute = require('./seedDb');

router.use('/users', userRoutes);
router.use('/book', bookRoutes);
router.use('/seedDb', seedDbRoute);

module.exports = router;
