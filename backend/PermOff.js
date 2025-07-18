const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

const dbPath = path.resolve(__dirname, '../db/users.db');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка при открытии базы данных:', err.message);
  } else {
    console.log('База данных успешно открыта');

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        position TEXT,
        gender TEXT,
        age INTEGER,
        avatar_url TEXT
      )
    `, (err) => {
      if (err) console.error('Ошибка создания таблицы:', err.message);
    });
  }
});

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { first_name, last_name, position, gender, age, avatar_url } = req.body;
  db.run(
    `INSERT INTO users (first_name, last_name, position, gender, age, avatar_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, position, gender, age, avatar_url],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put('/users/:id', (req, res) => {
  const { first_name, last_name, position, gender, age, avatar_url } = req.body;
  db.run(
    `UPDATE users SET first_name=?, last_name=?, position=?, gender=?, age=?, avatar_url=? WHERE id=?`,
    [first_name, last_name, position, gender, age, avatar_url, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete('/users/:id', (req, res) => {
  db.run(`DELETE FROM users WHERE id=?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
