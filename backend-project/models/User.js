const db = require('../config/db');
const { DataTypes } = require('sequelize');

const User = db.define('User',{
    userId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'users',
    timestamps: true,
})

module.exports = User;