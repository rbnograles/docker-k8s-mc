import express from 'express'
import bodyParser from 'body-parser';

// Routes
import userRoutes from './routes/user.routes.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use('/users', userRoutes);

// Sample route
app.get('/heartbeat', (req, res) => {
  res.send('Server is alive!');
});         

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});