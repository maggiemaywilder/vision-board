module.exports = (sequelize, DataTypes) => {
    // added from pixaby
    const Image = sequelize.define('Image', {
        text: DataTypes.BLOB,
        url: DataTypes.STRING,
    });
// would want to switch to document management system if app got too big, ie too many images saved
    Image.associate = (models) => {
        Image.belongsTo(models.Board);

        Image.hasMany(models.Tag);
    };
    return Image;
};