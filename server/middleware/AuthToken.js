const {verify}  = require('jsonwebtoken')
const verifyToken = (req,res,next) => 
    {
    const accessToken = req.header("accessToken");
    if(!accessToken)
    {
        res.json({error: "user not login"})

        
    } 
    try{
        const validToken = verify(accessToken, 'importantToken');
        req.user = validToken;
        if(validToken)
            {
                return next();
            }else
            {
                res.json({error: "error occur"})
            }
        }catch(err)
        {
            res.json({error : err})
        }
    }
module.exports = {verifyToken}

