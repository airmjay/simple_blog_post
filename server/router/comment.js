const express = require('express')
const router = express.Router();
const {Comments} = require('../models');
const {verifyToken} = require('../middleware/AuthToken')
router.get('/:id', async (req, res) => 
    {
        const id  = req.params.id;
        let comment = await Comments.findAll({where : { postId : id}});   
        res.json(comment);     
    })
router.post('/', verifyToken , async (req,res)=>
    {
      const body =  req.body;
      body.username = req.user.username;
      const create = await Comments.create(body);
      res.json(create);
    })
router.delete('/:id', verifyToken, async (req,res)=> 
    {
        const del = req.params.id;
        req.user.username
        await Comments.destroy({where :{ id: del }});
        res.json("comment delete");
    })

module.exports = router;