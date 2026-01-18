const db = require('../db/dbConnection');
const jwt = require('jsonwebtoken');

/* LOGIN */
const login = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
};

/* SAVE EMPLOYEE */
const saveEmployee = (req, res) => {
  const { name, age, salary } = req.body;

  if (!name || !age || !salary) {
    return res.status(400).json({ message: 'Name, age, salary required' });
  }

  const query =
    'INSERT INTO employee (name, age, salary) VALUES (?, ?, ?)';

  db.query(query, [name, age, salary], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: 'Employee saved',
      employeeId: result.insertId
    });
  });
};

/* GET ALL EMPLOYEES */
const getEmployees = (req, res) => {
  const query = 'SELECT * FROM employee';

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // ✅ Always return array (even if empty)
    res.status(200).json(results);
  });
};

/* GET EMPLOYEE BY ID */
const getEmployeeById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM employee WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(results[0]);
  });
};

/* UPDATE EMPLOYEE */
const updateEmployee = (req, res) => {
  const { name, age, salary } = req.body;
  const { id } = req.params;

  const query =
    'UPDATE employee SET name = ?, age = ?, salary = ? WHERE id = ?';

  db.query(query, [name, age, salary, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated' });
  });
};

/* DELETE EMPLOYEE */
const deleteEmployee = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM employee WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  });
};

module.exports = {
  login,
  saveEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
