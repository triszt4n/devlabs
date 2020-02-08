const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Membership = db.model('Membership', {
    projID: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    devID: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Membership;