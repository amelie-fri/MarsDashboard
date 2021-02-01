// the store for the updated data :)
let store = {
    user: { name: "Amelie" },
    apod: '',
    date_curiosity: '',
    curiosity: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    rover : 'Curiosity'
}

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

// ${latestDate(date_curiosity)} what i removed under rovers :) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // ${curiosityIMG(curiosity)}

            //     <div id="Curiosity" class="tabcontent">
            //     <h3>Curiosity</h3>
            //     <p>London is the capital city of England.</p>
            // </div>



// recently removed: 
//<button class="tablinks" onclick="openCity(event, 'Curiosity')">Curiosity</button>
// create content
// actually used showMars
// App function defined to return all content for page when called :)
const App = (state) => {
    let { rovers, apod, date_curiosity, curiosity, rover } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
            <!-- Tab content -->
            <div class="tab">
                <button id="curiositylink "class="tablinks" onclick="showMars(event, 'Curiosity')">Curiosity</button>
                <button id="opportunitylink" class="tablinks" onclick="showMars(event, 'Opportunity')">Opportunity</button>
                <button id="spiritlink" class="tablinks" onclick="showMars(event, 'Spirit')">Spirit</button>
            </div>

            <!-- Tab content -->
            
            <div id="Curiosity" class="tabcontent">
                <h3>Curiosity</h3>
                <p>London is the capital city of England.</p>
                <!-- The grid: four columns -->
                <div class="row">
                    <div class="column">
                    ${latestDate(date_curiosity, curiosity, 0)}
                    <img src="img_nature.jpg" "alt="Nature" onclick="myFunction(this);">
                    </div>
                <div class="column">
                    ${latestDate(date_curiosity, curiosity, 1)}
                    <img src="img_snow.jpg" alt="Snow" onclick="myFunction(this);">
                </div>
                <div class="column">
                    ${latestDate(date_curiosity, curiosity, 2)}
                    <img src="img_mountains.jpg" alt="Mountains" onclick="myFunction(this);">
                </div>
                <div class="column">
                    ${latestDate(date_curiosity, curiosity, 3)}
                    <img src="img_lights.jpg" alt="Lights" onclick="myFunction(this);">
                </div>
                </div>

                <!-- The expanding image container -->
                <div class="container">
                <!-- Close the image -->
                <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

                <!-- Expanded image -->
                <img id="expandedImg" style="width:100%">

                <!-- Image text -->
                <div id="imgtext"></div>
                </div>
            </div>

            <div id="Opportunity" class="tabcontent">
                <h3>Paris</h3>
                <p>Paris is the capital of France.</p>
            </div>

            <div id="Spirit" class="tabcontent">
                <h3>Tokyo</h3>
                <p>Tokyo is the capital of Japan.</p>
            </div>
                <p>Curious about the latest pictures from Mars?</p>
                <p>Pick one of the Mars Rovers</p>
                <p>
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
    console.log('page loaded...')
})


// ------------------------------------------------------  COMPONENTS

const CuriosImage = () => {

}



function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

function myFunctionnew() {
    // Get the expanded image
    const theimage = document.getElementById("nature2");
    console.log(theimage);
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = theimage.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = theimage.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }


function showMars(event, cityName) {
    // const Setnone = (tab) => {
    // tab.style.display = "none";
    // }
    // // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    // alternative function 
    const Setnone = (arguments) => {
        return Array.prototype.slice.call(arguments).map(tab => tab.style.display = "none")
    }
    Setnone(tabcontent);
    // // .................
    // const tabarray = Array.prototype.slice.call(tabcontent);
    // console.log(tabarray);
    // tabarray.map(tab => Setnone(tab));
    // tabcontent[0].style.display = "none";
    // tabcontent[1].style.display = "none";
    // tabcontent[2].style.display = "none";
    
    
    // Get all elements with class="tablinks" and remove the class "active"
    // const Changelink = (link) => {
    //     if (link.className = "active") {
    //         link.className = ""
    //     }
    // }    
    const tablinks = document.getElementsByClassName("tablinks");
    const Changelink = (links) => {
        return Array.prototype.slice.call(links).map((tablink) => { if (tablink.className = "active") {tablink.className = ""}
        })
    }
    Changelink(tablinks);

    // const tablinksarray = Array.prototype.slice.call(tablinks);
    // tablinksarray.map(link => Changelink(link))
    // tablinks[0].className === tablinks[0].className.replace("active", "");
    // tablinks[1].className === tablinks[0].className.replace("active", "");
    // tablinks[2].className === tablinks[0].className.replace("active", "");

  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += "active";
  }





// ***********************************************************************************************************
// or I need to put the eventlistener outside :) 
// const tab = document.getElementById('zimti');
// tab.addEventListener('click', showText);


// const Content = () => {
//     const showText = () => {
//         console.log('hei hei hie hieh hei')
//     }
 
//     // console.log('Heiiiiiiiiiiiiiiiiiiiiiii Markus');
//     console.log('miepmipemipemiep');


    // if (rover === 'Curiosity') {
        // return `
        //     <div id="Curiosity" class="tabcontent">
        //         <h3>Get the rover ${rover}</h3>
        //         <p>London is the capital city of England.</p>
        //     </div>
        // `
    // }

