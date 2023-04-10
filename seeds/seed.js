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


[
  {
      "name": "University of Utah",
      "image": "",
      "region": "Western"
  },

  {
      "name": "San Diego State University",
      "image": "",
      "region": "Western"
  },

  {
      "name": "University of Oregon",
      "image": "",
      "region": "Western"
  },

  {
      "name": "Arizona State University",
      "image": "",
      "region": "Western"
  },

  {
      "name": "Boston College",
      "image": "",
      "region": "Eastern"
  },

  {
      "name": "Florida State University",
      "image": "",
      "region": "Eastern"
  },

  {
      "name": "Harvard",
      "image": "",
      "region": "Eastern"
  },

  {
      "name": "Duke",
      "image": "",
      "region": "Eastern"
  },
]