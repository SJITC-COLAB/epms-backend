const Employee = require("../models/Employee");

const CreateEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    position,
    address,
    telephone,
    gender,
    hiredDate,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !position ||
    !address ||
    !telephone ||
    !hiredDate
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const createEmp = await Employee.create({
      Firstname: firstname,
      Lastname: lastname,
      Position: position,
      Address: address,
      Telephone: telephone,
      hiredDate: hiredDate,
    });
    return res
      .status(201)
      .json({ message: "Employee created successfully", createEmp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    if (!employees) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res
      .status(200)
      .json({ message: "Employees fetched successfully", employees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { employeeNumber: id },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res
      .status(200)
      .json({ message: "Employee fetched successfully", employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const DeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.destroy({
      where: { employeeNumber: id },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const EditEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    position,
    address,
    telephone,
    gender,
    hiredDate,
  } = req.body;
  try {
    if (
      !firstname ||
      !lastname ||
      !position ||
      !address ||
      !telephone ||
      !hiredDate
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const employee = await Employee.findOne({
      where: { employeeNumber: id },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.update(
      {
        Firstname: firstname,
        Lastname: lastname,
        Position: position,
        Address: address,
        Telephone: telephone,
        hiredDate: hiredDate,
      },
      { where: { employeeNumber: id } }
    );
    return res
      .status(200)
      .json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  DeleteEmployee,
  CreateEmployee,
  getAllEmployees,
  getOneEmployee,
  EditEmployee,
};
