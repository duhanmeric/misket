const bcrypt = require("bcrypt");

async function hashPassword(user, options) {
  const SALT_FACTOR = 8;

  if (!user.changed("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(user.password, salt, null);
  user.setDataValue("password", hash);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: "https://i.hizliresim.com/AXt9tf.png",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );

  User.associate = function (models) {
    User.hasOne(models.Ticket);
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };

  return User;
};
