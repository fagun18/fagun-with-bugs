const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// File to store visitor count
const filePath = './visitorCount.json';

// Initialize visitor count file if not present
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
}

// Route to get the visitor count
app.get('/api/visitor-count', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json({ count: data.count });
});

// Route to increment visitor count
app.post('/api/visitor-count', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  data.count += 1;
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.json({ count: data.count });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
