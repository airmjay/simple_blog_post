const express = require('express');
const app = express();
const db = require('./models');
const sequelize = require('sequelize')
const cors = require('cors')
app.use(cors())
app.use(express.json())
db.sequelize.sync().then(()=>
{
    app.listen('3001',(()=>
        {
            console.log("server start running on port 3001")
        }))
})
//route
const PostRouter = require('./router/post')
const CommentRouter = require('./router/comment')
const UserRouter = require('./router/user')
const LikeRouter = require('./router/like')
// middleware
app.use('/post', PostRouter); 
app.use('/comment', CommentRouter);
app.use('/user', UserRouter);
app.use('/like', LikeRouter);

