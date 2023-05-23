const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');

// Create an employee
employeeRouter.post('/create', employeeController.createEmployee);

// List employees with pagination
employeeRouter.get('/getall', employeeController.listEmployees);

// Update an employee using put method and replacing it 
employeeRouter.put('/update/:id', employeeController.updateEmployee);
// Update an employee using patch method
employeeRouter.patch('/update/:id', employeeController.updateEmployee_patch);

// Delete an employee
employeeRouter.delete('/delete/:id', employeeController.deleteEmployee);

// Get an employee
employeeRouter.get('/getone/:id', employeeController.getEmployee);

module.exports = employeeRouter;
