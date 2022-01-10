const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class userPerfume extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        perfume_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "userPerfume",
        tableName: "user_perfume",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.UserPerfume.belongsTo(db.User, {
      foreignKey: 'user_id'
    });
    db.UserPerfume.belongsTo(db.Perfume, {
      foreignKey: 'perfume_id'
    });
  }
};
