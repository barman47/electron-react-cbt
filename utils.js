const Sequelize = require('sequelize');
const path = require('path');

module.exports = {
    sequelize: () => {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.join(__dirname, 'database.db')
        });
        
        sequelize
            .authenticate()
            .then(() => {
                console.log('Database Connection established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database.', err);
            });

    }
};