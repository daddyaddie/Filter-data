require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const dataRoutes = require('./routes/data');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;
console.log('Server starting...');
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
