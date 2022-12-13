const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./middleware/db');
const cors = require('cors');
const routes = require('./routes/routes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8800;
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
    }
);

