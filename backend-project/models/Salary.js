const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Salary = db.define('Salary',{
    SalaryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employeeNumber: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'Employee',
            key: 'employeeNumber',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    departmentCode: {
        type: DataTypes.STRING,
        allowNull:false,
        references: {
            model: 'Department',
            key: 'DepartmentCode',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    GlossSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TotalDeductions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    NetSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Salary',
    timestamps: true,
}
)
module.exports = Salary; 