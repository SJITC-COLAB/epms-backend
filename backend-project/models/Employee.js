const { DataTypes } = require('sequelize'); 
const db = require('../config/db');

const Employee = db.define('Employee',{
    employeeNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hiredDate: {
        type: DataTypes.DATE
    }
},
{
    tableName: 'Employee',
    timestamps: true,
}
)

module.exports = Employee;