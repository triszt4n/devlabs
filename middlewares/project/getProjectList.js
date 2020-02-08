/**
 * return the projects' attributes as list of objects including all attributes
 * (needed by /projects)
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let projects = [
            {
                projID: 1,
                leaderID: 123,
                leaderName: "Pistika",
                numOfDevs: 12,
                title: "Title1",
                reward: 900,
                startDate: "2019/06/15 13:00",
                endDate: "2019/06/30 17:00",
                isSuccess: true,
                desc: "Lorem ipsum",
                milestones: [
                    {
                        devID: 123,
                        addedBy: "Name1",
                        addedDate: "2019/06/16 10:00",
                        desc: "Asd"
                    },
                    {
                        devID: 123,
                        addedBy: "Name2",
                        addedDate: "2019/06/20 10:00",
                        desc: "Asd"
                    }
                ]
            },
            {
                projID: 2,
                leaderID: 123,
                leaderName: "Pista",
                numOfDevs: 21,
                title: "Title2",
                reward: 1900,
                startDate: "2019/06/15 13:00",
                endDate: "2019/06/30 17:00",
                isSuccess: false,
                desc: "Lorem ipsum",
                milestones: [
                    {
                        devID: 123,
                        addedBy: "Name1",
                        addedDate: "2019/06/16 10:00",
                        desc: "Asd"
                    },
                    {
                        devID: 123,
                        addedBy: "Name2",
                        addedDate: "2019/06/20 10:00",
                        desc: "Asd"
                    }
                ]
            }
        ];
        res.locals.projects = projects;

        return next();
    };  
};