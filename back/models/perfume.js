const DataTypes = require("sequelize");
const db = require(".");
const { associate } = require("./brand");
const { Model } = DataTypes;

module.exports = class Perfume extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        // brand: {
        //   type: DataTypes.STRING(50),
        //   allowNull: false,
        // },
        sex: {
          type: DataTypes.STRING(1),
          allowNull: false,
        },
        useYn: {
          type: DataTypes.STRING(1),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        topNote: {
          type: DataTypes.STRING(100),
        },
        middleNote: {
          type: DataTypes.STRING(100),
        },
        baseNote: {
          type: DataTypes.STRING(100),
        },
        pic1: {
          type: DataTypes.STRING(100),
        },
        pic2: {
          type: DataTypes.STRING(100),
        },
        liked: {
          type: DataTypes.STRING(50),
        }
      },
      {
        sequelize,
        modelName: "Perfume",
        tableName: "perfumes",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Perfume.belongsTo(db.Brand);
    db.Perfume.hasMany(db.Review);
    db.Perfume.belongsToMany(db.User, {through: 'user_perfume', foreignKey: 'perfume_id'});
  }
};
