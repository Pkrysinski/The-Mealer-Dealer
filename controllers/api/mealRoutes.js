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
      // include: [{ model: Recipe }],
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
        include: [
          {
            model: UserToRecipe,
            attributes: ['cooked'],    
            where: {
              user_id: req.session.user_id,
            },
            required: false,
          },
        ],                
        where: {
          // sequelize.Op.lte = less than equal
          total_time: {
            [sequelize.Op.lte]: req.params.total_time,
          }
        }
      });
    } else {
      mealResults = await Recipe.findAll({
        include: [
          {
            model: UserToRecipe,
            attributes: ['cooked'],      
            where: {
              user_id: req.session.user_id,
            },                  
          },
        ],             
        where: {
          main_protein: req.params.main_protein,
          // sequelize.Op.lte = less than equal
          total_time: {
            [sequelize.Op.lte]: req.params.total_time,
          }
        }
      });
    }

    const meals = mealResults.map((meal) =>
      meal.get({ plain: true }));

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

router.get('/meal_history', withAuth, async (req, res) => {
  try {

    const userHistory = await Recipe.findAll({
      // include: [{ model: User, through: UserToRecipe, as: 'meals_cooked', where: { id: req.session.user_id }  }],
      include: [{ model: UserToRecipe, where: { user_id: req.session.user_id, cooked: true }  }],
    });

    const history = userHistory.map((cookedMeal) =>
      cookedMeal.get({ plain: true }));

    res.render('meal_history', {
      history,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/meal_history/:id', withAuth, async (req, res) => {
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

router.put('/meal_results/:id', withAuth, async (req, res) => {  
  // Need to first check here to see if a user_to_recipe exists to update, before updating.
  // If not, we need to create one.
  try {
    const [user_to_recipe, created] = await UserToRecipe.findOrCreate({
      where: {
        user_id: req.session.user_id,
        recipe_id: req.params.id,
      },
      defaults: {
        cooked: true,
      },
    });

    if (created === false) {
      const update = await UserToRecipe.update(
        {
          cooked: req.body.cooked,
        },
        {
          where: {
            user_id: req.session.user_id,
            recipe_id: req.params.id,
          },
        },
      )
      res.status(200).json(update);
    } else {
      res.status(200).json("Successful cooked update!");
    };


  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;