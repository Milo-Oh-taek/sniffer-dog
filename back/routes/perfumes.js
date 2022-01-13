const express = require('express');
const { Op } = require("sequelize");

const { Perfume, Brand, UserPerfume } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const where = {};
        const query = req.query;
        let offset = 0;

        const { page, brand, gender, keyword } = query;

        if(page > 1){
            offset = 12 * (page - 1);
        }
     
        if(keyword){
            where.name = { [Op.like]: '%'+keyword+'%' };
        }
        if(brand){
            if(typeof brand === 'string'){
                where.brand_id = brand;
            } else {
                where.brand_id = { [Op.or]: brand };
            }
        }
        if(gender){
            if(typeof gender === 'string'){
                where.sex = gender;
            } else {
                where.sex = { [Op.or]: gender };
            }
        }

        const perfumes = await Perfume.findAndCountAll({
            where,
            offset: offset,
            limit: 12,
            include: [
                {
                    model : Brand,
                    attributes: ['id', 'name']
                }
            ]
            
        });

        res.status(200).json(perfumes);

    } catch (error){
        console.error(error);
    }
    
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const perfumes = await UserPerfume.findAndCountAll({
            where: { 'user_id': userId },
            attributes: {exclude: ['user_id','perfume_id','createdAt','updatedAt']},
            include: [
                {
                    model : Perfume,
                    include:[{model: Brand}]
                }
            ]
        });

        if(perfumes.rows){
            perfumes.rows = perfumes.rows.map(p => p.Perfume);
        }

        res.status(200).json(perfumes);

    } catch (error){
        console.error(error);
    }
    
})

module.exports = router;