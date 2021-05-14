module.exports = (sequelize, DataTypes) => {
  const ReceivedBooks = sequelize.define("ReceivedBooks", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return ReceivedBooks;
};
