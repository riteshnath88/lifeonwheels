const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    message: 'GET API endpoint',
  });
});

app.post('/api/v1/tours', (req, res) => {
  res.status(200).json({
    message: 'POST API endpoint',
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
