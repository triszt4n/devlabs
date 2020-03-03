/**
 * Returns the developers from list of res.locals.devs which cannot be found in
 * res.locals.project.members already. (trims down the ones in it already)
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let nonMembers = [];
        res.locals.devs.forEach(dev => {
            let alreadyMember = false;

            for (member of res.locals.project.members) {
                if (dev._id.equals(member._dev._id)) {
                    alreadyMember = true;
                    break;
                }
            }

            if (!alreadyMember) {
                nonMembers.push(dev);
            }
        });
        res.locals.project.nonMembers = nonMembers;

        return next();
    };
};