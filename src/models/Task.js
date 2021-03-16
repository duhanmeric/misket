module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
    editing: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Task;
};
