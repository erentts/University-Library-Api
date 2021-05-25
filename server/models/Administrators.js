module.exports = (sequelize, DataTypes) => {
  const Administrators = sequelize.define("Administrators", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentAndOfficerMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    academicianMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentAndOfficerMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    academicianMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentAndOfficerMaxBooksCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    academicianMonthMaxBooksCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Administrators;
};
