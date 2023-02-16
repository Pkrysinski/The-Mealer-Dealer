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
    console.log("req params: ", req.params);

    req.params.total_time = parseInt(req.params.total_time);

    let mealResults; 

    if (req.params.main_protein === "any") {
      mealResults = await Recipe.findAll({
        where: {
          // sequelize.Op.lte = less than equal
          total_time: {
            [sequelize.Op.lte]: req.params.total_time,
          }
        }
      });
    } else {
      mealResults = await Recipe.findAll({
        where: {
          main_protein: req.params.main_protein,
          // sequelize.Op.lte = less than equal
          total_time: {
            [sequelize.Op.lte]: req.params.total_time,
          }
        }
      });
    }

    //console.log("Raw query output: ", mealResults);

    const meals = mealResults.map((meal) =>
      meal.get({ plain: true }));

    //console.log("rendering meal_results with data: ", meals);

    res.render('meal_results', {
      meals,
      logged_in: req.session.logged_in,
    });
    
    // res.json(meals);
    console.log("Finished rendering meal_results");

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/meal_results/:id', withAuth, async (req, res) => {
  try {

    const mealResult = await Recipe.findOne({
      where: {
        id: req.params.id
      }
    });

    const recipe = mealResult.get({ plain: true });

    res.render('recipe_result', {
      recipe
    });

  } catch (err) {
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

router.get('/meal_history', async (req, res) => {
  try {

    const userHistory = await UserToRecipe.findAll({
      include: [{ model: Recipe }],
      where: {
        user_id: req.session.user_id,
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;