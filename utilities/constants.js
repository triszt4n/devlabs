/**
 * Global constants and message constants
 * Making code clean and messages identical
 */
module.exports = {
    DEFAULT_MESSAGES: {
        dbError: "An error occured in our database. Try again.",
        emptyForm: "Please fill in all required queries.",
        saveError: "An error occured during applying changes. Try again.",
        pageNotFoundError: "The page you're looking for is not found."
    },
    ACCOUNT_MESSAGES: {
        login: {
            cantFindError: "No developer registered under this email address.",
            matchError: "Wrong email address and password combination."
        },
        email: {
            invalidError: "Please enter a valid email address.",
            duplicateError: "Another account uses this email address. Please choose another one."
        },
        pw: {
            matchError: "Non-matching passwords.",
            oldError: "Wrong old password.",
            shortError: "Password too short."
        },
        account: {
            ownershipError: "ATTENTION: Can't delete account yet. Please hand over the control of your own projects to other Members. Or archive them manually.",
            deleteSaveError: "Error occured while deleting user.",
            registerSuccess: "Account successfully created."
        }
    },
    MEMSHIP_MESSAGES: {
        editSaveError: "Error occured while applying changes to Member's details. Try again.",
        handOverSaveError: "Error occured while assigning project to new owner. Try again.",
        inviteSaveError: "Error occured while inviting member to project.",
        kickSaveError: "Error occured while kicking Member."
    },
    MILESTONE_MESSAGES: {
        deleteSaveError: "An error occured in our database while deleting milestone.",
        newSaveError: "An error occured while creating milestone. Try again."
    }
};
