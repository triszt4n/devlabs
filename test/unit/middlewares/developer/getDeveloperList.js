/**
 * Return the developers as list of objects including all attributes
 * (needed by /developers)
 */
const expect = require("chai").expect;
const getDeveloperListMW = require("../../../../middlewares/developer/getDeveloperList");
const requireOption = require('../../../../middlewares/default/requireOption');

describe("getDeveloperList middleware", () => {
    it("should call next and have a complete devs when successful db query", (done) => {
        const fakeDeveloperModel = {
            find: (options, cb) => {
                cb(undefined, ['harrypotter', 'ronweasley']);
            }
        };
        
        const mw = getDeveloperListMW({
            DeveloperModel: fakeDeveloperModel
        });

        const res = {
            locals: {}
        };

        mw( /*req:*/ {},
        /*res:*/ res,
        /*next:*/ (err) => {
            expect(res.locals.devs).to.eql(['harrypotter', 'ronweasley']);
            expect(err).to.be.undefined;
            done();
        })
    })

    it("should call next with error when db throws error", (done) => {
        const fakeDeveloperModel = {
            find: (options, cb) => {
                cb("Inner DB error", undefined);
            }
        };
        
        const mw = getDeveloperListMW({
            DeveloperModel: fakeDeveloperModel
        });

        mw( /*req:*/ {},
        /*res:*/ {},
        /*next:*/ (err) => {
            expect(err).to.be.eql("Inner DB error");
            done();
        })
    })
})