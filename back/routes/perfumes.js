const express = require("express");
const { Op } = require("sequelize");

const { Perfume, Brand, UserPerfume } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const where = {};
    const query = req.query;
    let offset = 0;

    let { page, brand, gender, keyword } = query;

    if (page > 1) {
      offset = 12 * (page - 1);
    }

    if (keyword) {
      where.name = { [Op.like]: "%" + keyword + "%" };
    }

    if (brand) {
      if (brand.indexOf(",") !== -1) {
        brand = brand.split(",");
        where.brand_id = { [Op.or]: brand };
      } else {
        where.brand_id = brand;
      }
    }
    if (gender) {
      if (gender.indexOf(",") !== -1) {
          gender = gender.split(",");
          where.sex = { [Op.or]: gender };
      } else {
        where.sex = gender;
      }
    }

    const perfumes = await Perfume.findAndCountAll({
      where,
      offset: offset,
      limit: 12,
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(perfumes);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const perfumes = await UserPerfume.findAndCountAll({
      where: { user_id: userId },
      attributes: {
        exclude: ["user_id", "perfume_id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Perfume,
          include: [{ model: Brand }],
        },
      ],
    });

    if (perfumes.rows) {
      perfumes.rows = perfumes.rows.map((p) => p.Perfume);
    }

    res.status(200).json(perfumes);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
