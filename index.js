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

function display(temperature) {
  let changeCity = document.querySelector("#name");
  changeCity.innerHTML = `${temperature.data.name}`;
  convertTemp = Math.round(temperature.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${convertTemp}°C`;
  let conditionChange = document.querySelector("#condition");
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
    document.getElementById("#image").style.opacity = "0.5";
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
