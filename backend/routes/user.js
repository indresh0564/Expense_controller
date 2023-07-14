const Express = require('express');

const controller = require('../controller/user');

const router = Express.Router();

router.post('/User',controller.User);

module.exports = router;