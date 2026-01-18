const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const verifyToken = require('../middleware/auth');

const {
  login,
  saveEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById
} = require('../controller/employeeController');

router.post('/login', login);

router.post('/save', verifyToken, upload.single('photo'), saveEmployee);
router.get('/all', verifyToken, getEmployees);
router.delete('/delete/:id', verifyToken, deleteEmployee);
router.put('/update/:id', verifyToken, updateEmployee);
router.get('/:id', verifyToken, getEmployeeById);

module.exports = router;
