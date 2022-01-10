const express = require('express');
const { Op } = require("sequelize");

const { Brand } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {

    try{
        const brands = await Brand.findAndCountAll({});
        res.status(200).json(brands);

    }catch(err){
        console.error(err);
    }
    
})

module.exports = router;