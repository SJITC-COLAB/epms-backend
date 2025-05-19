const { DataTypes } = require('sequelize');
const db = require('../config/db');


const Department = db.define('Department',{
    DepartmentCode:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    DepartmentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GrossSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Department',
    timestamps: true,
}
)
module.exports = Department;