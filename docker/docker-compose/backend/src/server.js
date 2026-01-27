import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import healthRouter from './routes/health.js';
import storeRouter from './routes/store.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT
const KEY_VALUE_DB = process.env.KEY_VALUE_DB
const MONGODB_HOST = process.env.MONGODB_HOST
const KEY_VALUE_DB_USER = process.env.KEY_VALUE_DB_USER
const KEY_VALUE_DB_PASSWORD = process.env.KEY_VALUE_DB_PASSWORD

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res, next) => {
    res.json({ message: 'Welcome to the Key-Value Store API!!!' });
});
app.use('/health', healthRouter); 
app.use('/store', storeRouter);

// MongoDB Connection
console.log('Connecting to MongoDB at', KEY_VALUE_DB);
mongoose.connect(`mongodb://${MONGODB_HOST}/${KEY_VALUE_DB}`, {
    auth: {
        username: KEY_VALUE_DB_USER,
        password: KEY_VALUE_DB_PASSWORD,
    },
    connectTimeoutMS: 500,
})
    .then(() => {
        console.log('Connected to MongoDB!!');
        // Start the server after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
