module.exports = (sequelize, DataTypes) => {
    // this is things added via manual entry
    const Link = sequelize.define('Link', {
        type: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    });

    Link.associate = (models) => {
        Link.belongsTo(models.Board);

        Link.hasMany(models.Tag);
    };
    return Link;
};