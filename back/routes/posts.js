const express = require('express');
const { Op } = require("sequelize");

const { Post, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const lastId = req.query.lastId;
        const where = {};

        if(parseInt(lastId, 10)){
            where.id = { [Op.lt]: parseInt(lastId, 10)}
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname']
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }],
                },

            ]
        })

        res.status(200).send(posts);

    } catch (error){
        console.error(error);
    }
    
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const exist = User.findOne({
            where : { id: userId}
        });
        if(!exist){
            return res.status(200).send(posts);
        }

        const posts = await Post.findAll({
            where: { 'user_id': userId },
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname']
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }],
                },

            ]
        })

        res.status(200).send(posts);

    } catch (error){
        console.error(error);
    }
    
})

router.post('/', async (req, res) => {
    try {
        const { UserId, content } = req.body;

        if(!UserId || !content){
            return res.status(200).send();
        }
        
        const post = await Post.create({
            UserId,
            content,
        })

        const newPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }],
                },
            ]
        })

        res.status(201).send(newPost);

    } catch (error){
        console.error(error);
    }
});

router.post('/comment', async (req, res) => {
    try {
        const { UserId, content, PostId } = req.body;

        if(!UserId || !content || !PostId){
            return res.status(200).send();
        }

        const existPost = await Post.findOne({
            where: { id: PostId},
        });

        if(!existPost){
            return res.status(403).send();
        }
        
        const comment = await Comment.create({
            UserId,
            PostId,
            content,
        })

        const newComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }]
        })

        res.status(201).send(newComment);

    } catch (error){
        console.error(error);
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        await Post.destroy({
            where: {
                id: postId,
                UserId: req.user.id,
            }
        })

        res.status(200).send(postId);

    } catch (error){
        console.error(error);
    }
})


module.exports = router;