require('dotenv').config(); 

const express = require('express');
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/v1/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Hello migara!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
