const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3000;
const sequelize = require('./config/db');
const authRoutes = require('./routes/AuthRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const departmentRoutes = require('./routes/DepartmentRoutes');
const salaryRoutes = require('./routes/SalaryRoute');

app.use(cors({
    origins: "*",
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//logic routes
app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/department', departmentRoutes);
app.use('/salary', salaryRoutes);

sequelize.sync({force: false}).then(()=>{
    console.log('Database synced');
}).catch((err)=>{
    console.log('Error syncing database', err);
})


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

