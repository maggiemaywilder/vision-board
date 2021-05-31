module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        text: DataTypes.STRING
    });

    Note.associate = (models) => {
        Note.belongsTo(models.Image);
        Note.belongsTo(models.Upload);
    };

    return Note;
};