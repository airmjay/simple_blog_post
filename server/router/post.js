const express = require('express')
const router = express.Router();
const {posts} = require('../models');
const {Likes} = require('../models');
const { verifyToken } = require('../middleware/AuthToken');
router.get('/', verifyToken, async (req,res)=>
    {
        const data = await posts.findAll({include: [Likes]});
        const listOfLike = await Likes.findAll({where: {UserId : req.user.id}});
        res.json({data, listOfLike : listOfLike})
    })
router.post('/', verifyToken , async (req,res)=>
    {
        const body = req.body;
        await posts.create(body);
        res.json(body)
    })
router.get(`/ById/:id`, async (req,res)=>
    {
        try{
        const key = req.params.id;
        const post = await posts.findByPk(key);
        if(!post){ 
        res.json({empty: "Not Post Found in database"})
        }else{
        res.json(post);
        }
        }catch(err)
        {
            res.json(err)
        }
    })
router.post('/changeTitle', verifyToken ,async (req,res)=>
    {
           const {id,title}  = req.body 
           await posts.update({title: title},{where: {id:id}})
           res.json("Post Title Updated"); 
    })
router.post('/changeBody', verifyToken ,async (req,res)=>
        {
               const {id,PostBody}  = req.body  
               await posts.update({PostBody: PostBody},{where: {id:id}})
               res.json("Post Body Updated");
        })
router.delete('/:id', async (req,res)=>
    {
        const id =  req.params.id;
        await posts.destroy({where: {id : id}});
        res.json("Post Deleted");
    })
module.exports = router;