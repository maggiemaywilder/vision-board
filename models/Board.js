
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

        Board.hasMany(models.Upload);
        Board.hasMany(models.Image);
        Board.hasMany(models.Link);
        Board.hasMany(models.Tag);
    };

    return Board;
};