// }






// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Mars Dashboard - Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
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

const latestDate =  (date_curiosity, curiosity, pudding) => {
    if (!date_curiosity && !curiosity) {
         getLatestDate(store)
    }
    console.log(pudding);
    
    if (curiosity.photos[pudding].rover.name === "Curiosity") {
        console.log(curiosity.photos[pudding].img_src)
        return  (`
        <img src="${curiosity.photos[pudding].img_src}" "alt="Nature" onclick="myFunction(this);">
        `)
    }


// const latestDateOpp =  (date_curiosity, curiosity) => {
//     if (!date_curiosity && !curiosity) {
//          getLatestDate(store)
//     }
//     if (curiosity.photos[0].rover.name === "Curiosity") {
//         console.log(curiosity.photos[0].img_src)
//         return  (`
//         <img src="${curiosity.photos[0].img_src}" alt="Nature" onclick="myFunction(this);">
//         `)
//     }



    // const latestDate = async (date_curiosity, curiosity) => {
    //     async function miau(date_curiosity, curiosity) {
    //         if (!date_curiosity && !curiosity) {
    //         return prestep = await getLatestDate(store);
    //         }
    //     }
    //     miau().then(() => {
    //         console.log
    //     })
        
        // return
        // if (!date_curiosity && !curiosity) {
        //     const final = await getLatestDate(store);
        //     console.log(store);
        //     console.log(store.curiosity.photos[0].img_src);
        //     return (`<p>${store.curiosity.photos[0].img_src}</p>`)
        // }

    // async function hello() {
    //     return greeting = await Promise.resolve("Hello");
    //   };
      
    //   hello().then(alert);


    // console.log(curiosity.photos[1].img_src)
    // return (`<p>${curiosity.photos[1].img_src}</p>`)
    
    // console.log(date_curiosity.image.photo_manifest.max_date)
    // return (`<p>${date_curiosity.image.photo_manifest.max_date}</p>`)


}
// const curiosityIMG = (curiosity) => {
//     if (!curiosity) {
//        getCuriosity(store);
//     }
//     console.log(curiosity.photos[1].img_src)
//     return (`<p>${curiosity.photos[1].img_src}</p>`)

// }

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
}

// My API call :) 
// const json = fetch(`http://localhost:3000/curiosity`)
// .then((response) => {
//   return response.json();
// })
// .catch((error) => {
//   console.log(error);
// });

// API call date :)
// const json = fetch(`http://localhost:3000/date`)
// .then((response) => {
//   return response.json();
// })
// .catch((error) => {
//   console.log(error);
// });

const getLatestDate = (state) => {
    let { date_curiosity, curiosity } = state

    fetch(`http://localhost:3000/date_curiosity`)
        .then(res => res.json())
        .then(date_curiosity => updateStore(store, { date_curiosity }))
        // return date_curiosity
        .then(()=> {
            console.log('here it shoule beeeee')
            console.log(state.date_curiosity.image.photo_manifest.max_date)
        })
        .then(() => {
            // const input = date_curiosity.image.photo_manifest.max_date;
            // console.log(state.date_curiosity.image.photo_manifest_max_date);
            // return fetch(`http://localhost:3000/curiosity/${"2021-01-25"}`);
            return fetch(`http://localhost:3000/curiosity/${state.date_curiosity.image.photo_manifest.max_date}`);
        })
        .then(res => res.json())
        .then(curiosity => updateStore(store, { curiosity }))
        .then(() => {
            console.log(store)
        })
        // .then(state => {
        //     console.log(state)
        // })
        .catch(function(error) {
            console.log('Request failed', error)
        })
    // return state
}

// var url = 'https://api.spacexdata.com/v2/launches/latest';

// var result = fetch(url, {
//     method: 'get',
//   }).then(function(response) {
//     return response.json(); // pass the data as promise to next then block
//   }).then(function(data) {
//     var rocketId = data.rocket.rocket_id;

//     console.log(rocketId, '\n');
  
//     return fetch('https://api.spacexdata.com/v2/rockets/' + rocketId); // make a 2nd request and return a promise
//   })
//   .then(function(response) {
//     return response.json();
//   })
//   .catch(function(error) {
//     console.log('Request failed', error)
//   })

// // I'm using the result variable to show that you can continue to extend the chain from the returned promise
// result.then(function(r) {
//   console.log(r); // 2nd request result
// });



// const getCuriosity = async (state) => {
//     let { curiosity } = state

//     await fetch(`http://localhost:3000/curiosity`)
//         .then(res => res.json())
//         .then(curiosity => updateStore(store, { curiosity }))


//     // return data
// }

// const getCuriosity = async (state) => {
//     const input = "2021-01-11"
//     // const input = "2021-01-11"
//     // const input = state.date_curiosity
//     let { curiosity } = state

//     await fetch(`http://localhost:3000/curiosity/${input}`)
//         .then(res => res.json())
//         .then(curiosity => updateStore(store, { curiosity }))


//     // return data
// }