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
}

axios.get(`${start}&units=metric`).then(display);
