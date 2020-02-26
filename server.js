const express = require('express');
const morgan = require('morgan');

const AuthRoutes = require('./routes/auth.routes');

const app = express();

require('dotenv').config(); // config environment variables

// Used below code to log request
app.use(morgan('dev'));
app.use(express.json({ extended: false })); // body-Parser. By default included in express.js

app.use('/api/auth', AuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
	console.log(`Server is running at port ${PORT}`)
);
