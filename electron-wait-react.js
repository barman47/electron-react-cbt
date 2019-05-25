const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 5000;

const { sequelize } = require('./utils');
const User = require('./models/User');
const Question = require('./models/Question');

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnection = () => client.connect({ port }, () => {
    client.end();
    if(!startedElectron) {
        console.log('starting electron');
        startedElectron = true;
        const exec = require('child_process').exec;
        exec('npm run electron');
    }
    ipcMain.on('register-student', (event, data) => {
        console.log('data ', data);
    });
    
})

tryConnection();
        sequelize();
        // Question.create({
        //     subject: 'English',
        //     year: 2019,
        //     examType: 'JAMB',
        //     question: 'How are you?',
        //     options: {
        //         optionA: {
        //             value: 'value 1',
        //             answer: false
        //         },
        //         optionB: {
        //             value: 'value 2',
        //             answer: false
        //         },
        //         optionC: {
        //             value: 'value 3',
        //             answer: false
        //         },
        //         optionD: {
        //             value: 'value 4',
        //             answer: true
        //         },
        //     }
        // })
        // .then(question => {
        //     console.log('question inserted');
        // })
        // .catch(err => {
        //     console.log(err);
        // });  

client.on('error', () => {
    setTimeout(tryConnection, 5000);
});