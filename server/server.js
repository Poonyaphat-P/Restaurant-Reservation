import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pool from "./db.js";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post("/api/admin/menu", upload.single('image'), async (req, res) => {
  const { categoryID, name, description, price, is_recommended } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  if (!categoryID || !name || !price) {
    return res.status(400).json({ error: true, message: 'Please provide menu information' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO menu_items (category_id, name, description, price, image, is_recommended) VALUES (?, ?, ?, ?, ?, ?)`,
      [categoryID, name, description, price, imagePath, is_recommended ? 1 : 0]
    );
    res.json({ error: false, message: 'New menu has been added successfully.' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.get ("/api/admin/menu", async (req, res) => {
  try {
    const [rows] =await pool.query("SELECT * FROM menu_items")
    res.json({ error: false, data: rows });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
})

app.put ("/api/admin/menu", upload.single('image'),async (req, res) => {
  const { id, categoryID, name, description, price, is_recommended } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  try {
    if (imagePath) {
      await pool.query(
        `UPDATE menu_items SET category_id=?, name=?, description=?, price=?, image=?, is_recommended=? WHERE id=?`,
        [categoryID, name, description, price, imagePath, is_recommended ? 1 : 0, id]
      )
    } else {
      await pool.query(
        `UPDATE menu_items SET category_id=?, name=?, description=?, price=?, is_recommended=? WHERE id=?`,
        [categoryID, name, description, price, is_recommended ? 1 : 0, id]
      )
    }
    res.json({ error: false, message: 'Menu updated successfully.' })
  } catch (err) {
    res.status(500).json({ error: true, message: err.message })
  }
})

app.delete("/api/admin/menu/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);
    res.json({ error: false, message: 'Menu deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});


// POST /api/contact — รับ form จาก ContactForm
app.post("/api/contact",upload.none(), async (req, res) => {
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
    res.status(500).json({ error: true, message: err.message });
  }
});

// GET /api/admin/contact — ดึงข้อมูลทั้งหมด
app.get("/api/admin/contact", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM forms");
    res.json({ error: false, data: rows });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.patch("/api/admin/contact/:id", async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    await pool.query("UPDATE forms SET status = ? WHERE id = ?", [status, id])
    res.json({ error: false, message: "Status updated." })
  } catch (err) {
    res.status(500).json({ error: true, message: err.message })
  }
})

app.delete("/api/admin/contact/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM forms WHERE id = ?", [id])
    res.json({ error: false, message: "Deleted" })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
})

app.get("/api/menu", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items")
    res.json({ error: false, data: rows })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
})

app.post("/api/reservation", upload.none(), async (req, res) => {
  const { f_name, l_name, phone, email, description, partySize, reservationTime, reservationDate, status } = req.body
  if (!f_name || !l_name || !partySize || !reservationTime || !reservationDate) {
    return res.status(400).json({ error: true, message: 'Please fill in required fields.' })
  }
  try {
    await pool.query(
      `INSERT INTO reservations (f_name, l_name, phone, email, description, party_size, reservation_time, reservation_date, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [f_name, l_name, phone, email, description, partySize, reservationTime, reservationDate, status]
    )
    res.json({ error: false, message: 'Reservation created successfully!' })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
})

app.get("/api/admin/reservations", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reservations")
    res.json({ error: false, data: rows })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
})

app.delete("/api/admin/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM reservations WHERE id = ?", [id])
    res.json({ error: false, message: "Deleted" })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
})

app.patch('/api/admin/menu/:id/recommend', async (req, res) => {
  const { is_recommended } = req.body;
  try {
    await pool.query('UPDATE menu_items SET is_recommended = ? WHERE id = ?', [is_recommended ? 1 : 0, req.params.id]);
    res.json({ error: false, message: 'Recommend status updated.' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});

