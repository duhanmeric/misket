module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    ticket: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return Ticket;
};
