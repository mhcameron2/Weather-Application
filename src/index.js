//
let currentDateTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDateTime.getDay()];
let date = currentDateTime.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDateTime.getMonth()];
let year = currentDateTime.getFullYear();
let hours = currentDateTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDateTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateTime = document.querySelector("p.dateTime");
dateTime.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  /*   document.querySelector("#sunrise").innerHTML = new Date(
    response.data.sys.sunrise * 1000
  ); */
  /*   document.querySelector("#sunset").innerHTML = new Date(
    response.data.sys.sunset * 1000
  ); */
  console.log(response.data);
}

function searchLocation(position) {
  let apiKey = "d71a4b54dab7353d278293768b930126";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchCity(city) {
  let apiKey = "d71a4b54dab7353d278293768b930126";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function clickCelcius(event) {
  event.preventDefault();
  let clickCelcius = document.querySelector("#temperature");
  clickCelcius.innerHTML = 25;
}

function clickFahrenheit(event) {
  event.preventDefault();
  let clickFahrenheit = document.querySelector("#temperature");
  clickFahrenheit.innerHTML = 77;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", clickCelcius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Brisbane");
