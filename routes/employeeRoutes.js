const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const controller = require('../controllers/employeeController');

router.post('/login', controller.login);

router.post('/save', auth, controller.saveEmployee);

// ✅ STATIC ROUTES FIRST
router.get('/all', auth, controller.getEmployees);

// ❗ DYNAMIC ROUTES LAST
router.get('/:id', auth, controller.getEmployeeById);
router.put('/update/:id', auth, controller.updateEmployee);
router.delete('/delete/:id', auth, controller.deleteEmployee);

module.exports = router;
