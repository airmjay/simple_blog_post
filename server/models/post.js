const sequelize = require('sequelize')
module.exports = (sequelize,DataTypes) => 
    {
        const posts = sequelize.define('posts', {
            title : 
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PostBody: 
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username : 
            {
                type: DataTypes.STRING,
                allowNull: false,
            },
        })

        posts.associate = (models) => 
            {
                posts.hasMany(models.Comments, {
                    onDelete : "cascade"
                })
                posts.hasMany(models.Likes, 
                {
                        onDelete : "cascade"
                })
            }
        return posts;
    }