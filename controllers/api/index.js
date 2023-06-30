const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const commentRoutes = require("./commentRoutes");
const seedDbRoute = require('./seedDb');

router.use('/users', userRoutes);
router.use('/book', bookRoutes);
router.use('/seedDb', seedDbRoute);
router.use("/comment", commentRoutes);

module.exports = router;
