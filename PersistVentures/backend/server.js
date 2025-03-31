const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const otpRoutes = require('./otpRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
