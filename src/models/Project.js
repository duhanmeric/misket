module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled",
      unique: false,
    },
    editing: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: false,
    },
  });

  Project.associate = function (models) {
    Project.hasMany(models.Task);
  };

  return Project;
};
