const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@Hell@9305',
  database: 'infoware', 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySql database');

  // Create the employee and contacts tables
  const createEmployeeTable = `CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL
  )`;

  const createContactsTable = `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
  )`;

  connection.query(createEmployeeTable, (err) => {
    if (err) {
      console.error('Error creating employees table:', err);
    }
  });

  connection.query(createContactsTable, (err) => {
    if (err) {
      console.error('Error creating contacts table:', err);
    }
  });
});

module.exports = connection;