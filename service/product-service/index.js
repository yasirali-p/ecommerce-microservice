const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Product Service is running');
});

// Products route
app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
