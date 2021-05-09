
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        text: DataTypes.STRING(1234),
        url: DataTypes.STRING,
    });
    return Note;
};