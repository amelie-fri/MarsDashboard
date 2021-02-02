require('dotenv').config()
const { json } = require('body-parser')
const { response } = require('express')
const express = require('express')
// const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '../public')))



// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// API call to obtain the date of the latest rover pictures

app.get('/date_curiosity', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        console.log(image);
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})


// API calls regarding the data for the Rovers

app.get("/curiosity/:date", async (request, response) => {
    // Fetch from NASA
    const date = request.params.date;
    const data = await marsRovers("curiosity", date);
    // const data = await marsRovers("curiosity", "2021-01-11");
    response.json(data);
  });

app.get("/opportunity", async (request, response) => {
    // Fetch from NASA
    const data = await marsRovers("opportunity", "2021-01-12");
    response.json(data);
});

app.get("/spirit", async (request, response) => {
    // Fetch from NASA
    const data = await marsRovers("spirit", "2021-01-12");
    response.json(data);
});

  async function marsRovers(rover, earth_date) {
    const api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=${process.env.API_KEY}`;
    const fetch_response = await fetch(api_url);
    const capri = await fetch_response.json();
    return capri;
}
