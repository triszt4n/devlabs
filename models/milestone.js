const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Milestone = db.model('Milestone', {
    desc: String,
    addedDate: {
        type: Date,
        default: Date.now
    },
    projID: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    devID: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

module.exports = Milestone;