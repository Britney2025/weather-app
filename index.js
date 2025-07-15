const API_KEY = '1a6ba802fffefbc2d92a9888bbf5fd4c';
const form = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const resultDiv = document.getElementById('weather-result');
const loadingDiv = document.getElementById('loading');
const toggleBtn = document.getElementById('toggle-temp');
let currentWeather = null;
let isCelsius = true;
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;
  resultDiv.innerHTML = '';
  loadingDiv.classList.remove('hidden');
  toggleBtn.classList.add('hidden');
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('City not found. Try again.');
    const data = await response.json();
    currentWeather = data;
    isCelsius = true;
    displayWeather(data);
    toggleBtn.classList.remove('hidden');
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  } finally {
    loadingDiv.classList.add('hidden');
  }
});
toggleBtn.addEventListener('click', () => {
  if (currentWeather) {
    isCelsius = !isCelsius;
    displayWeather(currentWeather);
  }
});
function displayWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const tempC = data.main.temp;
  const tempF = (tempC * 9/5) + 32;
  const temperature = isCelsius ? `${tempC.toFixed(1)} °C` : `${tempF.toFixed(1)} °F`;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  resultDiv.innerHTML = `
    <h2>${city}, ${country}</h2>
    <p><strong>Temperature:</strong> ${temperature}</p>
    <p><strong>Condition:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
  `;
}
