/**
 * delete sprint with sprintID from db
 * call deleteTaskMW(taskID) for every taskID in res.locals.taskList,
 * redirect to /sprints in the end
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};