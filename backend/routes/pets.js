
const express = require('express');
const { createConnection } = require('../config/database');
const router = express.Router();

// Get all pets
router.get('/', async (req, res) => {
  let connection;
  try {
    console.log('GET /api/pets - Fetching all pets');
    connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pets ORDER BY id DESC');
    console.log(`Found ${rows.length} pets`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pets:', error.message);
    res.status(500).json({ error: 'Failed to fetch pets', details: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Get single pet by ID
router.get('/:id', async (req, res) => {
  let connection;
  try {
    console.log(`GET /api/pets/${req.params.id} - Fetching pet by ID`);
    connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pets WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      console.log(`Pet with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    console.log(`Pet found:`, rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching pet:', error.message);
    res.status(500).json({ error: 'Failed to fetch pet', details: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Add new pet
router.post('/', async (req, res) => {
  let connection;
  try {
    const { name, color, category, quantity, age, gender, weight, price } = req.body;
    console.log('POST /api/pets - Adding new pet:', req.body);
    
    // Validate required fields
    if (!name || !color || !category || !age || !gender || weight === undefined || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    connection = await createConnection();
    const [result] = await connection.execute(
      'INSERT INTO pets (name, color, category, quantity, age, gender, weight, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, color, category, quantity || 1, age, gender, weight, price]
    );
    
    console.log(`Pet added successfully with ID: ${result.insertId}`);
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Pet added successfully' 
    });
  } catch (error) {
    console.error('Error adding pet:', error.message);
    res.status(500).json({ error: 'Failed to add pet', details: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Update pet
router.put('/:id', async (req, res) => {
  let connection;
  try {
    const { name, color, category, quantity, age, gender, weight, price } = req.body;
    console.log(`PUT /api/pets/${req.params.id} - Updating pet:`, req.body);
    
    connection = await createConnection();
    const [result] = await connection.execute(
      'UPDATE pets SET name = ?, color = ?, category = ?, quantity = ?, age = ?, gender = ?, weight = ?, price = ? WHERE id = ?',
      [name, color, category, quantity, age, gender, weight, price, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      console.log(`Pet with ID ${req.params.id} not found for update`);
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    console.log(`Pet with ID ${req.params.id} updated successfully`);
    res.json({ message: 'Pet updated successfully' });
  } catch (error) {
    console.error('Error updating pet:', error.message);
    res.status(500).json({ error: 'Failed to update pet', details: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Delete pet
router.delete('/:id', async (req, res) => {
  let connection;
  try {
    console.log(`DELETE /api/pets/${req.params.id} - Deleting pet`);
    connection = await createConnection();
    const [result] = await connection.execute('DELETE FROM pets WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      console.log(`Pet with ID ${req.params.id} not found for deletion`);
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    console.log(`Pet with ID ${req.params.id} deleted successfully`);
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error.message);
    res.status(500).json({ error: 'Failed to delete pet', details: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
