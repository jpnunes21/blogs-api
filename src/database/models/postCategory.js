const PostCategoriesSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
      { timestamps: false, tableName: 'PostCategories' }
  );

  PostCategoriesTable.associate = (models) => {

      models.BlogPost.belongsToMany(models.Category, {
          through: PostCategoriesTable,
          foreignKey: 'postId',
          otherKey: 'categoryId',
          as: 'categories'
      });

      models.Category.belongsToMany(models.BlogPost, {
          through: PostCategoriesTable,
          foreignKey: 'categoryId',
          otherKey: 'postId',
          as: 'posts'
      });

  }
  
  return PostCategoriesTable;
}
  
module.exports = PostCategoriesSchema;
