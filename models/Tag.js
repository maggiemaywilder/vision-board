module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        tagName: DataTypes.STRING
    });

    Tag.associate = (models) => {
        Tag.belongsTo(models.Board)
    };

    return Tag;
};