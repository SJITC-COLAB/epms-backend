const router = require("express").Router();
const { CreateEmployee , DeleteEmployee , getAllEmployees , getOneEmployee , EditEmployee } = require('../controllers/EmployeeController');
const { route } = require("./AuthRoutes");


router.get('/all', getAllEmployees);
router.post('/create', CreateEmployee);
router.get('/:id', getOneEmployee);
router.delete('delete/:id', DeleteEmployee);
router.put('/edit/:id', EditEmployee);

module.exports = router;