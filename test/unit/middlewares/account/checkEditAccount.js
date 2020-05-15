/**
 * Checks, if submitted data is valid for the purpose.
 */
const expect = require("chai").expect;
const checkEditAccountMW = require("../../../../middlewares/account/checkEditAccount");
const { ACCOUNT_MESSAGES } = require("../../../../utilities/constants");

describe("checkEditAccount middleware", () => {
    // First conditional statement's test is not needed

    it("should call redirect with \"account/edit\" when invalid email given", (done) => {
        const mw = checkEditAccountMW({});
        const req = {
            method: "POST",
            body: {
                email: "harry.potter"
            },
            session: {}
        };

        mw( /*req:*/ req,
        /*res:*/ { 
            locals: {
                dev: null
            },
            redirect: (url) => {
                expect(url).to.be.eql("/account/edit");
                expect(req.session.message).to.be.eql(ACCOUNT_MESSAGES.email.invalidError);
                done();
            }
        },
        /*next:*/ () => {
            expect(true).to.eql(false);
            done();
        })
    })

    it("should call redirect with \"account/edit\" when account already exists", (done) => {
        const mw = checkEditAccountMW({});
        const req = {
            method: "POST",
            body: {
                email: "harry@hogwarts.edu"
            },
            session: {
                userID: "userloggedin123"
            }
        };

        mw( /*req:*/ req,
        /*res:*/ { 
            locals: {
                dev: {
                    _id: "sb_usesthisalready456" //< mongoose will cast ObjectId to string
                }
            },
            redirect: (url) => {
                expect(url).to.be.eql("/account/edit");
                expect(req.session.message).to.be.eql(ACCOUNT_MESSAGES.email.duplicateError);
                done();
            }
        },
        /*next:*/ () => {
            expect(true).to.eql(false);
            done();
        })
    })

    it("should call next when everything all right", (done) => {
        const mw = checkEditAccountMW({});
        const req = {
            method: "POST",
            body: {
                email: "harry@hogwarts.edu"
            },
            session: {
                userID: "userloggedin123"
            }
        };

        const res = {
            locals: {
                dev: null
            },
            redirect: (url) => {
                expect(url).to.be.undefined;
                expect(true).to.eql(false);
                done();
            }
        };

        mw( /*req:*/ req,
        /*res:*/ res,
        /*next:*/ () => {
            expect(req.session.message).not.to.eql(ACCOUNT_MESSAGES.email.duplicateError);
            expect(req.session.message).not.to.eql(ACCOUNT_MESSAGES.email.invalidError);
            expect(res.locals).not.to.have.property("dev");
            done();
        })
    })
})