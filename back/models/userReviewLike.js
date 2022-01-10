const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class userReviewLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        review_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "userReviewLike",
        tableName: "user_review_like",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.UserReviewLike.belongsToMany(db.User, {
    //   through: 'user_review_like', foreignKey: 'user_id'
    // });
    // db.UserReviewLike.belongsToMany(db.Review, {
    //   through: 'user_review_like', foreignKey: 'review_id'
    // });
    // db.UserReviewLike.belongsToMany(db.User, {through: 'user_review'});
    // db.UserReviewLike.belongsTo(db.User);
    // db.UserReviewLike.belongsTo(db.Review);\
    // db.UserReviewLike.belongsToMany(db.User, {through:'userReviewLike'});

  }
};
