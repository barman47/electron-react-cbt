const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../', 'database.db')
});

const Model = Sequelize.Model;
class Question extends Model {}
Question.init(
    {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        examType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        question: {
            type: Sequelize.STRING,
            allowNull: false
        },
        questionImageUrl: {
            type:Sequelize.STRING,
            allowNull: true

        },
        explanationImageUrl: {
            type:Sequelize.STRING,
            allowNull: true
        },
        explanation: {
            type: Sequelize.STRING,
            allowNull: true
        },
        options: {
            type: Sequelize.JSON,
            allowNull: false,
            optionA: {
                type: Sequelize.JSON,
                allowNull: false,
                value: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                }
            },
            optionB: {
                type: Sequelize.JSON,
                allowNull: false,
                value: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                }
            },
            optionC: {
                type: Sequelize.JSON,
                allowNull: false,
                value: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                }
            },
            optionD: {
                type: Sequelize.JSON,
                allowNull: false,
                value: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                }
            }
        } 
    }, 
    {
        sequelize,
        modelName: 'question'
    }
);

Question.sync();

module.exports = Question;