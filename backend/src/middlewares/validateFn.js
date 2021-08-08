const {createLogger, transports, format} = require('winston');
const myLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

const validateFn = {

    validateSubmit: (req, res, next) => {
        console.log("validateSubmit middleware is called.");

        let designTitle = req.body.designTitle;
        let designDescription = req.body.designDescription;

        const regExpTitleInput = /^[\w\s\'\.]+$/g;
        const regExpDescInput = /^[\w\s\'\.\"]+$/g;

        if(regExpTitleInput.test(designTitle) && regExpDescInput.test(designDescription)){
            next();
        } else {
            console.log('Error in submit validation');
            res.status(500).send({"message":"Error in submit validation!"})
        }
    },

    logLoginData: (req, res, next) => {
        myLogger.info({ 
            method : req.method, 
            route : req.originalUrl,
            email : req.body.email
        });
        return next();
    },
 
    logData: (req, res, next) => {
        myLogger.info({ 
            method : req.method, 
            route : req.originalUrl,
            userId : req.body.userId,
        });
        return next();
    },

};

module.exports = validateFn;