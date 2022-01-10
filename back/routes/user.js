const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Perfume, UserPerfume } = require("../models");
const { Op } = require("sequelize");
// const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.send(info.message);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const userInfo = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        
      });
      const likePerfume = await UserPerfume.findAll({
        where: { user_id: user.id }
      })

      userInfo.userPerfume = likePerfume;

      return res.status(200).json(userInfo);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body.data;

    const existuser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { nickname: nickname }],
      },
    });

    if (existuser && existuser.email === email) {
      return res.send("email already exists");
    } else if (existuser && existuser.nickname === nickname) {
      return res.send("nickname already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      nickname: nickname,
      password: hashedPassword,
    });

    return res.status(201).send("ok");
  } catch (err) {
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  
  try {
    if (!req.user) {
      return res.send(null);
    }
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).send(user);

  } catch (err) {
    console.error(err);
  }
});

router.post("/perfume/like", async (req, res) => {
  try {
    const { perfumeId, userId } = req.body.data;

    if (!perfumeId || !userId) {
      return res.status(403).send();
    }

    const where = {
      perfume_id: perfumeId,
      user_id: userId,
    };

    const exist = await UserPerfume.findOne({
      where,
    });
    if (exist) {
      console.log("yes");
      await UserPerfume.destroy({
        where,
      });
    } else {
      console.log("no");
      await UserPerfume.create({
        perfume_id: perfumeId,
        user_id: userId,
      });
    }

    return res.status(200).send();
  } catch (err) {
    console.error(err);
  }
});

router.get("/like/:userId", async (req, res) => {
  try {
    
    const data = await UserPerfume.findAll({
      attributes: [ 'perfume_id' ],
      raw: true,
      where: { user_id : req.params.userId }
    });

    let result = data.map(p => p.perfume_id);

    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/nickname", async (req, res) => {
  try {
    const exist = await User.findOne({
      where: { nickname: req.body.nickname }
    });

    if(exist){
      return res.status(200).send('exist');
    }
    
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    });

    return res.status(200).send({nickname: req.body.nickname});
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
