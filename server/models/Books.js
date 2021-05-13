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
    materialType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    isReservation: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  });

  return Books;
};
