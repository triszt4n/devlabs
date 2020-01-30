/**
 * delete developer with devID from db
 * call deleteRoleMW(roleID) for every roleID in res.locals.roleIDList
 * available objects so far: roleIDList
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};