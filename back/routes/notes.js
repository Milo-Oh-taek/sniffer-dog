const express = require('express');
const { Op } = require("sequelize");

const { Perfume, Note } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const where = {};
        const query = req.query;

        const notes = await Note.findAll({
            where,
        });

        res.status(200).send(notes);

    } catch (error){
        console.error(error);
    }
    
})

module.exports = router;