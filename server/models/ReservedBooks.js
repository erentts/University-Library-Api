module.exports = (sequelize, DataTypes) => {
  const ReservedBooks = sequelize.define("ReservedBooks", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return ReservedBooks;
};
