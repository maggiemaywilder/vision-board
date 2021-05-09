const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type:DataTypes.STRING,
        allowNull: false,
      }
    }, {
      onDelete: 'cascade',
    });
  
    User.associate = (models) => {
      User.hasMany(models.Board)    
    }
  
    User.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
    };
  
    User.addHook('beforeCreate', (user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    
    return User;
  };