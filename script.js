(function () {
// NASA API
const count = 10;
const apiKey = 'zN9qoF8IGbcu0CLqzHYsAfsrtX4PhEIZc8z2F3zM';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 images from NASA API
async function gettingNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
    } catch (error) {
        
    }
}

// On load
gettingNasaPictures();
}());
