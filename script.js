(function () {
    const resultNav = document.querySelector('[data-results-nav]');
    const favoritesNav = document.querySelector('[data-favorites-nav]');
    const imagesContainer = document.querySelector('[data-images-container]');
    const saveConfirmed = document.querySelector('[data-save-confirmed]');
    const loader = document.querySelector('[data-loader]');


    // NASA API
    const count = 10;
    const apiKey = 'zN9qoF8IGbcu0CLqzHYsAfsrtX4PhEIZc8z2F3zM';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

    let resultsArray = [];
    let favorites = {};

    function saveFavorite(e) {
        const link = e.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
        // Loop through Results Array to select favorite
        resultsArray.forEach((item) => {
            if (item.url === link && !favorites[link]) {
                favorites[link] = item;
                // Show save confirmation for 2 seconds
                saveConfirmed.hidden = false;
                setTimeout(() => {
                    saveConfirmed.hidden = true;
                }, 2000);
                // Set favorites in localStorage
                localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
            }
        })
    }

    function updateDOM(resultsArray) {
        console.log(resultsArray);
        resultsArray.forEach((result) => {
            //  Card container
            const card = document.createElement('div');
            card.classList.add('card');
            // Link
            const link = document.createElement('a');
            link.href = result.hdurl;
            link.title = 'View full Image';
            link.target = '_black';
            // Image
            const image = document.createElement('img');
            image.src = result.url;
            image.alt = 'NASA picture of the Day';
            image.loading = 'lazy';
            image.classList.add('card-img-top');
            // Card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            // Card title
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = result.title;
            // Save Text
            const saveText = document.createElement('p');
            saveText.classList.add('clickable');
            saveText.textContent = 'Add to favorites';
            saveText.addEventListener('click', saveFavorite);
            // Card Text
            const cardText = document.createElement('p');
            cardText.textContent = result.explanation;
            // Footer container
            const footer = document.createElement('small');
            footer.classList.add('text-muted');
            // Date
            const date = document.createElement('strong');
            date.textContent = result.date;
            // Copyright
            const copyrightResult = result.copyright === undefined ? '' : result.copyright;
            const copyright = document.createElement('span');
            copyright.textContent = ` ${copyrightResult}`;
            // Append
            footer.append(date, copyright);
            cardBody.append(cardTitle, saveText, footer)
            link.appendChild(image);
            card.append(link, cardBody);
            imagesContainer.appendChild(card);
        });
    }

    // Get 10 images from NASA API
    async function gettingNasaPictures() {
        try {
            const response = await fetch(apiUrl);
            resultsArray = await response.json();
            console.log(resultsArray);
            updateDOM(resultsArray);
        } catch (error) {
            
        }
    }

    // On load
    gettingNasaPictures();
}());
