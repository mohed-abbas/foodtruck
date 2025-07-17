const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3000;
const app = express();

// parse json bodies
app.use(express.json());

// database initialization
const db = new sqlite3.Database(path.join(__dirname, 'foodtruck.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    items TEXT
  )`);

  // populate menu_items from JSON if empty
  db.get('SELECT COUNT(*) as count FROM menu_items', (err, row) => {
    if (err) return console.error('DB error:', err);
    if (row.count === 0) {
      const dataPath = path.join(__dirname, 'public', 'assets', 'data', 'menu.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const stmt = db.prepare('INSERT INTO menu_items(id,name,description,price,image) VALUES (?,?,?,?,?)');
      data.forEach(item => {
        stmt.run(item.id, item.name, item.description, item.price, item.image);
      });
      stmt.finalize();
      console.log('Menu items inserted into database');
    }
  });
});

// API routes
app.get('/menu', (req, res) => {
  db.all('SELECT * FROM menu_items', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/orders', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid items' });
  const stmt = db.prepare('INSERT INTO orders(items) VALUES (?)');
  stmt.run(JSON.stringify(items), function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
