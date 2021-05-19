module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        tagName: DataTypes.STRING
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Board, { through: 'Tag_Board'});

    };

    return Tag;
};