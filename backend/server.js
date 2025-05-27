
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const petRoutes = require('./routes/pets');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/pets', petRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Pet Shop Backend API is running!' });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api`);
      console.log('Database initialized and connected successfully');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
