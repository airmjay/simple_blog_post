const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {Users} = require('../models');
const {sign} = require('jsonwebtoken');
const { verifyToken } = require('../middleware/AuthToken');
router.post('/', async (req,res)=>
    {
        const {username, password}  = req.body
        await bcrypt.hash(password, 10).then((hash) => 
            {
             Users.create({
                    username : username,
                    password : hash
                })
            })
        res.json("success")
    })
router.post('/login', async(req,res)=>
    {
        const {username, password} =  req.body;
        const user = await Users.findOne({where : {username : username}});
        if(user){
        bcrypt.compare(password, user.password).then((response)=>{
            if(!response)
                {
                  res.json({error: "Wrong imformation provided"})
                }else
                {
                    const token = sign({username: username, password : user.password, id: user.id},
                        "importantToken"
                    )
                    res.json({token: token, username: username, id : user.id})
                }
        })
        }else
        {
            res.json({error: "Wrong imformation provided"})
        }
    })
router.get('/', verifyToken, (req,res)=>
    {
        res.json(req.user);
    })


module.exports =  router; 