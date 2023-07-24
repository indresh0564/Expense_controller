const Express = require('express');
const forgotpassword_controller = require('../controller/forgot_password');

const router = Express.Router();

router.post("/forgotpassword",forgotpassword_controller.forgotpassword);

module.exports = router;