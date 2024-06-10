document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const apiKey = 'cece7134f0cae78f82fc7a7c2586c2a0'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                handleError(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again later.');
        });
});

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    // Fetch weather-related GIFs from Giphy
    const giphyApiKey = '2GyxwhKydEok1yDSJ3BcTGghQOlVr5qL'; // Replace with your Giphy API key
    const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=weather ${description}&limit=1`;

    fetch(giphyUrl)
        .then(response => response.json())
        .then(giphyData => {
            if (giphyData.data && giphyData.data.length > 0) {
                const gifUrl = giphyData.data[0].images.original.url;

                // Clear previous GIF
                const weatherGif = document.getElementById('weatherGif');
                weatherGif.innerHTML = '';

                // Create img element for the GIF
                const gifImg = document.createElement('img');
                gifImg.src = gifUrl;
                gifImg.alt = 'Weather GIF';
                weatherGif.appendChild(gifImg);
            } else {
                // If no relevant GIFs found, display default GIF
                const defaultGifUrl = 'https://media.giphy.com/media/JQmThmTnQxZFT7hXzC/giphy.gif'; // Default GIF

                // Clear previous GIF
                const weatherGif = document.getElementById('weatherGif');
                weatherGif.innerHTML = '';

                // Create img element for the default GIF
                const gifImg = document.createElement('img');
                gifImg.src = defaultGifUrl;
                gifImg.alt = 'Weather GIF';
                weatherGif.appendChild(gifImg);
            }
        })
        .catch(error => {
            console.error('Error fetching weather GIF:', error);
            // If error occurs, display default GIF
            const defaultGifUrl = 'https://media.giphy.com/media/JQmThmTnQxZFT7hXzC/giphy.gif'; // Default GIF

            // Clear previous GIF
            const weatherGif = document.getElementById('weatherGif');
            weatherGif.innerHTML = '';

            // Create img element for the default GIF
            const gifImg = document.createElement('img');
            gifImg.src = defaultGifUrl;
            gifImg.alt = 'Weather GIF';
            weatherGif.appendChild(gifImg);
        });

    // Display other weather information
    weatherDisplay.innerHTML = `
        <div>Temperature: ${temperature}°C</div>
        <div>Humidity: ${humidity}%</div>
        <div>Condition: ${description}</div>
    `;
}

function handleError(data) {
    let errorMessage = 'An error occurred. Please try again.';
    if (data.cod === '404') {
        errorMessage = 'Location not found. Please enter a valid location.';
    }
    alert(errorMessage);
}
