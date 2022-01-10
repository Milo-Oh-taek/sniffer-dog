const express = require('express');
const { Perfume, Brand } = require('../models');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try{
        const perfumeInfo = await Perfume.findOne({
            where: { id: req.params.id},
            include: [
                {
                    model : Brand,
                    attributes: ['id', 'name', 'website']
                }
            ]
        })

        res.status(200).json(perfumeInfo);
    }catch(err){
        console.error(err);
    }
    
})

// router.get('/', (req, res) => {
//     res.send('perfummmmmmmmmm');
    
// })

module.exports = router;