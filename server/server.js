const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Counter variable
let counter = 0;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Counter API is running!', counter });
});

app.get('/api/counter', (req, res) => {
  res.json({ counter });
});

app.post('/api/counter/increment', (req, res) => {
  counter++;
  res.json({ 
    message: 'Counter incremented successfully',
    counter 
  });
});

app.post('/api/counter/reset', (req, res) => {
  counter = 0;
  res.json({ 
    message: 'Counter reset successfully',
    counter 
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };