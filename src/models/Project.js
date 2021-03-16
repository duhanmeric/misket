module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled",
      unique: false,
    },
  });

  return Project;
};
