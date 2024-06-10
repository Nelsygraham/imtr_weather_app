

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

    let emoji = '';
    if (description.includes('rain')) {
        emoji = '🌧️';
    } else if (description.includes('cloud')) {
        emoji = '☁️';
    } else if (description.includes('sun')) {
        emoji = '☀️';
    } else if (description.includes('snow')) {
        emoji = '❄️';
    } else if (description.includes('storm')) {
        emoji = '⛈️';
    } else {
        emoji = '🌡️';
    }

    weatherDisplay.innerHTML = `
        <div class="weather-emoji">${emoji}</div>
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
