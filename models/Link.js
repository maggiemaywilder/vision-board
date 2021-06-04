module.exports = (sequelize, DataTypes) => {
    // this is things added via manual entry
    const Link = sequelize.define('Link', {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        isVideo: DataTypes.BOOLEAN,
        isResearch: DataTypes.BOOLEAN,
        isInspiration: DataTypes.BOOLEAN,
        // adding isExperience for things like hands-on notes or links to social media posts, like I tried this and this was my experience
        isExperience: DataTypes.BOOLEAN
    });

    Link.associate = (models) => {
        Link.belongsTo(models.Board);

        Link.belongsToMany(models.Tag_Board, { through: 'Link_bridge' });
    };
    
    return Link;
};