import pool from '../db.js';

export const createReservation = async (req, res) => {
  const { f_name, l_name, phone, email, description, partySize, reservationTime, reservationDate, status } = req.body;

  try {
    await pool.query(
      `INSERT INTO reservations (f_name, l_name, phone, email, description, party_size, reservation_time, reservation_date, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [f_name, l_name, phone, email, description, partySize, reservationTime, reservationDate, status]
    );
    res.json({ error: false, message: 'Reservation created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reservations ORDER BY id DESC");
    res.json({ error: false, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
    res.json({ error: false, message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
  }
};
