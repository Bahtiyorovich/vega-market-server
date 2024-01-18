const dotenv = require('dotenv')
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./src/routes/authRoute');

const app = express();
app.use(express.json());
dotenv.config();

// mongoDB ni ulash
require('./src/database/connect');

app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', authRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Project's port listening... ${PORT}`))


















