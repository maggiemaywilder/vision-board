
module.exports = (sequelize, DataTypes) => {
    // this is things added via dropzone
    const ManualEntry = sequelize.define('ManualEntry', {
        text: DataTypes.STRING(1234),
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isVideo: DataTypes.Boolean,
        isResearch: DataTypes.Boolean,
        isInspiration: DataTypes.Boolean,
        // adding isExperience for things like hands-on notes or links to social media posts, like I tried this and this was my experience
        isExperience: DataTypes.Boolean
    });

    ManualEntry.associate = (models) => {
        ManualEntry.belongsTo(models.Board);

        ManualEntry.hasMany(models.TagBridge);

    };
    return ManualEntry;
};