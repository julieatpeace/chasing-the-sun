function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let city = response.data.city;
  let country = response.data.country;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}, ${country}`;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind}km/h`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let dayElement = document.querySelector("#dayTime");
  let date = new Date(response.data.time * 1000);
  dayElement.innerHTML = formatDate(date);

  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ad37dbed19e0t4f4c2c6267790bao7f4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchImput = document.querySelector("#search-form-input");

  searchCity(searchImput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("San Salvador");
