document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");

    // Now you can safely access cityInput.value
    console.log("cityInput value:", cityInput?.value);

    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessageDisplay = document.getElementById("error-message");

    const API_KEY = "f7eb268da59b6134902c310ddd3bb5b1";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        return await response.json();
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
        weatherInfo.classList.remove("hidden");
        errorMessageDisplay.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessageDisplay.classList.remove("hidden");
    }
});
