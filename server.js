const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/auth/callback', (req, res) => {
  const code = req.query.code;
  // Exchange code for an access token, etc.
  res.send('Authorization code received');
});

app.post('/token', (req, res) => {
  const { grant_type, code, redirect_uri } = req.body;
  // Handle token exchange, validate code, etc.
  res.json({ access_token: 'your_access_token' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
