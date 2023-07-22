const Express = require('express');
const authentication = require('../middleware/auth'); 
const controller_leaderboard = require('../controller/leaderboard');

const router = Express.Router()

router.get('/leaderboard' , authentication.authenticate , controller_leaderboard.leaderboard);
// router.post('/update_leaderboard', authentication.authenticate , controller_leaderboard.update_leaderboard);

module.exports = router;