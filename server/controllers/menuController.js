import pool from '../db.js';

export const getMenu = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items");
    res.json({ error: false, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const getMenuAdmin = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items");
    res.json({ error: false, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const createMenu = async (req, res) => {
  const { categoryID, name, description, price, is_recommended } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  if (!categoryID || !name || !price) {
    return res.status(400).json({ error: true, message: 'Please provide menu information' });
  }

  try {
    await pool.query(
      `INSERT INTO menu_items (category_id, name, description, price, image, is_recommended) VALUES (?, ?, ?, ?, ?, ?)`,
      [categoryID, name, description, price, imagePath, is_recommended ? 1 : 0]
    );
    res.json({ error: false, message: 'New menu has been added successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const updateMenu = async (req, res) => {
  const { id, categoryID, name, description, price, is_recommended } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  try {
    if (imagePath) {
      await pool.query(
        `UPDATE menu_items SET category_id=?, name=?, description=?, price=?, image=?, is_recommended=? WHERE id=?`,
        [categoryID, name, description, price, imagePath, is_recommended ? 1 : 0, id]
      );
    } else {
      await pool.query(
        `UPDATE menu_items SET category_id=?, name=?, description=?, price=?, is_recommended=? WHERE id=?`,
        [categoryID, name, description, price, is_recommended ? 1 : 0, id]
      );
    }
    res.json({ error: false, message: 'Menu updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);
    res.json({ error: false, message: 'Menu deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const toggleRecommend = async (req, res) => {
  const { is_recommended } = req.body;

  try {
    await pool.query('UPDATE menu_items SET is_recommended = ? WHERE id = ?', [is_recommended ? 1 : 0, req.params.id]);
    res.json({ error: false, message: 'Recommend status updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};
