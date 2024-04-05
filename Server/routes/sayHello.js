const router = require('express').Router();
const service = require('../services/sayHelloService');
const authenticate = require('../middlewares/authenticationMiddleware');
module.exports = app => {
    router.post("/sayHello", authenticate, service.sayHello);
    app.use('/api/sample', router);
}