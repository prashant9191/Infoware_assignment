const connection = require('../config/database.js');

const employeeController = {};

// Create an employee
employeeController.createEmployee = (req, res) => {
  const { name, designation, contacts } = req.body;

  connection.query('INSERT INTO employees (name, designation) VALUES (?, ?)', [name, designation], (err, result) => {
    if (err) {
      console.error('Error creating employee:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    const employeeId = result.insertId;

    // Insert contacts
    if (contacts && contacts.length > 0) {
      const contactValues = contacts.map(({ type, value }) => [employeeId, type, value]);
      connection.query('INSERT INTO contacts (employee_id, type, value) VALUES ?', [contactValues], (err) => {
        if (err) {
          console.error('Error creating contacts:', err);
          res.status(500).json({ error: 'An error occurred' });
          return;
        }
        res.status(201).json({ message: 'Employee created successfully' });
      });
    } else {
      res.status(201).json({ message: 'Employee created successfully' });
    }
  });
};

// List employees with pagination
employeeController.listEmployees = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT e.id, e.name, e.designation, c.type, c.value
    FROM employees AS e
    LEFT JOIN contacts AS c ON e.id = c.employee_id
    LIMIT ?, ?
  `;

  connection.query(query, [offset, limit], (err, results) => {
    if (err) {
      console.error('Error listing employees:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    // Group results by employee ID
    const employees = {};
    results.forEach((row) => {
      const { id, name, designation, type, value } = row;

      if (!employees[id]) {
        employees[id] = {
          id,
          name,
          designation,
          contacts: []
        };
      }

      if (type && value) {
        employees[id].contacts.push({ type, value });
      }
    });

    res.status(200).json({ employees: Object.values(employees) });
  });
};


// Update an employee by replacing it using put method
employeeController.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, designation, contacts } = req.body;

  connection.query('UPDATE employees SET name = ?, designation = ? WHERE id = ?', [name, designation, id], (err) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    // Delete existing contacts
    connection.query('DELETE FROM contacts WHERE employee_id = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting existing contacts:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Insert updated contacts
      if (contacts && contacts.length > 0) {
        const contactValues = contacts.map(({ type, value }) => [id, type, value]);
        connection.query('INSERT INTO contacts (employee_id, type, value) VALUES ?', [contactValues], (err) => {
          if (err) {
            console.error('Error creating contacts:', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
          }
          res.status(200).json({ message: 'Employee updated successfully' });
        });
      } else {
        res.status(200).json({ message: 'Employee updated successfully' });
      }
    });
  });
};

// Update an employee by patch method
employeeController.updateEmployee_patch = (req, res) => {
  const { id } = req.params;
  const { name, designation, contacts } = req.body;

  // Fetch existing employee data
  connection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Error fetching existing employee data:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const existingEmployee = rows[0];

    // Merge existing and provided fields
    const updatedEmployee = {
      name: name || existingEmployee.name,
      designation: designation || existingEmployee.designation
    };

    // Update employee data
    connection.query('UPDATE employees SET ? WHERE id = ?', [updatedEmployee, id], (err) => {
      if (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Insert updated contacts if provided
      if (contacts && contacts.length > 0) {
        const contactValues = contacts.map(({ type, value }) => [id, type, value]);
        connection.query('INSERT INTO contacts (employee_id, type, value) VALUES ?', [contactValues], (err) => {
          if (err) {
            console.error('Error creating contacts:', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
          }
          res.status(200).json({ message: 'Employee updated successfully' });
        });
      } else {
        res.status(200).json({ message: 'Employee updated successfully' });
      }
    });
  });
};

// Delete an employee
employeeController.deleteEmployee = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
};

// Get an employee
employeeController.getEmployee = (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM employees WHERE id = ?', [id], (err, employees) => {
    if (err) {
      console.error('Error getting employee:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    if (employees.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      // Fetch contacts for the employee
      connection.query('SELECT * FROM contacts WHERE employee_id = ?', [id], (err, contacts) => {
        if (err) {
          console.error('Error getting contacts:', err);
          res.status(500).json({ error: 'An error occurred' });
          return;
        }
        res.status(200).json({ employee: employees[0], contacts });
      });
    }
  });
};

module.exports = employeeController;
