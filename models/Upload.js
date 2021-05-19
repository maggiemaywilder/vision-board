
module.exports = (sequelize, DataTypes) => {
    // this is things added via dropzone
    const Upload = sequelize.define('Upload', {
        text: DataTypes.STRING(1234),
        url: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    });

    Upload.associate = (models) => {
        Upload.belongsTo(models.Board);

        Upload.belongsToMany(models.Tag_Board, { through: 'Upload_bridge' });
    };
    return Upload;
};