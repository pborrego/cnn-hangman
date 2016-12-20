const config = require('../config');
const word = require('random-words');



exports.word = {
    method: 'GET',
    path: '/word',
    config: {
        id: 'sayWord',
        handler: (req, reply) => {
            const gameWord = word();
            reply({
                alphabet: config['alphabet'],
                blocks: new Array(gameWord.length),
                guesses: [],
                hits: 0,
                maxAttempts: config['maxAttempts'],
                miss: 0,
                word: gameWord
            });
        },
    }
};



module.exports = [exports.word];
