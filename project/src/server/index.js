require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// example API call
app.get('/apod', async (req, res) => {
  try {
    const image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
      .then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log('error:', err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// API call to obtain the date of the latest rover pictures

app.get('/date_curiosity', async (req, res) => {
  try {
    const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=${process.env.API_KEY}`)
      .then((res) => res.json());
    console.log(image);
    res.send({ image });
  } catch (err) {
    console.log('error:', err);
  }
});
app.get('/date_opportunity', async (req, res) => {
  try {
    const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity/?api_key=${process.env.API_KEY}`)
      .then((res) => res.json());
    console.log(image);
    res.send({ image });
  } catch (err) {
    console.log('error:', err);
  }
});
app.get('/date_spirit', async (req, res) => {
  try {
    const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit/?api_key=${process.env.API_KEY}`)
      .then((res) => res.json());
    console.log(image);
    res.send({ image });
  } catch (err) {
    console.log('error:', err);
  }
});

// API calls regarding the data for the Rovers

async function marsRovers(rover, earth_date) {
  const api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=${process.env.API_KEY}`;
  const fetch_response = await fetch(api_url);
  const capri = await fetch_response.json();
  return capri;
}

app.get('/curiosity/:date', async (request, response) => {
  // Fetch from NASA
  const { date } = request.params;
  const data = await marsRovers('curiosity', date);
  // const data = await marsRovers("curiosity", "2021-01-11");
  response.json(data);
});

app.get('/opportunity/:date', async (request, response) => {
  // Fetch from NASA
  const { date } = request.params;
  const data = await marsRovers('opportunity', date);
  response.json(data);
});

app.get('/spirit/:date', async (request, response) => {
  // Fetch from NASA
  const { date } = request.params;
  const data = await marsRovers('spirit', date);
  response.json(data);
});
