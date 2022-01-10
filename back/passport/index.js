const passport = require('passport');
const local = require('./local');
const { User } = require("../models");

module.exports = () => {
    passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
        console.log('serializeUser');
        done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
      try {
        console.log('deserializeUser');
        const user = await User.findOne({ where: { id }});
        
        done(null, user); // req.user
      } catch (error) {
        console.log('에러다')
        console.error(error);
        done(error);
      }
    });
  
    local();
  };