const express = require("express");
const cors = require("cors");
const handleErrors = require('./middlewares/exceptionHandler');
require('dotenv').config();
const app = express();
const { logger } = require('./utils/loggerUtil')
const PORT = process.env.PORT ? process.env.PORT : 5000;
const { NotFound, BadRequest } = require('./utils/errorUtil')
const bodyParser = require('body-parser');
const apiLog = require("./middlewares/logger");
const errorCodeUtils = require("./utils/errorCodes");
const corsOptions = {};
const firebase = require('./configs/firebaseConfig');

app.use(cors(corsOptions));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

app.use(apiLog);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return next(new BadRequest(err.message, errorCodeUtils.Invalid_body))
    }
});
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//validate against double slash in url
app.use('*', function (req, res, next) {
    if (req.originalUrl.includes('//')) {
        logger.error(`${404} - 'error' - ${"API NOT FOUND"} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return next(new NotFound("API not found", 404));
    }
    else
        next();
});
// sample route
app.get("/", (req, res) => {
    res.send({ message: "ping once" });
});
app.get("/api", (req, res) => {
    res.send({ message: "ping twice" });
});
require("./routes/sayHello")(app);
app.get('*', function (req, res, next) {
    logger.error(`${404} - 'error' - ${"API NOT FOUND"} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next(new NotFound("API not found", 404));
});

app.use(handleErrors);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    logger.info(`Server listening on port ${PORT}`)
})


