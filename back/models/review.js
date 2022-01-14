const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        longevity: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        sillage: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        male: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        female: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        overall: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        liked: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        disliked: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        useYn: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue: "Y",
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        perfumeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Review",
        tableName: "reviews",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
      db.Review.belongsTo(db.Perfume);
      db.Review.belongsTo(db.User);
      db.Review.belongsToMany(db.User, {through: 'user_review_like', foreignKey: 'review_id'});
      db.Review.belongsToMany(db.User, {through: 'user_review_dislike', foreignKey: 'review_id'});
  }
};
