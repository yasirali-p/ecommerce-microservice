const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

app.post('/orders', (req, res) => {
  const order = req.body;
  console.log('Received order:', order);
  res.status(201).json({ message: 'Order placed successfully', order });
});

app.listen(PORT, () => {
  console.log(Order Service running on port ${PORT});
});
