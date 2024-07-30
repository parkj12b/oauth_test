
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const UID = process.env.UID;
const SECRET = process.env.SECRET;
const grant_type = "client_credentials";
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
	//const tokenUrl = `https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_id=${UID}&client_secret=${SECRET}&code=${code}`;

	try {
	const response = await axios.post('https://api.intra.42.fr/oauth/token', {
		grant_type: 'authorization_code',
		client_id: UID,
		client_secret: SECRET,
		code: code,
		redirect_uri: "http://ec2-35-77-196-143.ap-northeast-1.compute.amazonaws.com:3000/auth/callback"
	});
	console.log(response.data);
	res.send(response.data);
	} catch (error) {
		console.log('Error:', error.message);
		console.log(error.response);
		res.status(500).json({ error: 'Failed to send request'});
	}
  // Exchange code for an access token, etc.
});

app.post('/test', async (req, res) => {
	const cookies = req.cookies;
  	const response = await axios.get(`https://api.intra.42.fr/v2/projects?Authorization=${cookies.oauth}`);
  	res.send(response.data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
