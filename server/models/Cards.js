module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define("Cards", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Cards;
};
