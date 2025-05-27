
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pet_shop',
  charset: 'utf8mb4',
  timezone: '+00:00'
};

async function createConnection() {
  try {
    console.log('Attempting to connect to database with config:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database
    });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');
    
    // Test the connection
    await connection.execute('SELECT 1');
    console.log('Database connection test passed');
    
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

// Function to initialize database and table
async function initializeDatabase() {
  try {
    // Connect without specifying database first
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // Create database if it doesn't exist
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`Database '${dbConfig.database}' created or already exists`);
    
    await tempConnection.end();

    // Connect to the specific database
    const connection = await createConnection();

    // Create pets table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(50) NOT NULL,
        category ENUM('Dog', 'Cat') NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        age INT NOT NULL,
        gender ENUM('Male', 'Female') NOT NULL,
        weight DECIMAL(5,2) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    console.log('Pets table created or already exists');

    // Check if table has data, if not insert sample data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM pets');
    if (rows[0].count === 0) {
      console.log('Inserting sample data...');
      const insertSampleData = `
        INSERT INTO pets (name, color, category, quantity, age, gender, weight, price) VALUES
        ('Buddy', 'Golden', 'Dog', 1, 3, 'Male', 25.50, 500),
        ('Whiskers', 'Orange', 'Cat', 1, 2, 'Female', 4.20, 300),
        ('Max', 'Black', 'Dog', 1, 5, 'Male', 30.00, 450)
      `;
      await connection.execute(insertSampleData);
      console.log('Sample data inserted successfully');
    }

    await connection.end();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    throw error;
  }
}

module.exports = { createConnection, initializeDatabase };
