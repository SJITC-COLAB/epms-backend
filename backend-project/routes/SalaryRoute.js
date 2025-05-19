const router = require("express").Router();
const { createSalary , DeleteSalary, getAllSalaries, getOneSalary, EditSalary } = require('../controllers/SalaryController');


router.get('/all', getAllSalaries);
router.post('/create', createSalary);
router.delete('delete/:id', DeleteSalary);
router.put('/edit/:id', EditSalary);
router.get('/:id', getOneSalary);


module.exports = router;