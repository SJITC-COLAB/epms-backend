const Department = require('../models/Department');

const CreateDepartment = async (req, res) => {
    const { departmentCode, departmentName, grossSalary } = req.body;
    try {
        if (!departmentCode || !departmentName || !grossSalary) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const department = await Department.findOne({
            where: { departmentCode: departmentCode },
        })
        if (department) {
            return res.status(400).json({ message: "Department already exists" });
        }
        const newDepartment = await Department.create({
            departmentCode: departmentCode,
            departmentName: departmentName,
            grossSalary: grossSalary,
        });
        return res.status(201).json({ message: "Department created successfully", newDepartment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });   
    }
}


const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        if (!departments) {
            return res.status(404).json({ message: "No departments found" });
        }
        return res.status(200).json({ message: "Departments fetched successfully", departments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getOneDepartment = async (req , res) => {
    const { id } = req.params;
    try {
        const department = await Department.findOne({
            where: { id: id },
        });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json({ message: "Department fetched successfully", department });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const DeleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findOne({
            where: { id: id },
        });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        await department.destroy();
        return res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const EditDepartment = async (req, res) => {
    const { code } = req.params;
    const { departmentCode, departmentName, grossSalary } = req.body;
    try {
        const department = await Department.findOne({
            where: { departmentCode: code },
        });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        await department.update({
            departmentCode: departmentCode,
            departmentName: departmentName,
            grossSalary: grossSalary,
        });
        return res.status(200).json({ message: "Department updated successfully", department });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    CreateDepartment,
    getAllDepartments,
    getOneDepartment,
    DeleteDepartment,
    EditDepartment
}