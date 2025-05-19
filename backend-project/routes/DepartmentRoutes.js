const router = require("express").Router();
const { getAllDepartments, CreateDepartment, DeleteDepartment, getOneDepartment, EditDepartment } = require('../controllers/DepartmentController');


router.get('/all', getAllDepartments);
router.post('/create', CreateDepartment);
router.get('/:id', getOneDepartment);
router.delete('delete/:id', DeleteDepartment);
router.put('/edit/:id', EditDepartment);

module.exports = router;
