
let store = Immutable.Map({
    user: Immutable.Map({ name: "Amelie" }),
    apod: '',
    opp : '',
    opp_image: '',
    curiosity: '',
    curiosity_image: '',
    spirit: '',
    spirit_image: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
})

// adding content to the div element with the id root 
const root = document.getElementById('root')
// const miau = document.getElementById('miau')

// updating the store when new data comes in :) 
// function is called when API is called
const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

// innerHTML is the result of calling the App function
const render = async (root, state) => {
    root.innerHTML = App(state)
}

// App function defined to return all content for page when called :)
// ${ImageOfTheDay(apod)}


const App = (state) => {
    let { rovers, apod, curiosity, curiosity_image, rover, opp, opp_image, spirit, spirit_image } = state

    return `
        <header>
        </header>
        <main>
            <h1>Mars Dashboard</h1>
            <h4>Have the ${store.getIn(['rovers', '2'])}, take the ${store.getIn(['rovers', '1'])} and discover with ${store.getIn(['rovers', '0'])}</h4>
            <h2 style = "color:white;">_</h2>
            <h2>Curious about the latest pictures from Mars?</h2>
            
            <p></p>
            <section>
            <!-- Tab Links -->
            <div class="tab">
                <button id="curiositylink "class="tablinks" onclick="showMars(event, 'Curiosity')">Curiosity</button>
                <button id="opportunitylink" class="tablinks" onclick="showMars(event, 'Opportunity')">Opportunity</button>
                <button id="spiritlink" class="tablinks" onclick="showMars(event, 'Spirit')">Spirit</button>
            </div>

            <!-- Tab content -->
            <!-- The Curiosity Tab -->
            <div id="Curiosity" class="tabcontent">
                <h3>Curiosity</h3>
                ${ExtraInformation(curiosity)}
                <!-- The grid: four columns -->
                <div class="row">
                    <div class="column">
                    ${Curiosity(curiosity, curiosity_image, 0)}
                    </div>
                <div class="column">
                    ${Curiosity(curiosity, curiosity_image, 1)}
                </div>
                <div class="column">
                    ${Curiosity(curiosity, curiosity_image, 2)}
                </div>
                <div class="column">
                    ${Curiosity(curiosity, curiosity_image, 3)}
                </div>
                </div>
            </div>

            <!-- The Opportunity Tab -->

            <div id="Opportunity" class="tabcontent">
                <h3>Opportunity</h3>
                ${ExtraInformation(opp)}
                <!-- The grid: four columns -->
                <div class="row">
                    <div class="column">
                    ${Opportunity(opp, opp_image, 0)}
                    </div>
                <div class="column">
                    <p> :) </p>
                </div>
                <div class="column">
                    <p> :) </p>
                </div>
                <div class="column">
                    <p> :) </p>
                </div>
                </div>
            </div>

            <!-- The Spirit Tab -->

            <div id="Spirit" class="tabcontent">
                <h3>Spirit</h3>
                ${ExtraInformation(spirit)}
                <!-- The grid: four columns -->
                <div class="row">
                    <div class="column">
                    ${Spirit(spirit, spirit_image, 0)}
                </div>
                <div class="column">
                    ${Spirit(spirit, spirit_image, 1)}
                </div>
                <div class="column">
                    <p> :) </p>
                </div>
                <div class="column">
                   <p> :) </p>
                </div>
                </div>
            </div>


                <p>
                <!-- The expanding image container -->
                <div class="container">
                <!-- Close the image -->
                <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

                <!-- Expanded image -->
                <img id="expandedImg" style="width:100%">

                <!-- Image text -->
                <div id="imgtext"></div>
                </div>
                </p>
            <h2 style = "color:white;">_</h2>
            <h2>... or the Astronomy Picture of the Day?</h2>
            ${ImageOfTheDay(apod)}  
               
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
    // render(root, store)
    console.log('page loaded...')
})


// ------------------------------------------------------  COMPONENTS

const ExtraInformation = (rover) => {
    if (!rover) {
        getCuriosity(store)
   }

   if (rover) {
       return  (`

       <p>Launch date: ${rover.image.photo_manifest.launch_date}</p>
       <p>Landing date: ${rover.image.photo_manifest.landing_date}</p>
       <p style="color:red;">Status: ${rover.image.photo_manifest.status}</p>
       <p>Latest photos: ${rover.image.photo_manifest.max_date}</p>

       `)
   }
}

    // Onlick function - show an expanded version of a clicked image 
  function myFunction(imgs) {

    document.getElementById("expandedImg").src = imgs.src;
    document.getElementById("expandedImg").parentElement.style.display = "block";

    document.getElementById("imgtext").innerHTML = imgs.alt;
  }

// Onclick function - hide tab content to begin with 
// if tab was clicked, change status to active
function showMars(event, roverName) {
    // // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent"); 
    const Setnone = (arguments) => {
        return Array.prototype.slice.call(arguments).map(tab => tab.style.display = "none")
    }
    Setnone(tabcontent);

    // Change status of tablinks
    const tablinks = document.getElementsByClassName("tablinks");
    const Changelink = (links) => {
        return Array.prototype.slice.call(links).map((tablink) => { if (tablink.className = "active") {tablink.className = ""}
        })
    }
    Changelink(tablinks);

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(roverName).style.display = "block";
    event.currentTarget.className += "active";
  }


// A pure function that renders infomation requested from the backend
// Information for the image of the day 
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// Display the Curiosity images with onclick Function 
const Curiosity =  (curiosity, curiosity_image, pudding) => {
    if (!curiosity && !curiosity_image) {
         getCuriosity(store)
    }

    if (curiosity_image.photos[pudding].rover.name === "Curiosity") {
        return  (`
        <img src="${curiosity_image.photos[pudding].img_src}" "alt="Nature" onclick="myFunction(this);">
        `)
    }
}

// Display the Opportunity images with onclick Function 
const Opportunity =  (opp, opp_image, pudding) => {
    if (!opp && !opp_image) {
         getOpp(store)
        }

    if (opp.image.photo_manifest.name === "Opportunity") {
        return  (`     
        <img src="${opp_image.photos[pudding].img_src}" onclick="myFunction(this);">
        
        `)
    }
}

// Display the Spirit images with onclick function
const Spirit =  (spirit, spirit_image, pudding) => {
    if (!spirit && !spirit_image) {
         getSpirit(store)
    }

    if (spirit.image.photo_manifest.name === "Spirit") {
        return  (`     
        <img src="${spirit_image.photos[pudding].img_src}" onclick="myFunction(this);">
        
        `)
    }
}


// ------------------------------------------------------  API CALLS

// API call for the image of the day
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
}

// API calls Curiosity: date latest pictures were taken, call for images
const getCuriosity = (state) => {
    let { curiosity, curiosity_image } = state

    fetch(`http://localhost:3000/date_curiosity`)
        .then(res => res.json())
        .then(curiosity => updateStore(store, { curiosity }))
        .then(() => {
            return fetch(`http://localhost:3000/curiosity/${state.curiosity.image.photo_manifest.max_date}`);
        })
        .then(res => res.json())
        .then(curiosity_image => updateStore(store, { curiosity_image }))
        .catch(function(error) {
            console.log('Request failed', error)
        })
    return state
}

// API calls Opportunity: date latest pictures were taken, call for images
const getOpp = (state) => {
    let { opp, opp_image } = state

    fetch(`http://localhost:3000/date_opportunity`)
        .then(res => res.json())
        .then(opp => updateStore(store, { opp }))
        .then(() => {
            return fetch(`http://localhost:3000/opportunity/${state.opp.image.photo_manifest.max_date}`);
        })
        .then(res => res.json())
        .then(opp_image => updateStore(store, { opp_image }))
        .catch(function(error) {
            console.log('Request failed', error)
        })
    return state
}

// API calls Spirit: date latest pictures were taken, call for images
const getSpirit = (state) => {
    let { spirit, spirit_image } = state

    fetch(`http://localhost:3000/date_spirit`)
        .then(res => res.json())
        .then(spirit => updateStore(store, { spirit }))
        .then(() => {
            return fetch(`http://localhost:3000/spirit/${state.spirit.image.photo_manifest.max_date}`);
        })
        .then(res => res.json())
        .then(spirit_image => updateStore(store, { spirit_image }))
        .catch(function(error) {
            console.log('Request failed', error)
        })
    return state
}

