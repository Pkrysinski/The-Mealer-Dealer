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
router.get('/meal_results/:total_time&:main_protein', withAuth, async (req, res) => {
    try {

      // Find the logged in user based on the session ID
      // const userData = await User.findByPk(req.session.user_id, {
      //   attributes: { exclude: ['password'] },
      //   include: [{ model: Recipe }],
      // });
      // const user = userData.get({ plain: true });

        if (req.params.main_protein === "Any") req.params.main_protein = "*";
        req.params.total_time = parseInt(req.params.total_time);
        console.log(req.params);
        const mealResults = await Recipe.findAll({
            //includes a column that has the summed prep and cook time for each meal
            // attributes: {
            //     include: [
            //         //     [ sequelize.fn('SUM', 
            //         //     where: {sequelize.col('prep_time'), '+', sequelize.col('cook_time') },
            //         //     'totalTime')
            //         // ]
            //         [sequelize.literal('(prep_time + cook_time)'),
            //             'totalTime'
            //         ]
            //     ]
            // },
            //filters out the meals by main protein, then by getting a less-than or equal-to comparison to the above summed total meal cook time.
            where: {
                main_protein: req.params.main_protein,
                total_time: {
                    [sequelize.lte]: req.params.total_time,
                }
            }
        });

        const meals = mealResults.map((meal) =>
            meal.get({ plain: true }));

        res.render('meal_results', {
            meals,
            logged_in: req.session.logged_in,            
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/meal_results', withAuth, async (req, res) => {
    try {
      // Pass serialized data and session flag into template
      res.render('meal_results', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;