import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import entryRouter from './routes/entryRoutes.js'; // Import the entry router

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from "public" directory
app.use('/', express.static('public'));

// Root endpoint for API
app.get('/api/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// User endpoints
app.use('/api/users', userRouter);

// Entry endpoints
app.use('/api/entries', entryRouter); // Mount the entry router

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
