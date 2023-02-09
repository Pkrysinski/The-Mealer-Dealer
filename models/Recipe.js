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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },      
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },          
    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
    },     
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },           
    prepTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
    cookTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },           
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