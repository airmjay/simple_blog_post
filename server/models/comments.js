
module.exports = (sequelize,DataTypes) => {
    const Comments = sequelize.define('Comments', {
    
        comments : 
        {
            type : DataTypes.STRING,
            allowNull: false,
        },
        username : 
        {
            type : DataTypes.STRING,
        }
    
})
     return Comments;
}