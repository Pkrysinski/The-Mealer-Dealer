const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserToRecipe extends Model {}

UserToRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipe',
        key: 'id',
      },
    },    
    //Adding this field so that a user can mark recipes as "cooked", but it should only mark it for them and not anyone else.
    cooked: {
        type: DataTypes.BOOLEAN,
    },    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_to_recipe',
  }
);

module.exports = UserToRecipe;
