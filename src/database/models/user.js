const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { timestamps: false });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogpost' });
  };

  return UserTable;
};

module.exports = UserSchema;