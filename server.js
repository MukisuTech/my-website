const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json({ limit: '2mb' }));

// Save layout endpoint
app.post('/admin/save-layout', (req, res) => {
  const html = req.body.html;
  // Basic security: only allow if password matches
  if (req.body.password !== (process.env.ADMIN_PASSWORD || '1234')) {
    return res.status(403).send('Wrong password');
  }
  fs.writeFile(path.join(__dirname, 'index.html'), html, err => {
    if (err) return res.status(500).send('Error saving file');
    res.send('Saved!');
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));