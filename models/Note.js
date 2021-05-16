
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        text: DataTypes.STRING(1234),
        url: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    });

    Note.associate = (models) => {
        Note.belongsTo(models.Board);
    };
    return Note;
};