const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class userReviewDislike extends Model {
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
        modelName: "userReviewDislike",
        tableName: "user_review_dislike",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
