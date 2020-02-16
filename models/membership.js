const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Membership = db.model('Membership', {
    _proj: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    _dev: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    rank: {
        type: String,
        default: "Newcomer"
    }
});

module.exports = Membership;