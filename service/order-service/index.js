const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

// Add a GET route to handle the root URL
app.get('/', (req, res) => {
  res.send('Order Service is up and running.');
});

app.post('/orders', (req, res) => {
  const order = req.body;
  console.log('Received order:', order);
  res.status(201).json({ message: 'Order placed successfully', order });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
