
module.exports = (sequelize, DataTypes) => {
    // this is the junction table for tags
    const TagBridge = sequelize.define('TagBridge', {
        tagID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boardID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        uploadID: DataTypes.INTEGER,
        imageID: DataTypes.INTEGER,
        manualEntryID: DataTypes.INTEGER
    });
    // because upload, image, and manual entry all belong to a board, when a tag is added to one of them it should also be added to the board. trying to look to possible future development and searching based on tags

    TagBridge.associate = (models) => {
        TagBridge.belongsTo(models.Board);
        TagBridge.belongsTo(models.Tag);
        // I'm not 100% on the associations of not mandatory columns, so this may need to change
        TagBridge.belongsTo(models.Upload);
        TagBridge.belongsTo(models.Image);
        TagBridge.belongsTo(models.ManualEntry);
    };

    return TagBridge;
};