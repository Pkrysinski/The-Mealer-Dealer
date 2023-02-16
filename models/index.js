// import models
const User = require('./User');
const Recipe = require('./Recipe');
const UserToRecipe = require('./UserToRecipe');

// Recipe belongToMany User (through UserToRecipe)
Recipe.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserToRecipe,
    unique: false
  },
  as: 'meals_cooked'
});

// User belongToMany Recipes (through UserToRecipe)
User.belongsToMany(Recipe, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserToRecipe,
    unique: false
  },
  as: 'cooked_meals'
});



module.exports = {
  User,
  Recipe,
  UserToRecipe,
};


module.exports = { User, Recipe, UserToRecipe };