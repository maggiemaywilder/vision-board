
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          topic: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    }, {
        onDelete: 'cascade'
    });

    Board.associate = (models) => {
        Board.belongsTo(models.User);

        Board.hasMany(models.Note);
    };
    
    return Board;
};