const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");


module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
      },
       async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          console.log('여기?');
          if (!user) {
              console.log('email없어')
            return done(null, false, { message: "not registered email" });
          }
          const result = await bcrypt.compare(password, user.password);
          if(!result){
              return done(null, false, { message:"wrong password" })
          }
          console.log('비밀번호일치!!!!!!!!!!!!!!!!')
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
