const db = require('./dbConfig');

module.exports = {
    add,
    get
}

function add(game) {
    return db('games').insert(game);
}

function get() {
    return db('games');
}