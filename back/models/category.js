const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        useYn: {
          type: DataTypes.STRING(1),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        pic1: {
          type: DataTypes.STRING(100),
        },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "categories",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Note);
  }
};
