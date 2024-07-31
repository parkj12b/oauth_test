
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const UID = process.env.UID;
const SECRET = process.env.SECRET;
const grant_type = "client_credentials";
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const algoliasearch = require('algoliasearch');
const algoliaId = process.env.ALGOLIA_ID;
const algoliaWrite = process.env.ALGOLIA_WRITE;

const client = algoliasearch(algoliaId, algoliaWrite);
const index = client.initIndex('projects');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get("/", async (req, res) => {
	const {record} = req.body;
	try {
		await index.saveObject(record, { autoGenerateObjectIDIfNotExist: true });
		res.status(200);
		res.sendFile(path.join(__dirname, 'algolia.html'));
	  } catch (error) {
		res.status(500).send(`Error adding/updating record: ${error.message}`);
	  }
});

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
	res.cookie('oauth', response.data.access_token, { 
		httpOnly: true,
		secure: false,
		maxAge: response.data.expires_in * 1000 
	});
	res.send(response.data);
	res.redirect('http://ec2-35-77-196-143.ap-northeast-1.compute.amazonaws.com:3000');
	} catch (error) {
		console.log('Error:', error.message);
		console.log(error.response);
		res.status(500).json({ error: 'Failed to send request'});
	}
  // Exchange code for an access token, etc.
});

app.get('/test', async (req, res) => {
	const cookies = req.cookies;
	console.log(cookies.oauth);
	try {
		const response = await axios.get(`https://api.intra.42.fr/v2/projects`, {
			headers: {
				'Authorization': `Bearer ${cookies.oauth}`,
				'Accept': 'application/json'
			}
		});
		res.send(response.data);
	} catch (error) {
		res.cookie('oauth', '', { maxAge: 0 });
		console.log('Error:', error.message);
		console.log(error.response);
		res.status(500).json({ error: 'Failed to send request'});
	}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
