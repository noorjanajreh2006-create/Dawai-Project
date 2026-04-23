const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for logs (resets on server restart)
let logs = [];

// API route to record a dose
app.post('/api/log-dose', (req, res) => {
  const { medId, status, date } = req.body;
  logs.push({ 
    medId, 
    status, 
    date: date || new Date().toISOString().split('T')[0] 
  });
  res.json({ success: true });
});

// API route for Statistics - Calculated from first use
app.get('/api/stats', (req, res) => {
  if (logs.length === 0) {
    // Return empty or dummy if no activity yet
    return res.json([]);
  }

  // Sort logs by date to find the first use
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstDate = new Date(sortedLogs[0].date);
  const today = new Date();
  
  const stats = [];
  let currentDate = new Date(firstDate);

  // Generate stats for each day from first use until today
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const daysLogs = logs.filter(l => l.date === dateStr);
    
    // Simulating "total expected" as a constant for now or based on med count
    // Realistically you'd check how many meds were active on this date
    const taken = daysLogs.filter(l => l.status === 'taken').length;
    const totalExpected = daysLogs.length > 0 ? daysLogs.length : 1; // Simplified
    
    stats.push({
      name: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateStr,
      adherence: Math.round((taken / totalExpected) * 100) || 0
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  res.json(stats.slice(-7)); // Return last 7 days of active progress
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
