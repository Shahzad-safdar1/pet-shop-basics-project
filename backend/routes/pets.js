
const express = require('express');
const { createConnection } = require('../config/database');
const router = express.Router();

// Get all pets
router.get('/', async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pets ORDER BY id DESC');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// Get single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pets WHERE id = ?', [req.params.id]);
    await connection.end();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// Add new pet
router.post('/', async (req, res) => {
  try {
    const { name, color, category, quantity, age, gender, weight, price } = req.body;
    
    const connection = await createConnection();
    const [result] = await connection.execute(
      'INSERT INTO pets (name, color, category, quantity, age, gender, weight, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, color, category, quantity, age, gender, weight, price]
    );
    await connection.end();
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Pet added successfully' 
    });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ error: 'Failed to add pet' });
  }
});

// Update pet
router.put('/:id', async (req, res) => {
  try {
    const { name, color, category, quantity, age, gender, weight, price } = req.body;
    
    const connection = await createConnection();
    const [result] = await connection.execute(
      'UPDATE pets SET name = ?, color = ?, category = ?, quantity = ?, age = ?, gender = ?, weight = ?, price = ? WHERE id = ?',
      [name, color, category, quantity, age, gender, weight, price, req.params.id]
    );
    await connection.end();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.json({ message: 'Pet updated successfully' });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ error: 'Failed to update pet' });
  }
});

// Delete pet
router.delete('/:id', async (req, res) => {
  try {
    const connection = await createConnection();
    const [result] = await connection.execute('DELETE FROM pets WHERE id = ?', [req.params.id]);
    await connection.end();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});

module.exports = router;
