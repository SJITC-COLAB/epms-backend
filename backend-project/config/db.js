const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('EPMS','root','',{
    port: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(()=> console.log('connected to database')).catch(()=> console.log('error connecting to database'))

module.exports = sequelize;