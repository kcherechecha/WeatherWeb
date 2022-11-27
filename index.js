let date = new Date();
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
let setDate = document.querySelector("#date");
let hours = date.getHours();
let minutes = date.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
setDate.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
let start = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}`;

let cityEnter = document.querySelector("#city-enter");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weekday">${formatDay(forecastDay.dt)}</div>
      <div class="icon">
        <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
      </div>
      <div class="temperatures">
      <span>${Math.round(forecastDay.temp.min)}°C</span>&nbsp;&nbsp;
      <span>${Math.round(forecastDay.temp.max)}°C</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function position(position) {
  let lat = position.lat;
  let lon = position.lon;
  let forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastAPI).then(displayForecast);
}

function display(temperature) {
  let changeCity = document.querySelector("#name");
  changeCity.innerHTML = `${temperature.data.name}`;
  convertTemp = Math.round(temperature.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${convertTemp}°C`;
  let conditionChange = document.querySelector("#condition");
  document.querySelector("#image").alt = temperature.data.weather[0].main;
  conditionChange.innerHTML = `${temperature.data.weather[0].description}`;
  if (temperature.data.weather[0].main === "Thunderstorm") {
    document.querySelector("#image").src = "img/thunderstorm.png";
    document.getElementById("#image").style.opacity = 0.5;
  }
  if (temperature.data.weather[0].main === "Clear") {
    document.querySelector("#image").src = "img/clear sky.jpg";
  }
  if (temperature.data.weather[0].main === "Clouds") {
    if (
      temperature.data.weather[0].description === "few clouds" ||
      temperature.data.weather[0].description === "scattered clouds"
    ) {
      document.querySelector("#image").src = "img/partlycloudy.jpg";
    } else {
      document.querySelector("#image").src = "img/cloudy.jpg";
    }
  }
  if (temperature.data.weather[0].main === "Rain") {
    document.querySelector("#image").src = "img/rainy.jpg";
    // document.getElementById("#image").style.opacity = "0.5";
  }
  if (temperature.data.weather[0].main === "Snow") {
    document.querySelector("#image").src = "img/snowy.jpg";
  }
  if (temperature.data.weather[0].main === "Drizzle") {
    document.querySelector("#image").src = "img/rainy.jpg";
  }
  if (
    temperature.data.weather[0].main === "Mist" ||
    temperature.data.weather[0].main === "Smoke" ||
    temperature.data.weather[0].main === "Haze" ||
    temperature.data.weather[0].main === "Dust" ||
    temperature.data.weather[0].main === "Fog" ||
    temperature.data.weather[0].main === "Sand" ||
    temperature.data.weather[0].main === "Dust" ||
    temperature.data.weather[0].main === "Ash" ||
    temperature.data.weather[0].main === "Squall" ||
    temperature.data.weather[0].main === "Tornado"
  ) {
    document.querySelector("#image").src = "img/smog.jpg";
  }
  position(temperature.data.coord);
}

axios.get(`${start}&units=metric`).then(display);

function cityChange(event) {
  event.preventDefault();
  axios
    .get(`${apiUrl}q=${cityEnter.value}&appid=${apiKey}&units=metric`)
    .then(display);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("click", cityChange);

function geoposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${url}`).then(display);
}

function change(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoposition);
}

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", change);

let changeToF = document.querySelector("#conv-to-f");
changeToF.addEventListener("click", function convToFar(event) {
  event.preventDefault();
  let Temp = document.getElementById("temperature");
  changeToF.classList.add("active");
  changeToC.classList.remove("active");
  let res = Math.round(convertTemp * 1.8 + 32);
  Temp.innerHTML = `${res}°F`;
});
let changeToC = document.querySelector("#conv-to-c");
changeToC.addEventListener("click", function convToCel(event) {
  event.preventDefault();
  let Temp = document.getElementById("temperature");
  changeToF.classList.remove("active");
  changeToC.classList.add("active");
  Temp.innerHTML = `${convertTemp}°C`;
});

let convertTemp = null;
