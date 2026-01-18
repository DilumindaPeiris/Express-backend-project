require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/v1/employee', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
