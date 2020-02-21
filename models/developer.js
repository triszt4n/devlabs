const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Developer = db.model('Developer', {
    email: String,
    pw: String,
    name: String,
    phone: String,
    githubUsername: String
});

module.exports = Developer;