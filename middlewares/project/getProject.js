/**
 * get sprint's attributes from db with sprintID
 */
const moment = require('moment');

module.exports = function (objectRepository) {

    return function (req, res, next) {
        let project = {
            projID: 2,
            leaderID: 123,
            leaderName: "Pista",
            numOfDevs: 21,
            title: "Title2",
            reward: 1900,
            startDate: new Date("2019-06-15 13:00:00"),
            endDate: new Date("2019-06-30 17:00:00"),
            isEnded: true,
            isSuccess: true,
            desc: "Lorem ipsum",
            milestones: [
                {
                    msID: 1,
                    devID: 123,
                    addedBy: "Name1",
                    addedDate: "2019/06/16 10:00",
                    desc: "Asd"
                },
                {
                    msID: 2,
                    devID: 123,
                    addedBy: "Name2",
                    addedDate: "2019/06/20 10:00",
                    desc: "Asd"
                }
            ],
            members: [
                {
                    memshipID: 1,
                    devID: 123,
                    name: "Péter",
                    email: "asd@asd",
                    joinDate: "2019/06/16 10:00",
                },
                {
                    memshipID: 2,
                    devID: 123,
                    name: "Juli",
                    email: "fgh@cool.hu",
                    joinDate: "2019/06/20 10:00",
                }
            ],
            nonMembers: [
                {
                    devID: 123,
                    email: "asd@asd"
                },
                {
                    devID: 123,
                    email: "fgh@cool.hu"
                }
            ]
        };
        res.locals = project;
        res.locals.startDateString = moment(res.locals.startDate).format("YYYY/MM/DD HH:mm");
        res.locals.endDateString = moment(res.locals.endDate).format("YYYY/MM/DD HH:mm");

        return next();
    };
  
};