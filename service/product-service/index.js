const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }]);
});

app.listen(PORT, () => {
  console.log(Product Service running on port ${PORT});
});
