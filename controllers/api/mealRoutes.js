const router = require('express').Router();
const { User, UserToRecipe, Recipe } = require('../../models');
const sequelize = require('sequelize');
const withAuth = require('../../utils/auth');

//Build meal routes
router.get('/build_your_meal', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Recipe }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('build_your_meal', {
        ...user,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


//Get meal results
// router.post('/meal_results', async (req, res) => {
router.get('/meal_results', async (req, res) => {
    try {
        if (req.body.mainProtein === "Any") req.body.mainProtein = "*";
        const mealResults = await Recipe.findAll({
            //includes a column that has the summed prep and cook time for each meal
            attributes: {
                include: [
                    //     [ sequelize.fn('SUM', 
                    //     where: {sequelize.col('prepTime'), '+', sequelize.col('cookTime') },
                    //     'totalTime')
                    // ]
                    [sequelize.literal('(prep_time + cook_time)'),
                        'totalTime'
                    ]
                ]
            },
            //filters out the meals by main protein, then by getting a less-than or equal-to comparison to the above summed total meal cook time.
            where: {
                mainProtein: req.body.mainProtein,
                // totalTime: {
                //     [sequelize.lte]: req.body.totalTime,
                // }
            }
        });

        const meals = mealResults.map((meal) =>
            meal.get({ plain: true }));

            res.json(meals);
        // res.render('meal_results', {
        //     meals,
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;