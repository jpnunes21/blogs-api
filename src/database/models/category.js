const CategoriesSchema = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('Category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, { timestamps: false });

  return CategoriesTable;
};

module.exports = CategoriesSchema;
