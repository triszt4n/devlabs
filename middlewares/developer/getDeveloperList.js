/**
 * return the developers' as list of objects including all attributes
 * (excluding password, freshpw)
 * (needed by /devs)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        devs = [
            {
                devID: 456,
                name: "Joska",
                email: "fgh",
                phone: "+1 600 800 0191"
            },
            {
                devID: 123,
                name: "Pista",
                email: "asd",
                phone: "+1 666 420 6969"
            }
        ];
        res.locals.devs = devs;

        return next();
    };
  
};