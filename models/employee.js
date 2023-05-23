const connection = require('../config/database');

const Employee = {};

Employee.create = (employeeData, callback) => {
  const { name, designation, contacts } = employeeData;

  // Insert employee into the 'employees' table
  connection.query(
    'INSERT INTO employees (name, designation) VALUES (?, ?)',
    [name, designation],
    (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      const employeeId = result.insertId;
      Employee.createContacts(employeeId, contacts, (err) => {
        if (err) {
          callback(err);
          return;
        }

        callback(null);
      });
    }
  );
};

Employee.createContacts = (employeeId, contacts, callback) => {
  const values = contacts.map((contact) => [
    employeeId,
    contact.type,
    contact.value,
  ]);

  // Insert contacts into the 'contacts' table
  connection.query(
    'INSERT INTO contacts (employee_id, type, value) VALUES ?',
    [values],
    (err) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null);
    }
  );
};

module.exports = Employee;
