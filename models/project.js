const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Project = db.model('Project', {
    title: String,
    startDate: Date,
    endDate: Date,
    isSuccess: Boolean,
    reward: Number,
    desc: String,
    numOfDevs: {
        type: Number,
        default: 1
    },
    _leader: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = Project;