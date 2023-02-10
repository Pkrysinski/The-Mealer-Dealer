const router = require('express').Router();
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');

router.use('/users', userRoutes);
router.use('/meals', mealRoutes);

module.exports = router;
