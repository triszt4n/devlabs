/**
 * return developer's attributes (except pw)
 * get ID from req.query, else move on.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        dev = {
            devID: 123,
            name: "Pista",
            email: "asd",
            phone: "+1 666 420 6969",
            memberships: [
                {
                    memshipID: 123,
                    projID: 123,
                    title: "Title123",
                    addedDate: "2020/01/01 00:00",
                    leaderName: "Mr. Bond"
                },
                {
                    memshipID: 456,
                    projID: 1,
                    title: "Title1",
                    addedDate: "2019/01/01 00:00",
                    leaderName: "Dr. Bond"
                }
            ]
        };
        res.locals = dev;

        return next();
    };
  
};