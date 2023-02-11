const router = require('express').Router();
const { User, UserToRecipe, Recipe } = require('../../models');
const sequelize = require('sequelize');

//Build meal routes

//Get meal results
router.post('/meal_results', async (req, res) => {
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