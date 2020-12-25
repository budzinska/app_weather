//ustawianie daty
let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let currentTime = now.getHours() + ":" + now.getMinutes();
  let formattedDate = `${currentDay} ${currentTime}`;
  return formattedDate;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);
//koniec ustawiania daty

//wyszukiwanie miasta Search i aktualizacja pogody
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let apiKey = "6d0dc84f33996746a53bd0932ee1515d";
  let apiSearchCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiSearchCity)
    .then(showAutoWeather)
    .catch(() => {
      alert("Please search for a valid city");
    });
}

//przycisk szukania miasta
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", searchCity, true);

function showAutoWeather(response) {
  //zmiana miasta zgodnie z aktualną pozycją geo
  let cityName = response.data.name;
  let currentCityName = document.querySelector("#city-name");
  currentCityName.innerText = cityName;

  //zmiana temp zgodnie z aktualną pozycją geo
  let temp = Math.round(response.data.main.temp);
  let currentPositionTemp = document.querySelector("#temp");
  currentPositionTemp.innerText = temp;

  //zmiana wilgotności powietrza
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerText = humidity;

  //zmiana prędkości wiatru
  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerText = windSpeed;
}
function update() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let apiKey = "6d0dc84f33996746a53bd0932ee1515d";
    let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(geoApiUrl).then(showAutoWeather);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", update);

//funkcja przeliczająca temperaturę na farenheit
function convertTempF() {
  if (currentlyShowTempUnit === "far") return;
  let currentTemp = document.querySelector("#temp");
  let currentTempInC = currentTemp.innerHTML;
  let farenheit = (currentTempInC * 9) / 5 + 32;
  currentTemp.innerHTML = farenheit;
  currentlyShowTempUnit = "far";
}

let currentlyShowTempUnit = "cel";
//funkcha przeliczająca temperaturę na celsjusze
function convertTempC() {
  if (currentlyShowTempUnit === "cel") return;
  let currentTemp = document.querySelector("#temp");
  let currentTempInF = currentTemp.innerHTML;
  let celsius = Math.round(((currentTempInF - 32) * 5) / 9);
  currentTemp.innerHTML = celsius;
  currentlyShowTempUnit = "cel";
}

let fButton = document.querySelector("#farenheitButton");
fButton.addEventListener("click", convertTempF);

let cButton = document.querySelector("#celsiusButton");
cButton.addEventListener("click", convertTempC);
