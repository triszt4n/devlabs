/**
 * return the 3 most rewarding and successful projects as list of objects including
 * title, number of developers engaged in sprint, reward, sprintID
 * (needed by /projects)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        projects = [
            {
                projID: 2,
                leaderName: "Pista",
                numOfDevs: 21,
                title: "Title2",
                reward: 1900000,
                startDate: "2019/06/15 13:00",
                endDate: "2019/06/30 17:00",
                runTime: "15 days"
            },
            {
                projID: 1,
                leaderName: "János",
                numOfDevs: 1,
                title: "Title1",
                reward: 300000,
                startDate: "2018/06/15 03:00",
                endDate: "2019/07/30 05:00",
                runTime: "13 months"
            },
            {
                projID: 3,
                leaderName: "Károly",
                numOfDevs: 10,
                title: "Title3",
                reward: 200000,
                startDate: "2016/01/10 21:00",
                endDate: "2019/08/30 00:00",
                runTime: "3.63 years"
            }
        ];
        res.locals.tops = projects;

        return next();
    };
  
};