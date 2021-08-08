// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validateFn = require('./middlewares/validateFn');


// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', validateFn.logLoginData, authController.processLogin);
    router.post('/api/user/register', validateFn.logData, authController.processRegister);
    router.post('/api/user/process-submission', validateFn.validateSubmit, checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processDesignSubmission);
    router.put('/api/user/', checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processUpdateOneUser);
    router.put('/api/user/design/', validateFn.logData, userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/', validateFn.logData, checkUserFnSolution.checkForValidUserRoleUser, userController.processSendInvitation);

    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processGetSubmissionsbyEmail);
    router.get('/api/user', checkUserFnSolution.checkForValidUserRoleUser, validateFn.logData, userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', validateFn.logData, userController.processGetOneDesignData);

};