const express = require('express')
const { verifyToken } = require('../middleware/AuthToken')
const router = express.Router()
const {Likes} = require('../models')
router.post('/', verifyToken, async (req,res)=>
    {
        const {postId} = req.body;
        const userId = req.user.id;
        const findLike = await Likes.findOne({where : {postId : postId , UserId : userId}})
        if(!findLike){
        await Likes.create({postId:postId, UserId: userId});
        res.json({like: true})
        }else{
          await Likes.destroy({where: {postId: postId, UserId : userId}})
            res.json({like: false})
            
        }
    
    })
module.exports =  router