const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Project = db.model('Project', {
    title: String,
    startDate: String,
    endDate: String,
    isSuccess: Boolean,
    reward: Number,
    desc: String,
    _leaderID: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = Project;