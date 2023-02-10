const sequelize = require('../config/connection');
const { Recipe, UserToRecipe, User } = require('../models');

const recipeData = require('./recipeData.json');
const userToRecipeData = require('./userToRecipeData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const recipes = await Recipe.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });

  const userToRecipes = await UserToRecipe.bulkCreate(userToRecipeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

// www.themealdb.com/api/json/v1/1/random.php for random recipes to seed. Missing servings and cook/prep time.