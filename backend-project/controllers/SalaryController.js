const Salary = require("../models/Salary");

const createSalary = async (req, res) => {
  const {
    employeeNumber,
    departmentCode,
    grossSalary,
    totalDeductions,
    netSalary,
    month,
  } = req.body;
  try {
    if (
      !employeeNumber ||
      !departmentCode ||
      !grossSalary ||
      !totalDeductions ||
      !netSalary ||
      !month
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const salary = await Salary.findOne({
      where: { employeeNumber: employeeNumber },
    });
    if (salary) {
      return res.status(400).json({ message: "Salary already exists" });
    }
    const newSalary = await Salary.create({
      employeeNumber: employeeNumber,
      departmentCode: departmentCode,
      grossSalary: grossSalary,
      totalDeductions: totalDeductions,
      netSalary: netSalary,
      month: month,
    });
    return res
      .status(201)
      .json({ message: "Salary created successfully", newSalary });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.findAll({
      include: [{ all: true }], // includes all defined associations/relations
    });
    return res.status(200).json(salaries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneSalary = async (req, res) => {
  const { id } = req.params;
  try {
    const salary = await Salary.findOne({
      where: {
        SalaryId: id,
      },
      include: [{ all: true }], // includes all defined associations/relations
    });
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }
    return res
      .status(200)
      .json({ message: "Salary fetched successfully", salary });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const DeleteSalary = async (req, res) => {
  const { id } = req.params;
  try {
    const salary = await Salary.findOne({
      where: { SalaryId: id },
    });

    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }
    salary.destroy();
    return res.status(200).json({ message: "Salary deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


const EditSalary = async (req , res ) =>{
    const { id } = req.params;
    const { grossSalary, totalDeductions, netSalary, month } = req.body;
    if (!grossSalary || !totalDeductions || !netSalary || !month) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const salary = await Salary.findOne({
            where: { SalaryId: id },
        });
        if (!salary) {
            return res.status(404).json({ message: "Salary not found" });
        }
        salary.grossSalary = grossSalary;
        salary.totalDeductions = totalDeductions;
        salary.netSalary = netSalary;
        salary.month = month;
        await salary.save();
        return res.status(200).json({ message: "Salary updated successfully", salary });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createSalary,
    DeleteSalary,
    EditSalary,
    getOneSalary,
    getAllSalaries
}