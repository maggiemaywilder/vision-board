
module.exports = (sequelize, DataTypes) => {
    // this is the junction table for tags to Boards
    const Tag_Board = sequelize.define('Tag_Board', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });

    // because upload, image, and manual entry all belong to a board, when a tag is added to one of them it should also be added to the board. trying to look to possible future development and searching based on tags
    Tag_Board.associate = (models) => {
        Tag_Board.belongsToMany(models.ManualEntry, { through: 'Manual_bridge' });
        Tag_Board.belongsToMany(models.Upload, { through: 'Upload_bridge' });
        Tag_Board.belongsToMany(models.Image, { through: 'Image_bridge' });
    };

    return Tag_Board;
};