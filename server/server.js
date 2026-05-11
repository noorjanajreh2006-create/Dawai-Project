const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dawai'
});

db.connect(err => {
  if (err) console.error('DB Error:', err);
  else console.log('MySQL Connected');
});

app.get('/api/medications', (req, res) => {
  db.query('SELECT * FROM medications', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/medications', (req, res) => {
  const { name, dose, times, userId, notes } = req.body;
  db.query(
    'INSERT INTO medications (name, dose, times, userId, notes) VALUES (?, ?, ?, ?, ?)',
    [name, dose, times, userId, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

app.put('/api/medications/:id', (req, res) => {
  const { name, dose, times, notes } = req.body;
  db.query(
    'UPDATE medications SET name=?, dose=?, times=?, notes=? WHERE id=?',
    [name, dose, times, notes, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.delete('/api/medications/:id', (req, res) => {
  db.query('DELETE FROM medications WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

let logs = [];

app.post('/api/log-dose', (req, res) => {
  
  const { medId, status, date } = req.body;

  logs.push({ medId, status, date: date || new Date().toISOString().split('T')[0] });
  res.json({ success: true });

});

app.get('/api/stats', (req, res) => {

  if (logs.length === 0) return res.json([]);

  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

  const firstDate = new Date(sortedLogs[0].date);

  const today = new Date();

  const stats = [];

  let currentDate = new Date(firstDate);
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const daysLogs = logs.filter(l => l.date === dateStr);
    const taken = daysLogs.filter(l => l.status === 'taken').length;
    const totalExpected = daysLogs.length > 0 ? daysLogs.length : 1;
    stats.push({
      name: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateStr,
      adherence: Math.round((taken / totalExpected) * 100) || 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  res.json(stats.slice(-7));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));