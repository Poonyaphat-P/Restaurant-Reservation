import pool from '../db.js';

export const getTeam = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM team");
    res.json({ error: false, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};
