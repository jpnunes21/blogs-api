const BlogPostsSchema = (sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      defaultValue: 1
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  BlogPostsTable.associate = (models) => {
    BlogPostsTable.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPostsTable;
};

module.exports = BlogPostsSchema;