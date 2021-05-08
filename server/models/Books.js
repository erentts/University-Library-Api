module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Books;
};
