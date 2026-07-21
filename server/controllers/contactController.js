import pool from '../db.js';

export const submitForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: true, message: 'Please fill in required fields.' });
  }

  try {
    await pool.query(
      `INSERT INTO forms (name, email, phone, message) VALUES (?, ?, ?, ?)`,
      [name, email, phone, message]
    );
    res.json({ error: false, message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const getForms = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM forms");
    res.json({ error: false, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const updateFormStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query("UPDATE forms SET status = ? WHERE id = ?", [status, id]);
    res.json({ error: false, message: "Status updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM forms WHERE id = ?", [id]);
    res.json({ error: false, message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};
