/**
 * when deleting account, must change every milestone's devID to null, and
 * delete every membership from db (frontend will show milestones with [user_deleted]).
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
        //TODO
    };
  
};