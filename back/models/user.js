const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        useYn: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue: "Y",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Review);
    db.User.belongsToMany(db.Perfume, {through: 'user_perfume'});
    db.User.belongsToMany(db.Review, {through: 'user_review_like', foreignKey: 'user_id'});
    db.User.belongsToMany(db.Review, {through: 'user_review_dislike', foreignKey: 'user_id'});


  }
};
