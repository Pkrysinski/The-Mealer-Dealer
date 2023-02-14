// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// Initialize Recipe model (table) by extending off Sequelize's Model class
class Recipe extends Model {}
// set up fields and rules for Product model
Recipe.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //main_protein choices: beef, chicken, fish, pork, vegetarian, any
    main_protein: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prep_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cook_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }           
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe'
  }
);

module.exports = Recipe;
