/**
 * delete sprint with sprintID from db
 * call deleteRoleMW(roleID) for every roleID in res.locals.roleList,
 * redirect to /sprints in the end
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};