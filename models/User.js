const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../', 'database.db')
});

const Model = Sequelize.Model;
class User extends Model {}
User.init({
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
	password: {
        type: Sequelize.STRING,
        allowNull: false
	}}, 
	{
      sequelize,
      modelName: 'user'
	}
);

User.sync();
    
module.exports = User;