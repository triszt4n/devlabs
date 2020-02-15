const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Milestone = db.model('Milestone', {
    desc: String,
    addedDate: {
        type: Date,
        default: Date.now
    },
    _proj: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    _dev: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = Milestone;