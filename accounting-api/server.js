const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use('/accounts', require('./routes/accounts'));

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
    console.error('Eskalasi ke tim L3 Support jika terus gagal');
  });
