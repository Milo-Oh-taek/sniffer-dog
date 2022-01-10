const Sequelize = require('sequelize');
const brand = require('./brand');
const category = require('./category');
const note = require('./note');
const perfume = require('./perfume');
const review = require('./review');
const post = require('./post');
const comment = require('./comment');
const user = require('./user');
const userPerfume = require('./userPerfume');
const userReviewLike = require('./userReviewLike');
const userReviewDislike = require('./userReviewDislike');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Brand = brand;
db.Category = category;
db.Note = note;
db.Perfume = perfume;
db.Review = review;
db.Post = post;
db.Comment = comment;
db.User = user;
db.UserPerfume = userPerfume;
db.UserReviewLike = userReviewLike;
db.UserReviewDislike = userReviewDislike;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;

module.exports = db;
