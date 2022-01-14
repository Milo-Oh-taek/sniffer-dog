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
};
