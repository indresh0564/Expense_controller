const Express = require('express');
const expense_controller = require('../controller/expense');

const router = Express.Router();

router.post('/expense', expense_controller.expense);
router.get('/get_expenses', expense_controller.get_expenses);
router.delete('/delete_expense/:id', expense_controller.delete_expense);

module.exports = router;