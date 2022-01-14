const express = require("express");
const { Op, fn, col, query, literal } = require("sequelize");
const sequelize = require("sequelize");
const { Col } = require("sequelize/dist/lib/utils");

const { Perfume, Review, User, UserReviewLike, UserReviewDislike, Brand } = require("../models");

const router = express.Router();

/*find review statistics by perfume id */
router.get("/statistics/:id", async (req, res) => {
  try {
    const where = {};
    const query = req.params;

    if (query.id) {
      where.PerfumeId = query.id;
    }

    const avgInfo = await Review.findAll({
      where,
      raw: true,
      attributes: [
        [fn("AVG", col("longevity")), "longevityAVG"],
        [fn("AVG", col("sillage")), "sillageAVG"],
        [fn("AVG", col("male")), "maleAVG"],
        [fn("AVG", col("female")), "femaleAVG"],
        [fn("AVG", col("value")), "valueAVG"],
        [fn("AVG", col("overall")), "overallAVG"],
      ],
    });

    const scoreInfo = await Review.findAll({
      where,
      raw: true,
      attributes: ["overall", [fn("COUNT", col("overall")), "overallCnt"]],
      group: ["overall"],
      order: [["overall", "ASC"]],
    });

    const cntInfo = [0, 0, 0, 0, 0];

    scoreInfo.forEach((s) => {
      cntInfo[Number(s.overall) - 1] = s.overallCnt;
    });

    const statistics = {};
    statistics.avgInfo = avgInfo;
    statistics.cntInfo = cntInfo;

    res.status(200).send(statistics);
  } catch (error) {
    console.error(error);
  }
});

/*find review List by perfume id */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { page, sortby } = req.query;

    const where = {};
    where.PerfumeId = id;

    let limit = 0;
    if(page){
      limit = page * 5;
    }

    let order = [["createdAt", "DESC"]];
    if (sortby) {
      switch (sortby) {
        case "helpful":
          order[0][0] = "liked";
          break;
        case "high":
          order[0][0] = "overall";
          break;
        case "low":
          order[0][0] = "overall";
          order[0][1] = "ASC";
          break;
        case "old":
          order[0][0] = "createdAt";
          order[0][1] = "ASC";
          break;
      }
    }

    const reviewList = await Review.findAndCountAll({
      where,
      limit,
      order,
      include: [
        {
          model: Perfume,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["nickname"]
        },
      ],
    });

    res.status(200).send(reviewList);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const reviewList = await Review.findAndCountAll({
      where:{ 'user_id': userId},
      include: [
        {
          model: Perfume,
          attributes: ["id", "name", "pic1"],
          include: [{
              model: Brand,
              attributes: ['id', 'name']
            }]
        },
        {
          model: User,
          attributes: ["nickname"]
        },
      ],
    });

    res.status(200).send(reviewList);
  } catch (error) {
    console.error(error);
  }
});

/*post review */
router.post("/", async (req, res) => {
  try {

    const { userId, perfumeId, title, text, longevity, sillage, male, female, value, overall } = req.body;

    if(!userId || !perfumeId){
      return res.status(200).send();
    }

    await Review.create({
      userId,
      perfumeId,
      content: text,
      longevity,
      sillage,
      male,
      female,
      value,
      overall,
      title,
    });

    res.status(201).send();

  } catch (error) {
    console.error(error);
  }
});

/*like review */
router.post("/like", async (req, res) => {
  try {

    const reviewId = req.body.reviewId;
    const userId = req.body.userId;

    const existChk = await UserReviewLike.findOne({
      where: {
        review_id: reviewId,
        user_id: userId,
      },
      raw: true,
    });

    if(existChk){
      return res.status(200).send();
    }

    await UserReviewLike.create({
      review_id: reviewId,
      user_id: userId,
    });

    await Review.increment({
      liked: 1
    }, {
      where: { id: reviewId }
    });
    

    res.status(201).send();

  } catch (error) {
    console.error(error);
  }
});

/*dislike review */
router.post("/dislike", async (req, res) => {
  try {
    const reviewId = req.body.reviewId;
    const userId = req.body.userId;

    const existChk = await UserReviewDislike.findOne({
      where: {
        review_id: reviewId,
        user_id: userId,
      },
      raw: true,
    });


    if(existChk){
      return res.status(200).send();
    }

    await UserReviewDislike.create({
      review_id: reviewId,
      user_id: userId,
    });

    await Review.increment({
      disliked: 1
    }, {
      where: { id: reviewId }
    });

    res.status(201).send();

  } catch (error) {
    console.error(error);
  }
});

router.patch("/:reviewId", async (req, res) => {
  try {
    console.log(req.body);
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const title = req.body.title;
    const content = req.body.content;

    const existChk = await Review.findOne({
      where: {
        id: reviewId,
        user_id: userId,
      },
    });

    if(!existChk) return res.status(200).send('error');

    await Review.update({
      title,
      content,
    },{
      where: { id: reviewId }
    });

    res.status(200).send();

  } catch (error) {
    console.error(error);
  }
});



module.exports = router;
