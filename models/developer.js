const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Developer = db.model('Developer', {
    email: String,
    name: String,
    pw: String,
    phone: String
});

module.exports = Developer;