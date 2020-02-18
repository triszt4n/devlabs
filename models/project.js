const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Project = db.model('Project', {
    title: String,
    startDate: Date,
    endDate: Date,
    isSuccess: Boolean,
    reward: Number,
    desc: String,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = Project;