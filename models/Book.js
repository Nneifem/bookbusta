const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    categories: { //genre
      type: DataTypes.STRING,
    },
    thumbnail: { //image
      type: DataTypes.STRING,
    },
    description: { //summary
      type: DataTypes.TEXT,
    },
    published_year: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    average_rating: { 
      type: DataTypes.DECIMAL,
    },
    page_count: {
      type: DataTypes.INTEGER,
    },
    buyLink: { //buy book link
      type: DataTypes.STRING,
    },
    canonicalVolumeLink: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;
