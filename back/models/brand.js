const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Brand extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        website: {
          type: DataTypes.STRING(50),
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
        pic2: {
          type: DataTypes.STRING(100),
        },
      },
      {
        sequelize,
        modelName: "Brand",
        tableName: "brands",
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Brand.hasMany(db.Perfume);
  }
};
